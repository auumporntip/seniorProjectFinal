<template>
  <v-toolbar dark color="#cd9575">
    <v-btn flat icon color="white">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title class="headline-text white--text">{{namePage}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text class="white--text">{{billNo}}</v-text>
  </v-toolbar>
</template>

<script>
export default {
  name: "BarStatus",
  data() {
    return {
      namePage: "Order Status",
      billNo: "Bill No: 001"
    };
  }
};
</script>

<style scoped>
</style>
