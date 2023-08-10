<template>
  <div
    class="border rounded-lg w-32 h-52"
    :style="{
      borderColor: item.item.rarity.color,
      backgroundColor: item.item.rarity.color,
    }"
  >
    <!-- style="padding: 0 2px 0 2px" -->
    <!-- Image -->
    <div class="relative bg-opacity-75 h-full w-full rounded-lg bg-white">
      <ImageWebGL
        class="w-full h-full"
        :shiny="item.shiny"
        :scratch="item.quality"
        :random="item.id"
        :img="`/api/${item.item.design}`"
      />
    </div>

    <div class="relative">
      <!-- Name -->
      <div class="text-center inset-x-0 -top-3 absolute z-50">
        <span class="bg-gray-100 text-black px-4 rounded-sm">{{
          item.item.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {};
  },
  async mounted() {},
  methods: {},
};
</script>
