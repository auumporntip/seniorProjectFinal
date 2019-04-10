<template>
  <div id="bar">
   <div class="barofcolor">
     <div class="drop">
     <section id="dropdown" >
          <b-dropdown aria-role="list" >
            <button id="dropp" class="button is-light" slot="trigger" align-center >
              <span>User</span>
              <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">คำโต บางมด</b-dropdown-item><br>
            <b-dropdown-item aria-role="listitem">
              <li><router-link to="/CreateRestaurant">Create Restaurant</router-link></li></b-dropdown-item>
            <!-- <b-dropdown-item aria-role="listitem">Buffet399</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet499</b-dropdown-item><br> -->
          </b-dropdown>
        </section>
  </div><br>
  <li><router-link to="/Menu">Menu</router-link></li><br>
  <li><router-link to="/Transaction">Transaction</router-link></li><br>
  <li><router-link to="/Ordered">Ordered</router-link></li><br>
  <li><router-link to="/Ordered">Type of Service</router-link></li><br>
  <li><router-link to="/Static">Statistic</router-link></li><br>
  <li><router-link to="/Notification">Notification</router-link></li><br>
  <li><router-link to="/Employee">Employee</router-link></li><br>
  <li><router-link to="/Login">Logout</router-link></li>

    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
@media screen and (min-width: 320px) and (max-width: 480px){
div.barofcolor{
    background-color:#EEC9C9    ;
    width: 110px;
    height: 100vh;
    padding-top: 40px;
    margin-left:-6px;

    padding-left: 20px;
 } 
div.drop {
  padding-top: 10px;
  margin-left: -5px;
  margin-top:-30px;
  width: 20px;
}
button#dropp{
  width: 90px;
}
}
#dropp{
  width: 170px;
}
#bar{
    float:left;
    position: absolute;
    margin-top:0px; 
}
#navbar{
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 18;
}
.barofcolor{
    background-color:#eaddd4;
    width: 190px;
    height: 100vh;
    padding-top: 5px;
    margin-left:-6px;
    padding-left: 20px;
}
/* ul :hover{
    background-color:white	;
    width: 200px;
    height: 40px;
    margin-left: -5px;
    
} */
li{
  list-style-type: none;
}
.drop {
  padding-top: 10px;
  margin-left: -7px;
  
}
</style>
