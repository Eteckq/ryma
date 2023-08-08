<template>
  <div>
    <!-- Edit -->
    <div
      :style="{ backgroundColor: rarity.color }"
      class="cursor-pointer my-1"
      @click="deleteRarity(rarity.id)"
      v-for="rarity in rarities"
      :key="rarity.id"
    >
      {{ rarity.name }}
    </div>
    <h2>Add rarity</h2>
    <FormInput label="Name" v-model="rarity.name" />
    <FormInput label="Weight" type="number" v-model="rarity.weight" />
    <input type="color" v-model="rarity.color" />
    <FormButton :loading="loading" @clicked="addRarity">
      add rarity
    </FormButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rarity: {
        name: "",
        weight: 50,
        color: "#ffffff",
      },
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
    async deleteRarity(id) {
      const res = await this.$axios.delete(`/api/item/rarity/${id}`);
      await this.getRarities();
    },
    async addRarity() {
      this.loading = true;
      try {
        const res = await this.$axios.post(`/api/item/rarity`, this.rarity);
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
