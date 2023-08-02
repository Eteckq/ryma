<template>
  <div>
    collection
    <div v-for="collection of collections">
      <NuxtLink :to="`/admin/collection/${collection.id}`">
        {{ collection }}
      </NuxtLink>
    </div>

    <!-- Add collection -->
    <div>
      <input type="text" v-model="collection.name">
      <FileUploader @file="uploadedFile" />
      <div @click="addCollection">
        add
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      collections: [],
      collection: {}
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
    async addCollection() {
      const res = await this.$axios.post(`/api/collection`, this.collection)
      await this.getCollections()
    },
    uploadedFile(f) {
      this.collection.design = f
    }
  }
}
</script>
