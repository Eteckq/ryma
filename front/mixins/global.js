export default {
    methods: {
        getColorFromRarity(rarity) {
            switch (rarity) {
                case 0:
                    return 'rgba(227, 227, 227,0.75)'
                case 1:
                    return 'rgba(25, 182, 255,0.75)'
                case 2:
                    return 'rgba(255, 81, 18,0.75)'
                case 3:
                    return 'rgba(247, 255, 23,0.75)'
                default:
                    return 'gray'
            }
        },
        getShadow(color) {
            if (!color) return null
            return `
            -webkit-box-shadow: inset 0px -15px 30px 5px ${color}; 
            box-shadow: inset 0px -15px 30px 5px ${color};
            `
        },
    }
}