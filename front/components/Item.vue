<template>
  <div
    class="border rounded-lg w-32 h-52"
    style="padding: 0 2px 0 2px;"
    :style="{
      borderColor: item.item.rarity.color,
      backgroundColor: item.item.rarity.color,
    }"
  >
  <!-- Top -->
    <div class="">
      {{ item.item.name }}
    </div>

  <!-- Image -->
    <div class="relative bg-black" style="height: 80%">
      <ImageWebGL
        class="absolute top-0 w-full h-full"
        :scratch="item.quality"
        :random="item.id"
        :img="`/api/${item.item.design}`"
      />
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
