<template>
  <div id="app" class = "Scroll">
  <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      time:0
    }
  },
  
}
</script>

<style scoped>
#app {

    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;

    }
</style>

<style lang="stylus">
  @import './styles/main'
</style>

<style lang="scss">
  @import './styles/font.scss'
</style>