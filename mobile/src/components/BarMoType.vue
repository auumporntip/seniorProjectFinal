<template>
  <v-toolbar dark color="#cd9575">
  <v-img :src="image_src" max-width="40px"></v-img>
  <v-toolbar-title class="headline-text white--text">{{nameRes}}</v-toolbar-title>
     <v-spacer></v-spacer>
    <div>
     <v-text class="white--text" >{{namePro}}<br/></v-text>
    <v-text class="white--text" >{{billNo}}</v-text>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "BarMoType",
  data () {
        return {
            image_src: require("../assets/1.png"),
            nameRes: "Restaurant",
            namePro: "Buffet 1199.-",
            billNo: "Bill No: 001"
        }
    }
};
</script>

<style scoped>

</style>
