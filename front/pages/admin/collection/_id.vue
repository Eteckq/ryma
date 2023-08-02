<template>
    <div v-if="collection">
        {{ collection.name }}

        <div v-for="item of collection.items">
            {{ item }}
        </div>

        <!-- Add item -->
        <div>
            <input type="text" v-model="item.name">
            <input type="number" v-model="item.rarity">
            <FileUploader @file="uploadedFile"/>
            <div @click="addItem">
                add
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            collection: null,
            item: {
                name: "",
                rarity: 0,
                design: null
            }
        }
    },
    async mounted() {
        await this.getCollection()
    },
    methods: {
        async getCollection() {
            const res = await this.$axios.get(`/api/collection/${this.$route.params.id}`)
            this.collection = res.data
        },
        async addItem(){
            const res = await this.$axios.post(`/api/collection/${this.$route.params.id}/item`, this.item)
            await this.getCollection()
        },
        uploadedFile(f){
            this.item.design = f
        }
    }
}
</script>
  