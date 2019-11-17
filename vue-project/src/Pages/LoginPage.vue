<template>
  <div class="bg">
    <v-card class="box">
      <v-flex xs6 class="positionLogin">
      <v-img
        :src="require('../assets/1.png')"
        aspect-ratio="1"
        max-width="240"
      ></v-img>
     </v-flex>
      <v-flex xs6 offset-lg5 style="margin-top:-45%">
        <v-card-title class="loginText">LOGIN</v-card-title>
        <v-form>
          <v-container>
            <v-text-field label="Username" v-model="username" prepend-icon="people"></v-text-field>
            <v-text-field
              label="Password"
              :type="'password'"
              v-model="password"
              prepend-icon="lock"
            ></v-text-field>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn class="loginBtn" color="#B7CDC2" @click="login">Login</v-btn>
        </v-card-actions>
      </v-flex>
    </v-card>
  </div>
</template>

<script>
// import Header from "../components/Header";
import axios from "axios";
import { store } from "../store/store";
import md5 from "md5";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { host } from "./data"

export default {
  name: "LoginPage",
  // store,
  components: {
    // Header
  },
  data() {
    return {
      account: [],
      username: "",
      password: "",
      checkPassword: "",
      test: {
        a: 1,
        b: "test"
      }
    };
  },
  methods: {
    login() {
      axios
        .post(host+"login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.account = response.data;
          var accountdecode = jwt.decode(this.account.token);

          localStorage.setItem("token", this.account.token);
          this.$store.commit("setAccount", accountdecode);
          if (this.account.login === true) {
            // Swal.fire("Login Success", "", "success");
            if (accountdecode.positionId === 3) {
              this.$router.push("/Menu");
            } else if (accountdecode.positionId === 2) {
              console.log(accountdecode.positionId);
              this.$router.push("/notification");
            } else if (accountdecode.positionId === 1) {
              console.log(accountdecode.positionId);
              this.$router.push("/Menu");
            } else if (accountdecode.positionId === 5) {
              console.log(accountdecode.positionId);
              this.$router.push("/ordered");
            }
          } else {
            Swal.fire("Oooops!", "Login Fail", "error");
          }
        });
    }
  },
  created() {
    try {
      var account = jwt.decode(localStorage.getItem("token"));
      this.$store.commit("setAccount", account);
      if (
        localStorage.getItem("token") != null &&
        (this.$store.getters.account.positionId === 3 ||
          this.$store.getters.account.positionId === 1)
      ) {
        this.$router.push("/menu");
      } else if (
        jwt.decode(localStorage.getItem("token")) != null &&
        this.$store.getters.account.positionId === 2
      ) {
        this.$router.push("/notification");
      } else if (
        jwt.decode(localStorage.getItem("token")) != null &&
        this.$store.getters.account.positionId === 5
      ) {
        this.$router.push("/ordered");
      } else {
        this.$router.push("/");
      }
    } catch (error) {
      console.log(error);

      this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background-color: #84A295;
  background-size: cover;
  -webkit-background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.box {
  height: 65%;
  width: 50%;
  margin: 8% 25%;
  padding: 0%;
  border-radius: 5% 5% 5% 5%;
  box-shadow: 7px 7px 7px rgb(117, 117, 117);
}
.loginBtn {
  width: 91%;
  margin-left: 5%;
}
.loginText {
  font-size: 2.2em;
  margin-left: 35%;
  padding-top: 15%;
  font-weight: 600;
  color: black;  
  padding-bottom: 0%;
}
.text {
  color: darkgrey;
  padding-left: 2%;
}
.cardLeft {
  background-color: brown;
  height: 65%;
  border: none;
}
.positionLogin{
  padding-top: 6em;
  padding-left: 2em;
}
</style>
