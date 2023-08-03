<template>
  <div>
    collection
    <div v-for="collection of collections">
      <NuxtLink :to="`/admin/collection/${collection.id}`">
        {{ collection }}
      </NuxtLink>
    </div>

    <!-- Add collection -->
    <FormAddCollection @add="getCollections" />
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      collections: [],
    }
  },
  async mounted() {
    await this.getCollections()
  },
  methods: {
    async getCollections() {
      const res = await this.$axios.get('/api/collection')
      this.collections = res.data
    },
  }
}
</script>
