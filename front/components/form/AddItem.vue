<template>
    <div>
        <FormAddRarity @add="getRarities" />
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
    props: {
        collection: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            item: {
                name: "",
                rarity: null,
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
            this.$emit('add', res.data)
        },
        uploadedFile(f) {
            this.item.design = f
        }
    }
}
</script>
  