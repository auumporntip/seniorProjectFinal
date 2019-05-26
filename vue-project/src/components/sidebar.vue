<template>
  <div id="bar">
    <div class="barofcolor">
      <div class="drop">
        <section id="dropdown">
          <b-dropdown v-model="selectedRestaurant" aria-role="list">
            <button id="dropp" class="button is-light" slot="trigger" align-center >
              {{$store.getters.restaurantName}}
            </button>

            <b-dropdown-item 
              v-for="option in restaurant"
              :value="option"
              :key="option.restaurantId"
              @click="changeRestaurant"
            >{{option.restaurantName}}</b-dropdown-item>
            <b-dropdown-item>
                <router-link to="/CreateRestaurant">Create Restaurant</router-link>
            </b-dropdown-item>
          </b-dropdown>
        </section>
      </div>
      <br>
      <li>
        <router-link to="/Menu">Menu</router-link>
      </li>
      <br>
      <li>
        <router-link to="/Transaction">Transaction</router-link>
      </li>
      <br>
      <li>
        <router-link to="/Ordered">Ordered</router-link>
      </li>
      <br>
      <li>
        <router-link to="/TypeOfService">Type of Service</router-link>
      </li>
      <br>
      <li>
        <router-link to="/Static">Statistic</router-link>
      </li>
      <br>
      <li>
        <router-link to="/Notification">Notification</router-link>
      </li>
      <br>
      <li>
        <router-link to="/Employee">Employee</router-link>
      </li>
      <br>
      <li>
        <button @click="clearStore">Logout</button>
      </li>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "sidebar",
  data() {
    return {
      selectedRestaurant:'',
      restaurant: []
    };
  },
  methods: {
    changeRestaurant(){
      // console.log(this.selectedRestaurant.restaurantId)
      this.$store.commit('setRestaurantName',this.selectedRestaurant.restaurantName)      
      this.$store.commit('setRestaurantId',this.selectedRestaurant.restaurantId)
      this.$router.push('/createrestaurant');
    },
    clearStore(){
      this.$store.commit('setName',"")      
      this.$store.commit('setAccount',"")
      this.$store.commit('selectedRestaurant',"")      
      this.$store.commit('setRestaurantId',"")
      this.$store.commit('setRestaurantName',"")   
      this.$router.push('/');
    }
  },
  created() {
    Axios.get("http://localhost:3000/api/getrestaurant/"+this.$store.getters.accountId).then(response => {
      this.restaurant = response.data;
    });
  }
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
