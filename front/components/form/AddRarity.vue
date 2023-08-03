<template>
    <div>
        <h2>Add rarity</h2>
        <input type="text" v-model="rarity.name">
        <input type="number" v-model="rarity.weight">
        <input type="color" v-model="rarity.color">
        <div @click="addRarity">
            add rarity
        </div>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            rarity: {
                name: "",
                weight: 50,
                color: "#ffffff"
            },
            // rarities: []
        }
    },
    async mounted() {
        // await this.getRarities()
    },
    methods: {
        // async getRarities() {
        //     const res = await this.$axios.get(`/api/item/rarity`)
        //     this.rarities = res.data
        // },
        async addRarity() {
            const res = await this.$axios.post(`/api/item/rarity`, this.rarity)
            this.$emit('add', res.data)
        },
        uploadedFile(f) {
            this.item.design = f
        }
    }
}
</script>
  