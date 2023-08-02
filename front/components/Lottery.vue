<template>
    <div>
        <!-- Spinner -->
        <div class="px-2 md:px-28 my-8" v-if="content">
            <Spinner ref="spinner" @over="displayWin" :content="content" :winningItem="winningItem" />
        </div>
        <!-- Spin button -->
        <div v-if="!displayed && !spinning"
            class="cursor-pointer text-center hover:bg-blue-500 transition-all duration-200 py-2 px-4 text-3xl bg-blue-400 text-white rounded "
            @click="spin">Spin!</div>
        <!-- Item won -->
        <div class="mx-auto flex justify-center" v-if="displayed">
            <div :style="getShadow(winningItem.color)" class="w-24 min-w-[6rem] h-24 bg-gray-200 border">
                <img :src="`/${winningItem.img}`" alt="" srcset="">
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            content: null,
            winningItem: null,
            spinning: false,
            displayed: false,
        }
    },
    async mounted() {
        const res = await this.$axios.get('/api/collection/1')
        this.content = []
        for (const item of res.data.items) {
            this.content.push({
                img: 'icon.png',
                color: this.getColorFromRarity(item.rarity),
                frequency: this.getFrequencyFromRarity(item.rarity)
            })
        }
    },
    methods: {
        displayWin() {
            this.displayed = true
            this.spinning = false
        },
        async spin() {
            const res = await this.$axios.post('/api/collection/1/roll')
            this.winningItem = {
                img: 'icon.png',
                color: this.getColorFromRarity(res.data.item.rarity)
            }
            this.$refs.spinner.startAnimation(this.winningItem)
            this.spinning = true
        },
        getShadow(color) {
            if (!color) return null
            return `
          -webkit-box-shadow: inset 0px -15px 30px 5px ${color}; 
          box-shadow: inset 0px -15px 30px 5px ${color};
        `
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
        },
        getColorFromRarity(rarity) {
            switch (rarity) {
                case 0:
                    return 'rgba(227, 227, 227,0.75)'
                case 1:
                    return 'rgba(25, 182, 255,0.75)'
                case 2:
                    return 'rgba(255, 81, 18,0.75)'
                case 3:
                    return 'rgba(247, 255, 23,0.75)'
                default:
                    return 'gray'
            }
        },
    }
}
</script>
  