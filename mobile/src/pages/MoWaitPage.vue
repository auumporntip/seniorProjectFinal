<template>
  <v-content>

    <!-- 
    <template>
    <v-container>
    <v-dialog v-model="waitDialog">
    <v-card color="#F9F9F9" >-->
    <div class="logo">
      <center>
        <img src="../assets/video-conference.png" @click="click" height="60%" width="60%" />
        <!-- videoconference -->
      </center></div>
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

export default {
  name: "MoWaitPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {};
  },
  methods: {
    click(){
      
        this.$router.push('MoSuccess')
    }
  },
  created() {
    this.$store.commit("setNamePages", "Waiting Employee");
  }
};
</script>

<style scoped>
.text {
  font-size: 18px;
  padding-left: 50px;
  padding-right: 20px;
  padding-top: 50px;
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