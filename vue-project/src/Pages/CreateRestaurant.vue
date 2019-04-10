<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="biggest">
    <div id="header">
      SIGN UP
      <form id="login">
        <div id="RestaurantName">
        <span>Restaurant Name </span>
        <b-field expanded style="width:450px;">
            <b-input></b-input>
        </b-field>
        </div>
        <div id="Description">
        <span>Restaurant Description</span>
            <b-input type="textarea" style="width:450px;" ></b-input>
        </div>
        <!-- <div id="Username">
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
          <span>Name</span>
            <b-field style="width:450px;">
                <b-select placeholder="Title">
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                </b-select>
                <b-input placeholder="Name" expanded></b-input>
            </b-field>
 
        </div> -->
        <!-- <div id="Name">
            <b-field style="width:450px;">
              <span style="padding-right:20px;">Name</span>
                <b-select placeholder="Title">
                    <option>Mr.</option>
                    <option>Ms.</option>
                </b-select>
                <b-input placeholder="Name" expanded></b-input>
            </b-field>
 
        </div> -->
        <!-- <div id="Email">
          <span style="padding-right:20px;">Email</span>
            <b-input placeholder="some@email.com" style="width:450px;"></b-input>
      
        </div> -->
        <!-- <br>Password:
        <input type="password" name="password" placeholder="password" style="width:180px;">
        <br>
        <br> -->
        <!-- <div id="Tel">
        <span>PhoneNumber</span>
        <b-field  expanded style="width:450px;">
            <b-input></b-input>
        </b-field>
        </div> -->
        <div id="Location">
        <span>Location</span>
            <b-input type="textarea" style="width:450px;" ></b-input>
        </div><br>
        <div id="Type">
        <b-field><span style="padding-left:500px;">Type of Restaurant</span>
            <b-select placeholder="Select a type" style="padding-left:20px;">
                <option value="1">A La Cart</option>
                <option value="2">Buffet</option>
                <option value="3">Both</option>
            </b-select>
        </b-field>
        </div><br>
        <div id="time">
        <b-field>
          <span style="padding-left:500px;">Opening</span>
        <b-timepicker
            style="padding-left:100px;"
            placeholder="Type or select a time.."
            icon="clock"
            editable>
        </b-timepicker>
    </b-field>
        </div><br>
        <div id="timeclose">
        <b-field>
          <span style="padding-left:500px;">Closing</span>
        <b-timepicker
            style="padding-left:110px;"
            placeholder="Type or select a time.."
            icon="clock"
            editable>
        </b-timepicker>
    </b-field>
        </div>
        
        <button  > 
          <span id="login">CREATE RESTAURANT</span>
         </button>
      </form>
      
    </div>
  </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
export default {
  name: "SignupPage",
  components: {
    Header,
    sidebar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 16px;
  padding-top: 20px;


}
#header {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 20px;
  text-align: center;
  padding-top: 25px;
}
#biggest{
  background-color:#f0cab1;
  height: 50em;
}
#RestaurantName{
  text-align: left;
  padding-left: 500px;
  width: 1000px;
}
#Description{
  text-align: left;
  padding-left: 500px;
}
#Username{
  text-align: left;
  padding-left: 500px;  
  width: 1300px;
}
#Name{
   text-align: left;
  padding-left: 500px;
  width: 1000px;
}
#Email{
  text-align: left;
  padding-left: 500px;
  width: 1000px;
}
#Tel{
  text-align: left;
  padding-left: 500px;  
  width: 1300px;
}
#Location{
  text-align: left;
  padding-left: 500px;
}
#input{
  padding-left: 20px;
}
#type{
  text-align: left;
  padding-left: 900px;  
  width: 2000px;
}
#Password{
  text-align: left;
  padding-left: 500px;  
  width: 1300px;
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
