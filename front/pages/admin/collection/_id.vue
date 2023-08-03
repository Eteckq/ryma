<template>
    <div v-if="collection">
        {{ collection.name }}

        <div v-for="item of collection.items">
            {{ item }}
        </div>

        <!-- Add item -->
        <FormAddItem @add="getCollection" :collection="collection"/>
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
  