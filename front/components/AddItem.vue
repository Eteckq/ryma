<template>
    <div>
        <h2>Add item</h2>
        <input type="text" v-model="item.name">
        <div @click="item.rarity = rarity.id" v-for="rarity in rarities">
            {{ rarity.name }}
        </div>
        <FileUploader @file="uploadedFile" />
        <div @click="addItem">
            add
        </div>
    </div>
</template>
    
<script>
export default {
    props: ['collection'],
    data() {
        return {
            item: {
                name: "",
                rarity: 0,
                design: null
            },
            rarities: []
        }
    },
    async mounted() {
        await this.getRarities()
    },
    methods: {
        async getRarities() {
            const res = await this.$axios.get(`/api/item/rarity`)
            this.rarities = res.data
        },
        async addItem() {
            const res = await this.$axios.post(`/api/collection/${this.collection.id}/item`, this.item)
            this.$emit('add')
        },
        uploadedFile(f) {
            this.item.design = f
        }
    }
}
</script>
  