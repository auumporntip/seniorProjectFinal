<template>
  <v-content>
    <div class="logo">
      <img src="../assets/bill.png" height="100%" width="100%"/>
      </div>
      <div class="text"><center> <p> Payment successful !! </p> 
      <p> Thank you for your ordered. </p></center></div>
    
    <v-btn @click="done" class="white--text" color="#cd9575" block id="spaceNext">DONE</v-btn>
    
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import {host} from './data'

export default {
  name: "MoSuccess",
  components: {
    Bar
  },
  data() {
    return {};
  },
  methods: {
    done(){
      close();
    }
  },
  created() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/MoLanding");
    }
    this.$store.commit("setNamePages", "Success");
  }
};
</script>

<style scoped>
.logo{
    margin-top: 30%;
    margin-left: 22%;
    margin-right: 20%;
    margin-bottom: 20%;
}
.text{
    font-size: 20px;
    font-family: sans-serif;
    margin-top: 20%;
 
   
}
.white--text{
    margin-top: 15%;
    margin-bottom: 0%;
    position: relative;
    display: flex;
}

</style>