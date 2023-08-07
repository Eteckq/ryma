<template>
    <div>
        <!-- Spinner -->
        <div class="px-2 md:px-28 my-8" v-if="content">
            <Spinner ref="spinner" @over="displayWin" :content="content" />
        </div>
        <!-- Spin button -->
        <div v-if="!spinning"
            class="cursor-pointer text-center hover:bg-blue-500 transition-all duration-200 py-2 px-4 text-3xl bg-blue-400 text-white rounded "
            @click="spin">Spin!</div>
        <!-- Item won -->
        <div class="mx-auto flex justify-center" v-if="displayed">
            <div class="h-full w-full border p-4 bg-contain bg-no-repeat"
                :style="{ backgroundImage: `url(/api/${winningItem.item.design})` }">
                <p>{{ winningItem.item.name }}</p>
                <p>{{ winningItem.quality }}/100</p>
                <p v-if="winningItem.shiny">Shiny</p>
                <p>Normal</p>
                <p>Rarity: {{ winningItem.item.rarity }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        collection: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            content: null,
            winningItem: null,
            spinning: false,
            displayed: false,
        }
    },
    async mounted() {
        this.fetchCollection()
    },
    watch: {
        collection() {
            this.fetchCollection()
        }
    },
    methods: {
        displayWin() {
            this.displayed = true
            this.spinning = false
        },
        async fetchCollection() {
            const res = await this.$axios.get(`/api/collection/${this.collection}`)
            this.content = []
            for (const item of res.data.items) {
                this.content.push({
                    img: item.design,
                    color: item.rarity.color,
                    frequency: item.rarity.weight
                })
            }
        },
        async spin() {
            this.displayed = false
            const res = await this.$axios.post(`/api/collection/${this.collection}/roll`)
            this.winningItem = res.data
            this.$refs.spinner.startAnimation({
                img: res.data.item.design,
                color: res.data.item.rarity.color
            })
            this.spinning = true
        },
        getFrequencyFromRarity(rarity) {
            switch (rarity) {
                case 0:
                    return 150
                case 1:
                    return 30
                case 2:
                    return 7
                case 3:
                    return 1
                default:
                    return 150
            }
        }
    }
}
</script>
  