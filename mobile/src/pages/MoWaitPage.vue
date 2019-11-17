<template>
  <v-content>
    <!-- 
    <template>
    <v-container>
    <v-dialog v-model="waitDialog">
    <v-card color="#F9F9F9" >-->
    <div>
      <v-toolbar color="#84A295" fixed>
        <v-img
          :src="image_src"
          max-width="65px"
          style="margin-left:-1em;"
        ></v-img>
        <v-toolbar-title
          class="headline-text white--text"
          style="margin-left:5px;"
          >Waiting Employee</v-toolbar-title
        ></v-toolbar
      >
      <center>
        <v-progress-circular
          :size="150"
          :width="7"
          color="#84A295"
          indeterminate
          style="margin-top:10em;"
        ></v-progress-circular>
        <!-- <img src="../assets/video-conference.png" height="60%" width="60%" /> -->
        <!-- videoconference -->
      </center>
    </div>
    <p class="text">Please wait, your request is being processed.</p>

    <!-- </v-card>
    </v-dialog>
    </v-container>
    </template>-->
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import { host } from "./data";
import jwt from "jsonwebtoken";

export default {
  name: "MoWaitPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return { image_src: require("../assets/loginCircle.jpg") };
  },
  created() {
    this.$store.commit("setNamePages", "Waiting Employee");
    if (localStorage.getItem("token") === null) {
      this.$router.push("/MoLanding");
    }
    var token = jwt.decode(localStorage.getItem("token"));
    console.log(jwt.decode(localStorage.getItem("token")));
    console.log(token.billId);
    var bill = [];
    var noti = [];
    var checkNoti = [];
    var waitPage = setInterval(() => {
      axios.get(host + "getbillbybillid/" + token.billId).then(response => {
        var bill = response.data;
        if (bill[0].billStatus === 1) {
          clearInterval(waitPage);
          this.$router.push("MoSuccess");
        }
      });
    }, 5000);
  }
};
</script>

<style scoped>
.text {
  font-size: 1.5em;
  padding-left: 50px;
  padding-right: 20px;
  padding-top: 4em;
  padding-bottom: 40px;
}
.logo {
  margin-top: 40%;

  /* margin-left: 20%; */
}

/* .img{
  padding-top: 100px;
} */
</style>
