<template>
  <div id="app" class="Scroll">
    <router-view />
  </div>
</template>

<script>
import { store } from "./store/store";
import axios from "axios";
import { host } from "../src/Pages/data";

export default {
  name: "App",
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
    if (
      this.$store.getters.account === "" ||
      this.$store.getters.account === undefined
    ) {
      if (localStorage.getItem("token") != null) {
        axios
          .post(host +"verify", {
            token: localStorage.getItem("token")
          })
          .then(response => {
            var isSuccess = response.data.isSuccess;
            // console.log(isSuccess);

            if (isSuccess === false) {
              this.$router.push("/");
            }
          });
      }
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