<template>
  <div>
    <Header></Header>
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
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios";
// import { store } from '../store/store'

export default {
  name: "LoginPage",
  // store,
  components: {
    Header
  },
  data() {
    return {
      account:[],
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
      .get("http://13.228.170.25:7777/api/getAccountbyusername/" + this.username)
        // .get("http://13.228.170.25:7777/api/getAccountbyusername/" + this.username)
        .then(response => {
          this.account = response.data
          if(this.password === response.data[0].password){
            this.$store.commit('setAccount',this.account[0].accountId)
            this.$store.commit('setName',this.account[0].name)
            this.$router.push('/createrestaurant');
          }else{
            this.$router.push('/');
          }
        });
    }
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sign {
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
}
</style>
