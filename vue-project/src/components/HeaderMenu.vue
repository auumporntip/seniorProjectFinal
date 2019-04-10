<template>
<section class="HeaderMenu">
  <div id="bar">
    <img class="logo" src="../assets/1.png" width="65px" height="61px">
   <span class= res> คำโตบางมด</span>
   
   
   <!-- <span class= login>LOGIN</span> -->
   
  </div>
</section>
</template>

<script>
export default {
  name: 'HeaderMenu',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.res {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 40px;
  font-size: 30px;
  position: absolute;
  margin-top:20px;
}

.logo{
  margin-left:70px;
  padding-top:9px;
}

#bar {
    background-color: #FF9797     ;
    width:1600px;
    height: 80px;
    margin-top: -9px;
    margin-right:-20px ;
    margin-left: -20px;

}

</style>
