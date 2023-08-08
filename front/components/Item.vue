<template>
    <div class="border w-32 h-52 relative" :style="{borderColor: item.item.rarity.color}">
       {{ item.item.name }}
       <ImageWebGL class="absolute top-0" :scratch="item.quality" height="208" width="128" :random="item.id" :img="`/api/${item.item.design}`" />
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
