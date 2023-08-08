<template>
  <div>
    <p @click="page -= 1">prec</p>
    <p @click="page += 1">next</p>
    <div class="flex justify-between">
      <div v-for="item of items" :key="item.id">
        <Item :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      items: [],
      page: 0,
    };
  },
  watch: {
    page() {
      this.getItems();
    },
  },
  async mounted() {
    await this.getItems();
  },
  methods: {
    async getItems() {
      const res = await this.$axios.get(
        `/api/item/user/${this.id}?page=${this.page}`
      );
      this.items = res.data;
    },
  },
};
</script>
