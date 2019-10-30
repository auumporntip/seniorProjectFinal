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
export default {
  name: "App",
  data() {
    return {
      time: 0
    };
  },
  created() {    
    if (sessionStorage.getItem("token") != null) {
      axios
        .post("http://localhost:3000/api/verifytoken", {
          token: sessionStorage.getItem("token")
        })
        .then(response => {
          console.log(response.data);

          if (response.data.tokenValid === false) {
            sessionStorage.clear();
            localStorage.clear();
            this.$store.replaceState({});
            this.$router.push("/Molanding");
          }
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
</style>

<style lang="stylus">
@import './styles/main';
</style>

<style lang="scss">
@import "./styles/font.scss";
</style>