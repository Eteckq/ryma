import Vue from 'vue'

Vue.directive('resize', {
    inserted: function (el, binding) {
        const onResizeCallback = binding.value;
        window.addEventListener('resize', () => {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            onResizeCallback({ width, height });
        })
    }
});