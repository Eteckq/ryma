<template>
  <div>
    <div class="mt-3 mb-6">
      <NuxtLink v-for="collection of collections" :key="collection.id" class="border p-4 " :to="`/admin/collection/${collection.id}`">
        {{ collection.name }}
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
