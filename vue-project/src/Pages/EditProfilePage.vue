<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="header2">
      EDIT PROFILE 
      <form id="login">
        <div id="RestaurantName">
         <div id="Username">
        <span> Username</span>
        <b-field  expanded style="width:450px;">
            <b-input></b-input>
        </b-field>
        </div>
        <div id="Password">
          <span> Password </span>
        <b-field style="width:450px;">
            <b-input type="password"
                password-reveal>
            </b-input>
        </b-field>
        </div>
         <div id="Name">
           <span style="padding-right:20px;">Name</span>
            <b-field style="width:450px;">
                <b-select placeholder="Title">
                    <option>Mr.</option>
                    <option>Ms.</option>
                </b-select>
                <b-input placeholder="Name" expanded></b-input>
            </b-field>
        </div> 
        <div id="Surname">
        <span> Surname</span>
        <b-field  expanded style="width:450px;">
            <b-input></b-input>
        </b-field>
        </div>
        <div id="Email">
          <span style="padding-right:20px;">Email</span>
            <b-input placeholder="some@email.com" style="width:450px;"></b-input>
      
        </div> 
         <div id="Tel">
        <span>PhoneNumber</span>
        <b-field  expanded style="width:450px;">
            <b-input></b-input>
        </b-field>
        </div> 
        </div>
        <br><button  v-on:click="onSubmit"> 
          <span id="login"><router-link to="/login">EDIT</router-link></span>
         </button>
        </form>
        </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
export default {
  name: "MenuPage",
  components: {
    Header,
    sidebar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 16px;
  padding-top: 20px;
}
#header2 {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 20px;
  text-align: center;
  padding-top: 25px;
  background-color:#f0cab1;
  height: 36.5em;
  background-attachment: fixed;  
}
#Username{
  text-align: left;
  padding-left: 30em;  
  width: 1300px;
}
#Surname{
  text-align: left;
  padding-left: 30em;  
  width: 1300px;
}
#Name{
   text-align: left;
  padding-left: 30em;
  width: 1000px;
}
#Email{
  text-align: left;
 padding-left: 30em;
  width: 1000px;
}
#Tel{
  text-align: left;
  padding-left: 30em; 
  width: 1300px;
}

#Password{
  text-align: left;  
  width: 1300px;
  padding-left: 30em;
}
#login {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 16px;
  padding-top: 20px;
}
button {
  height: 40px;
  width: 600px;
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

</style>
