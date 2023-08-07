<template>
    <div class="border w-32 h-52" :style="{borderColor: item.item.rarity.color}">
       {{ item.item.name }}
    </div>
</template>
  
<script>
export default {
    props: {
        item: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
        }
    },
    async mounted() {
    },
    methods: {
    }
}
</script>
  