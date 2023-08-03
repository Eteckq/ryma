<template>
  <div>
    <FormInput label="Name" v-model="collection.name" />
    <FileUploader @file="uploadedFile" />
    <FormButton :loading="loading" @clicked="addCollection">
      Add
    </FormButton>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      collection: {
        name: ""
      },
      loading: false
    }
  },
  methods: {
    async addCollection() {
      this.loading = true
      try {
        const res = await this.$axios.post(`/api/collection`, this.collection)
        this.$emit('add', res.data)
        this.$toast.success('Added!')
      } catch (error) {
        if (error.isAxiosError) {
          this.$toast.error(error.response.data.message[0])
        }
      } finally {
        this.loading = false
      }
    },
    uploadedFile(f) {
      this.collection.design = f
    }
  }
}
</script>
  