<template>
  <div id="app" class = "Scroll">
  <router-view/>
  </div>
</template>

<script>
import { store } from './store/store'

export default {
  name: 'App',
  store
}
</script>

<style scoped>
#app {

    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;

    }
</style>