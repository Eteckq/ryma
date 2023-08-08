<template>
  <div>
    <div class="flex items-center text-gray-500 justify-center w-full">
      <label
        for="dropzone-file"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
        class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div
          v-if="!file"
          class="flex flex-col items-center justify-center pt-5 pb-6"
        >
          <svg
            class="w-8 h-8 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs">PNG, JPG, JPEG or GIF</p>
        </div>
        <div v-else-if="loading">
          <div>Uploading..</div>
        </div>
        <div v-else>
          <img class="w-32 h-48" :src="`/api/${fileInfo}`" alt="" />
        </div>
        <input
          @change="handleFileUpload($event)"
          id="dropzone-file"
          type="file"
          class="hidden"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      isDragging: false,
      fileInfo: null,
      loading: false,
    };
  },
  methods: {
    async submitFile() {
      this.loading = true;
      let formData = new FormData();
      formData.append("file", this.file);
      try {
        const res = await this.$axios.post("/api/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.fileInfo = res.data;
        this.$emit("file", res.data);
      } catch (error) {
        return null;
      } finally {
        this.loading = false;
      }
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.file = e.dataTransfer.files[0];
      this.isDragging = false;
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.submitFile();
    },
  },
};
</script>
