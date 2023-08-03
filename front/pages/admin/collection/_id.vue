<template>
    <div v-if="collection">
        <div class="flex gap-4 flex-wrap">
            <div class="border" v-for="item of collection.items">
                {{ item.name }} - {{ item.rarity.name }}
                <img width="32" height="32" :src="`/api/${item.design}`" alt="">
            </div>
        </div>

        <!-- Add item -->
        <FormAddItem @add="getCollection" :collection="collection" />
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            collection: null
        }
    },
    async mounted() {
        await this.getCollection()
    },
    methods: {
        async getCollection() {
            const res = await this.$axios.get(`/api/collection/${this.$route.params.id}`)
            this.collection = res.data
        }
    }
}
</script>
  