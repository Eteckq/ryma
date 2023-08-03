<template>
    <div>
        <input type="text" v-model="user.pseudo">
        <div @click="login">login</div>
    </div>
</template>
  
<script>
export default {
    auth: false,
    data() {
        return {
            user: {}
        }
    },
    methods: {
        async login(){
            try {
                await this.$auth.loginWith('local', { data: this.user })
                this.$router.push('/')
            } catch (error) {
                
            }
        }
    }
}
</script>
  