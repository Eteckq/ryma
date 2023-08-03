<template>
      <div>
        <input type="text" v-model="collection.name">
        <FileUploader @file="uploadedFile" />
        <div @click="addCollection">
          add
        </div>
      </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        collection: {}
      }
    },
    methods: {
      async addCollection() {
        const res = await this.$axios.post(`/api/collection`, this.collection)
        this.$emit('add', res.data)
      },
      uploadedFile(f) {
        this.collection.design = f
      }
    }
  }
  </script>
  