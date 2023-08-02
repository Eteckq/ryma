<template>
    <div ref="box" class="border overflow-hidden relative w-full">
        <!--  :class="[animate ? 'scroll' : '-translate-x-[500rem]']" -->
        <!-- Cursor -->
        <div class="z-10 absolute top-0 bottom-0 mx-auto left-0 right-0 w-1 bg-red-600 opacity-90"></div>
        <div v-if="displayed"
            :style="{ 'transform': `translateX(-${shift}px)`, 'transition-duration': `${getAnimationTime}ms` }"
            v-resize="generateDisplayed" class="p-1 flex flex-nowrap gap-2 transform bezier">
            <!-- Items Box -->
            <div :style="getShadow(item.color)" v-for="item in displayed" class="w-24 min-w-[6rem] h-24 bg-gray-200 border">
                <img :src="`/${item.img}`" alt="" srcset="">
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        content: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            animate: false,
            isOver: false,
            animationTime: 10000,
            displayed: null,
            shift: null,
            winningItem: null
        }
    },
    mounted() {
        this.generateDisplayed()
    },
    computed: {
        getAnimationTime() {
            return this.animate ? this.animationTime : 0
        },
    },
    methods: {
        generateDisplayed() {
            if (this.animate || this.isOver) return
            const width = this.$refs.box.clientWidth
            const itemWidth = 96 + 8
            const l = 8

            const fitItems = Math.ceil(width / itemWidth)

            this.displayed = []
            for (let i = 0; i < fitItems / 2 - 1; i++) {
                this.displayed.push(this.getRandomItemFromContent())
            }
            if (this.winningItem) this.displayed.push(this.winningItem)
            for (let i = 0; i < fitItems * l + fitItems / 2; i++) {
                this.displayed.push(this.getRandomItemFromContent())
            }
            this.shift = itemWidth * l * fitItems;
        },
        getShadow(color) {
            if (!color) return null
            return `
            -webkit-box-shadow: inset 0px -15px 30px 5px ${color}; 
            box-shadow: inset 0px -15px 30px 5px ${color};
            `
        },
        getRandomItemFromContent() {
            const ponderation = this.content.reduce((acc, item) => acc + item.frequency, 0);
            const number = Math.random() * ponderation
            let sommeCumulative = 0;
            for (const item of this.content) {
                sommeCumulative += item.frequency;
                if (number < sommeCumulative) {
                    return item;
                }
            }
        },
        startAnimation(winningItem) {
            this.winningItem = winningItem
            this.generateDisplayed()
            this.animate = true
            this.shift = 0
            setTimeout(() => {
                this.isOver = true
                this.animate = false
                this.$emit('over')
            }, this.animationTime);
        }
    }
}
</script>
  
<style>
.bezier {
    animation-timing-function: cubic-bezier(0.4, 0, .45, 1)
}
</style>