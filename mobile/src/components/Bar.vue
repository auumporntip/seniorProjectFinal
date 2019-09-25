<template>
  <v-toolbar dark color="#cd9575">
    <p v-if="this.$store.getters.namePages === 'Menu'" flat icon color="white">
      <v-icon></v-icon>
    </p>
    <v-img
      v-else-if=" this.$store.getters.namePages ==='TypeOfService'"
      :src="image_src"
      max-width="40px"
    ></v-img>
    <v-btn v-else @click="goBack" flat icon color="white">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <!-- <v-btn v-else flat icon color="white">
      <v-icon></v-icon>
    </v-btn>-->
    <v-toolbar-title class="headline-text white--text">{{this.$store.getters.namePages}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="this.$store.getters.namePages === 'Menu'">
      Promotion : {{typeOfService.typeName}}
      <br />
      Bill : {{billId}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Table No: {{tableNumber}}
    </div>
  </v-toolbar>
</template>

<script>
import { store } from "../store/store";
export default {
  name: "Bar",
  data() {
    return {
      image_src: require("../assets/1.png"),
      typeOfService:[],
      billId:'',
      tableNumber:''
    };
  },
  methods: {
    goBack() {
      console.log(this.$store.getters.namePages);
      if (
        this.$store.getters.namePages === "Order" ||
        this.$store.getters.namePages === "Status" ||
        this.$store.getters.namePages === "Receipt"
      ) {
        this.$router.push("/Momenu");
      } else if (this.$store.getters.namePages === "Menu") {
        this.$router.push("/MoType");
      }
    }
  },
  created() {
    // console.log(sessionStorage.getItem('typeOfService'))
    this.billId = sessionStorage.getItem('billId')
    this.tableNumber = sessionStorage.getItem('tableNumber')
    this.typeOfService = JSON.parse(sessionStorage.getItem('typeOfService'))
  }
};
</script>
