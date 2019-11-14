<template>
  <div>
    <v-toolbar color="#84A295" fixed>
      <v-img
        :src="image_src"
        max-width="65px"
        style="margin-left:-1em;"
      ></v-img>
      <v-toolbar-title class="headline-text white--text" style="margin-left:5px;">{{this.$store.getters.namePages}}</v-toolbar-title>

    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "BarMoType",
  created() {
    
  },
};
</script>

<style scoped>

</style>
