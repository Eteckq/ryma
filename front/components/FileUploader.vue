<template>
  <div>
    <div class="flex items-center justify-center w-full">
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
            class="w-8 h-8 mb-4 text-gray-500"
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
          <p class="mb-2 text-sm text-gray-500">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500">PNG, JPG, JPEG or GIF</p>
        </div>
        <div v-else>File loaded</div>
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
    };
  },
  methods: {
    async submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);

      try {
        const res = await this.$axios.post("/api/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.$emit("file", res.data);
      } catch (error) {
        return null;
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
