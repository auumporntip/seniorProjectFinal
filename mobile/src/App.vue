<template>
  <div id="app" class="Scroll">
    <router-view />
  </div>
</template>

<script>
import { store } from "./store/store";
import axios from "axios";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { host } from "../src/pages/data";

export default {
  name: "App",
  data() {
    return {
      time: 0
    };
  },
  created() {
    if (localStorage.getItem("token") != null) {
      var token = jwt.decode(localStorage.getItem("token"));
      var bill = [];
      axios
        .post("http://localhost:3000/api/verifytoken", {
          token: localStorage.getItem("token")
        })
        .then(response => {
          axios.get(host + "getbillbybillId/" + token.billId).then(response => {
            bill = response.data[0];

            if (response.data.tokenValid === false || bill.billStatus != 0) {
              sessionStorage.clear();
              localStorage.clear();
              this.$store.replaceState({});
              this.$router.push("/Molanding");
            }
          });
        });
    }
  }
};
</script>

<style scoped>
#app {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
div.theme--light.v-messages {
  color: rgba(255, 34, 34, 0.86);
}
</style>

<style lang="stylus">
@import './styles/main';
</style>

<style lang="scss">
@import "./styles/font.scss";
</style>