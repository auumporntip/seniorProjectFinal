<template>
  <div class="bg">
    <v-card class="box">
      <!-- <v-flex xs5>
        <v-card class="cardLeft">
          <v-card-text class="text">Restaurant Managemeny System</v-card-text>
        </v-card>
      </v-flex> -->
      <v-flex xs6 offset-lg5>
        <v-card-title class="loginText">LOGIN</v-card-title>
        <v-form>
          <v-container>
            <v-text-field label="Username" v-model="username" prepend-icon="people"></v-text-field>
            <v-text-field label="Password" v-model="password" prepend-icon="lock"></v-text-field>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn class="loginBtn" color="#cd9575" @click="login">Login</v-btn>
        </v-card-actions>
      </v-flex>
      
    </v-card>
    <!-- <Header></Header>
    <div id="header">
      LOG IN{{$store.getters.restaurantId}}
      <form id="login">
        <div id="Username">
          <b-field>
            <span style="padding-right:20px;">Username</span>
            <b-input v-model="username" style="width:300px;"></b-input>
          </b-field>
        </div>
        <br>
        <div id="Password">
          <b-field>
            <span style="padding-right:20px;">Password</span>
            <b-input v-model="password" type="password" password-reveal style="width:305px;"></b-input>
          </b-field>
        </div>
        <br>
      </form>
      <button @click="login">
          LOGIN
        </button>
      <br>
      <div id="sign">
        <span id="signup">
          <li>
            <router-link to="/Signup">SIGN UP</router-link>
          </li>
        </span>
      </div>
    </div>-->
  </div>
</template>

<script>
// import Header from "../components/Header";
import axios from "axios";
// import { store } from '../store/store'

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
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .get("http://localhost:3000/api/getAccountbyusername/" + this.username)
        // .get("http://13.228.170.25:8443/api/getAccountbyusername/" + this.username)
        .then(response => {
          this.account = response.data;
          if (this.password === response.data[0].password) {
            this.$store.commit("setAccount", this.account[0].accountId);
            this.$store.commit("setName", this.account[0].name);
            this.$router.push("/createrestaurant");
          } else {
            this.$router.push("/");
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background-color: #f0c1a8;
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
  /* margin-left: 25%;
  margin-top: 10%;
  margin-bottom: 10%; */
}
.loginBtn {
  width: 91%;
  margin-left: 5%;
  color: white;
}
.loginText {
  font-size: 2.2em;
  margin-left: 35%;
  padding-top: 15%;
  font-weight: 600;
  color: #cd9575;
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

/* #sign {
  float: right;
  padding-right: 200px;
}
#signup {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 16px;
  padding-top: 20px;
}
#header {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 20px;
  text-align: center;
  padding-top: 25px;
  background-color: #f0cab1;
  height: 100vh;
}
#login {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 16px;
  padding-top: 20px;
  text-align: center;
  margin-top: 50px;
}
button {
  height: 40px;
  width: 550px;
  position: sticky;
  padding: 5px 5px;
  margin: 10px 0px;
  font-weight: bold;
  background-color: #be5256;
  border: none;
  color: #e0dada;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #711f1b;
}
li {
  list-style-type: none;
}
#Username {
  text-align: left;
  padding-left: 500px;
  width: 1300px;
}
#Password {
  text-align: left;
  padding-left: 500px;
  width: 1300px;
} */
</style>
