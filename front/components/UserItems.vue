<template>
    <div>
        <div v-for="item of items">
            <Item :item="item" />
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            items: []
        }
    },
    async mounted() {
        await this.getItems()
    },
    methods: {
        async getItems() {
            const res = await this.$axios.get(`/api/user/items/${this.id}`)
            this.items = res.data
        }
    }
}
</script>
  