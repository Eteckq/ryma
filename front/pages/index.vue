<template>
  <div>
    <div class="flex gap-4">
      <div @click="collection = c" v-for="c of collections" :key="c.id" class="border rounded p-4 cursor-pointer" :to="`/admin/collection/${c.id}`">
        <p class="text-center">{{ c.name }}</p>

        <img :src="`/api/${c.design}`" alt="" srcset="">
    </div>
    </div>

    <Lottery v-if="collection" :collection="collection.id" />

    <!-- mine -->
    <UserItems :id="$auth.user.id" />
  </div>
</template>

<script>
export default {
 data() {
    return {
      collections: [],
      collection: null
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
