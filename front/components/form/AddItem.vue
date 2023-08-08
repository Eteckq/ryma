<template>
  <div>
    <p @click="showRarities = !showRarities">Rarities</p>
    <FormAddRarity v-if="showRarities" @add="getRarities" />
    <h2>Add item</h2>
    <FormInput label="Name" v-model="item.name" />
    <div class="flex gap-2">
      <div
        :style="{
          backgroundColor:
            item.rarity == rarity.id ? rarity.color : 'transparent',
        }"
        class="cursor-pointer my-1"
        @click="item.rarity = rarity.id"
        v-for="rarity in rarities"
        :key="rarity.id"
      >
        {{ rarity.name }}
      </div>
    </div>
    <FileUploader @file="uploadedFile" />
    <FormButton :loading="loading" @clicked="addItem"> Add </FormButton>
  </div>
</template>

<script>
export default {
  props: {
    collection: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      item: {
        name: "",
        rarity: null,
        design: null,
      },
      showRarities: false,
      rarities: [],
      loading: false,
    };
  },
  async mounted() {
    await this.getRarities();
  },
  methods: {
    async getRarities() {
      const res = await this.$axios.get(`/api/item/rarity`);
      this.rarities = res.data;
    },
    async addItem() {
      this.loading = true;
      try {
        const res = await this.$axios.post(
          `/api/collection/${this.collection.id}/item`,
          this.item
        );
        this.$emit("add", res.data);
        this.$toast.success("Added!");
      } catch (error) {
        if (error.isAxiosError) {
          this.$toast.error(error.response.data.message[0]);
        }
      } finally {
        this.loading = false;
      }
    },
    uploadedFile(f) {
      this.item.design = f;
    },
  },
};
</script>
