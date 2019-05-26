<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="biggest" >
    <v-layout id="layout">
    <v-flex xs12 sm6 offset-sm3>
      <v-card id="card">
      <div id="header">
        {{this.restaurantName}}
        <form >
          <div id="Description" >
            <span>Restaurant Description :</span>
            <span>{{this.restaurantDescription}}</span>
          </div>
          <div id="Location">
            <span>Location:</span>
            <span>{{this.restaurantLocation}}</span>
          </div>
          
          <div id="Tel">
            <span>Phone Number</span>
            <span>{{this.restaurantPhone}}</span>
          </div>
          
          <div id="Type">
            <b-field >
              <span>Type of Restaurant: </span>
              {{this.typeResName}}
            </b-field>
          </div>
          
          <div id="time">
            <b-field>
              <span>Open - Close : {{this.timeOpenClose}}</span>
            </b-field>
          </div>
          
        </form>
        
        <button>
          EDIT RESTAURANT
        </button>
      </div>
      </v-card>
    </v-flex>
  </v-layout>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "Restaurant",
  components: {
    Header,
    sidebar
  },
  data() {
    return {
        restaurant:[],
        restaurantName:'',
        restaurantDescription:'',
        restaurantPhone:'',
        restaurantLocation:'',
        typeResName:'',
        timeOpenClose:''
    };
  },
  methods: {

  },
  created() {
    axios
      .get("http://13.228.170.25:7777/api/getrestaurantbyrestaurantId/"+this.$store.getters.restaurantId)
      .then(response => {
        this.restaurant = response.data;
        this.restaurantDescription=this.restaurant[0].restaurantDescription
        this.restaurantName=this.restaurant[0].restaurantName
        this.restaurantPhone=this.restaurant[0].restaurantPhone
        this.typeResName=this.restaurant[0].typeResName
        this.restaurantLocation=this.restaurant[0].restaurantLocation,
        this.timeOpenClose=this.restaurant[0].timeOpenClose
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layout{
    padding-top: 30px;
}
#card{
  
  padding-left: 0px;
  width: 900px;
}

#header {
  font-family: "Verdana";
  font-size: 18px;
  text-align: center;
  padding-top: 25px;
}
#biggest {
  background-color: #f0cab1;
  height: 52em;
  background-attachment: fixed;  
}
#Description {
  text-align: left;
  padding-left: 100px;
} 
 #Tel{
  text-align: left;
  padding-left: 100px;
}

#Location {
  text-align: left;
  padding-left: 100px;
}

#Type {
  text-align: left;
  padding-left: 100px;
}
#time {
  text-align: left;
  padding-left: 100px;
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
li {
  list-style-type: none;
}

</style>
