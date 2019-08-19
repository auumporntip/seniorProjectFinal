<template>
  <div id="bar">
    <div class="barofcolor">
      <div class="drop">
      <br>
      <li>
        <router-link to="/accountsuper">Account</router-link>
      </li>
      <br>
      <li>
        <router-link to="/billsuper">Bill</router-link>
      </li>
      <br>
      <li>
        <router-link to="/catsuper">Category</router-link>
      </li>
      <br>
      <li>
        <router-link to="/empsuper">Employee</router-link>
      </li>
      <br>
      <li>
        <router-link to="/menusuper">Menu</router-link>
      </li>
      <br>
      <li>
        <router-link to="/menuservicesuper">MenuService</router-link>
      </li>
      <br>
      <li>
        <router-link to="/notificationsuper">Notification</router-link>
      </li>
      <br>
      <li>
        <router-link to="/positionsuper">position</router-link>
      </li>
      <br>
      <li>
        <router-link to="/restaurantsuper">Restaurant</router-link>
      </li>
      <br>
      <li>
        <router-link to="/statussuper">Status</router-link>
      </li>
      <br>
      <li>
        <router-link to="/transactionsuper">Transaction</router-link>
      </li>
      <br>
      <li>
        <router-link to="/typeofressuper">TypeOfRestaurant</router-link>
      </li>
      <br>
      <li>
        <router-link to="/typeofservicesuper">TypeOfService</router-link>
      </li>
      <br>
      <li>
        <button>Logout</button>
      </li>
    </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "sidebarsuper",
  data() {
    return {
    };
  },
  
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
@media screen and (min-width: 320px) and (max-width: 480px) {
  div.barofcolor {
    background-color: #eec9c9;
    background-attachment: fixed;  
    width: 110px;
    height: 52em;
    padding-top: 40px;
    margin-left: -6px;

    padding-left: 20px;
  }
  div.drop {
    padding-top: 10px;
    margin-left: -5px;
    margin-top: -30px;
    width: 20px;
  }
  button#dropp {
    width: 90px;
  }
}
#dropp {
  width: 170px;
}
#bar {
  float: left;
  position: absolute;
  margin-top: 0px;
}
#navbar {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18;
}
.barofcolor {
  background-color: #eaddd4;
  width: 190px;
  height: 52em;
  padding-top: 5px;
  margin-left: -6px;
  padding-left: 20px;
}
/* ul :hover{
    background-color:white	;
    width: 200px;
    height: 40px;
    margin-left: -5px;
    
} */
li {
  list-style-type: none;
}
.drop {
  padding-top: 10px;
  margin-left: -7px;
}
</style>
