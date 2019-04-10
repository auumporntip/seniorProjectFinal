<template>
  <div>
    <Header></Header>
    <div id="header">
      LOG IN
      <form id="login">
        <div id="Username">
        <b-field>
          <span style="padding-right:20px;"> Username</span>
            <b-input style="width:300px;"></b-input>
        </b-field>
        </div><br>
        <div id="Password">
        <b-field >
          <span style="padding-right:20px;"> Password </span>
            <b-input type="password"
                password-reveal
                style="width:305px;">
            </b-input>
        </b-field>
        </div><br>
        <button>
           <li><router-link to="/Menu">LOG IN</router-link></li>
        </button>
      </form><br>
          <div id="sign">
         <span id="signup"><li><router-link to="/Signup">SIGN UP</router-link></li></span>
          </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header';
export default {
  name: "LoginPage",
  components: {
    Header
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sign{
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
  background-color:#f0cab1;
  height: 100vh;
}
#login {
  font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
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
li{
  list-style-type: none;
}
#Username{
  text-align: left;
  padding-left: 500px;  
  width: 1300px;
}
#Password{
  text-align: left;
  padding-left: 500px;  
  width: 1300px;
}
</style>
