<template>

  <div class="bar">
    <div class="head">
    <img class="logo" src="../assets/1.png" width="65px" height="61px">
   <span class= res> Restaurant Management </span>
    <a href="/EditProfile">
      <img class="logo2" src="../assets/user.png" width="60px" height="51px">
    </a>
   
   
   <!-- <span class= login>LOGIN</span> -->
   
  </div></div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (min-width:320px) and (max-width: 374px){
div.head {
    background-color: #cd9575;
    width:345px;
    height: 70px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 25px;
  font-size: 14px;
  position: absolute;
  width: 200px;
  margin-top:30px;
}
img.logo{
  width:40px ;
  height:50px;
  margin-left:30px;
  margin-top: 10px;
}
img.logo2{
  width:32px;
  height: 35px;
  margin-left:230px;
  position: absolute;
  margin-top: 20px;
}
}
@media screen and (min-width:375px) and (max-width: 424px){
div.head {
    background-color: #cd9575;
    width:337px;
    height: 70px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 10px;
  font-size: 14px;
  position: absolute;
  width: 200px;
  margin-top:30px;
}
img.logo{
  width:50px ;
  height:60px;
  margin-left:30px;
  margin-top: 5px;
}
img.logo2{
  width:32px;
  height: 35px;
  margin-left:210px;
  position: absolute;
  margin-top: 20px;
}
}
@media screen and (min-width:425px) and (max-width: 767px){
  div.head {
    background-color: #cd9575;
    width:335px;
    height: 70px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 15px;
  font-size: 14px;
  position: absolute;
  width: 500px;
  margin-top:30px;
}
img.logo{
  width:45px ;
  height:55px;
  margin-left:30px;
  margin-top: 10px;
}
img.logo2{
  width:30px;
  height: 35px;
  margin-left:220px;
  position: absolute;
  margin-top: 24px;
}
}
/* @media screen and (min-width:480px) and (max-width: 767px){
div.head {
    background-color: #cd9575;
    width:499px;
    height: 90px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 14px;
  position: absolute;
  width: 200px;
  margin-top:40px;
}
} */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  div.head {
    background-color: #cd9575;
    width:750 px;
    height: 70px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 18px;
  position: absolute;
  width: 300px;
  margin-top:25px;
}
img.logo{
  width:50px ;
  height:65px;
  margin-left:50px;
  margin-top: 5px;
}
img.logo2{
  width:45px;
  height: 42px;
  margin-left:650px;
  position: absolute;
  margin-top: 18px;
}
}
@media screen and (min-width: 1024px) and (max-width: 1279px) {
  div.head {
    background-color: #cd9575;
    width:1025px;
    height: 70px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 18px;
  position: absolute;
  width: 300px;
  margin-top:25px;
}
img.logo{
  width:50px ;
  height:65px;
  margin-left:50px;
  margin-top: 5px;
}
img.logo2{
  width:45px;
  height: 42px;
  margin-left:850px;
  position: absolute;
  margin-top: 18px;
}
}
@media screen and (min-width: 1280px)and (max-width: 1359px) {
div.head {
    background-color: #cd9575;
    width:1280px;
    height: 70px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 18px;
  position: absolute;
  width: 300px;
  margin-top:25px;
}
img.logo{
  width:50px ;
  height:65px;
  margin-left:50px;
  margin-top: 5px;
}
img.logo2{
  width:45px;
  height: 42px;
  margin-left:1100px;
  position: absolute;
  margin-top: 18px;
}
}
@media screen and (min-width: 1360px)and (max-width: 1365px) {
  div.head {
    background-color: #cd9575;
    width:1376px;
    height: 70px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 18px;
  position: absolute;
  width: 300px;
  margin-top:25px;
}
img.logo{
  width:50px ;
  height:65px;
  margin-left:50px;
  margin-top: 5px;
}
img.logo2{
  width:45px;
  height: 42px;
  margin-left:1190px;
  position: absolute;
  margin-top: 18px;
}
}
@media screen and (min-width: 1366px){
  div.head {
    background-color: #cd9575;
    width:1376px;
    height: 70px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 18px;
  position: absolute;
  width: 300px;
  margin-top:25px;
}
img.logo{
  width:50px ;
  height:65px;
  margin-left:50px;
  margin-top: 5px;
}
img.logo2{
  width:45px;
  height: 42px;
  margin-left:1190px;
  position: absolute;
  margin-top: 18px;
}
}
/* @media screen and (max-width: 480px) {
div.head {
    background-color: #F99698    ;
    width:962px;
    height: 90px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 20px;
  position: absolute;
  width: 200px;
  margin-top:20px;
}
} */
/* @media screen and (max-width: 768px) {
 div.head {
    background-color: #F99698    ;
    width:962px;
    height: 90px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 20px;
  position: absolute;
  width: 200px;
  margin-top:20px;
}
}
@media screen and (max-width: 1024px) {
 div.head {
    background-color: #F99698    ;
    width:962px;
    height: 90px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 20px;
  position: absolute;
  width: 200px;
  margin-top:20px;
}
} */
/* @media screen and (max-width: 768px){
div.head {
    background-color: #F99698    ;
    width:1370px;
    height: 90px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;
}
span.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 40px;
  font-size: 20px;
  width:500px;
  position: absolute;
  margin-top:20px;
}
} */
.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 30px;
  font-size: 20px;
  position: absolute;
  margin-top:30px;
}

.logo{
  margin-left:50px;
  margin-top:7px; 
  padding-top:9px;
}
/* .logo2{
  margin-top: 0px;
  margin-left:1150px;
} */
.logo2{
  margin-left:1150px;
  position: absolute;
  margin-top: 19px;
}

.head {
    background-color: #cd9575;
    width:1390px;
    height: 90px;
    margin-top: -10px;
    margin-right:-20px ;
    margin-left: -20px;

}
/* .login {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 40px;
  font-size: 30px;
  margin-left: 1000px;
  position: absolute;
  margin-top:20px;
} */
</style>
