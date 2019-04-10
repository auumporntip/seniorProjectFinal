<template>
  <v-toolbar dark color="#cd9575">
    <v-btn flat icon color="white">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title class="headline-text white--text">{{namePage}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
     <v-text class="white--text" >{{namePro}}<br/></v-text>
    <v-text class="white--text" >{{billNo}}</v-text>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "BarIcon",
  data() {
    return {
      namePage: "Your Order",
      billNo: "Bill No: 001",
      namePro: "Buffet 1199.-"
    };
  }
};
</script>

<style scoped>
</style>
