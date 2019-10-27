<template>
  <div id="app" class="Scroll">
    <router-view />
  </div>
</template>

<script>
import { store } from "./store/store";
import axios from "axios";

export default {
  name: "App",
  created() {
    if (this.$store.getters.account === "" || this.$store.getters.account === undefined) {
      if (localStorage.getItem("token") != null) {
        axios
          .post("http://localhost:3000/api/verify", {
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