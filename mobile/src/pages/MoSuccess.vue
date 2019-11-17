<template>
  <v-content>
     <div class="logo">
    <v-toolbar color="#84A295" fixed>
        <v-img
          :src="image_src"
          max-width="65px"
          style="margin-left:-1em;"
        ></v-img>
        <v-toolbar-title
          class="headline-text white--text"
          style="margin-left:5px;"
          >Payment Successful</v-toolbar-title
        ></v-toolbar
      >
   
      <img src="../assets/checked.png" height="80%" width="80%" />
    </div>
    <div class="text">
      <center>
        <p>Payment successful</p>
        <p>Thank you for your ordered.</p>
      </center>
    </div>
    <!--     
    <v-btn @click="done" class="white--text" color="#cd9575" block id="spaceNext">DONE</v-btn>
    -->
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import { host } from "./data";

export default {
  name: "MoSuccess",
  components: {
    Bar
  },
  data() {
    return {image_src: require("../assets/loginCircle.jpg")};
  },
  methods: {
    done() {
      close();
    }
  },
  created() {
    sessionStorage.clear();
    localStorage.clear();
    this.$store.replaceState({});
    this.$store.commit("setNamePages", "Success");
  }
};
</script>

<style scoped>
.logo {
  margin-top: 30%;
  margin-left: 30%;
  margin-right: 20%;
  margin-bottom: 10%;
}
.text {
  font-size: 20px;
  font-family: sans-serif;
}

</style>