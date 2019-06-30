<template>
  <div >
    <Header></Header>
    <sidebar></sidebar>
    <div id="biggest" >
      <div id="header">
        CREATE RESTAURANT
        <form id="login">
          <div id="RestaurantName">
            <span>Restaurant Name</span>
            <b-field :type="errorsMessage[0]" :message="errors[0]" expanded style="width:450px;">
              <b-input v-model="restaurantName"></b-input>
            </b-field>
          </div>
          <div id="Description">
            <span>Restaurant Description</span>
            <b-input v-model="restaurantDescription" type="textarea" style="width:450px;"></b-input>
          </div>
          <div id="Location">
            <span>Location</span>
            <b-field :type="errorsMessage[1]" :message="errors[1]">
              <b-input v-model ="restaurantLocation" type="textarea" style="width:450px;"></b-input>
            </b-field>
          </div>
          <br>
          <div id="Location">
            <span>Phone Number</span>
            <b-field :type="errorsMessage[2]" :message="errors[2]">
              <b-input v-model="restaurantPhone" style="width:450px;"></b-input>
            </b-field>
          </div>
          <br>
          <div id="Type">
            <b-field :type="errorsMessage[5]" :message="errors[5]">
              <span style="padding-left:500px;">Type of Restaurant</span>
              <b-select
                v-model="selectedTypeOfRes"
                placeholder="Select a type"
                style="padding-left:20px;"
              >
                <option
                  v-for="option in typeOfRestaurant"
                  :value="option.typeResId"
                  :key="option.typeResId"
                >{{option.typeResName}}</option>
              </b-select>
            </b-field>
          </div>
          <br>
          <div id="time">
            <b-field :type="errorsMessage[3]" :message="errors[3]">
              <span style="padding-left:500px;">Opening</span>
              <b-timepicker
                v-model="open"
                style="padding-left:100px;"
                placeholder="Type or select a time.."
                icon="clock"
              ></b-timepicker>
            </b-field>
          </div>
          <br>
          <div id="timeclose">
            <b-field :type="errorsMessage[4]" :message="errors[4]">
              <span style="padding-left:500px;">Closing</span>
              <b-timepicker
                v-model="close"
                style="padding-left:110px;"
                placeholder="Type or select a time.."
                icon="clock"
              ></b-timepicker>
            </b-field>
          </div>
        </form>

        <button @click="submitForm">
          CREATE RESTAURANT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "SignupPage",
  components: {
    Header,
    sidebar
  },
  data() {
    return {
      typeOfRestaurant: [],
      selectedTypeOfRes: {
        typeResId: "",
        typeResName: ""
      },

      errors: [],
      errorsMessage: [],

      restaurantName: "",
      restaurantDescription: "",
      restaurantLocation: "",
      open: null,
      close: null,
      timeOpenClose: "",
      restaurantPhone: "",

      check: true
    };
  },
  methods: {
    submitForm(){
      if(this.checkForm()){
        this.createRestaurant()
      }
    },
    checkForm() {
      this.errors=[]
      this.errorsMessage=[]
      console.log(this.selectedTypeOfRes);
      this.check=true 
      if (this.restaurantName === "") {
        this.errors.push("restaurant name required");
        this.errorsMessage.push("is-danger");
        this.check = false;
      } else {
        this.errors.push("");
        this.errorsMessage.push("");
      }
      if (this.restaurantLocation === "") {
        this.errors.push("restaurant location required");
        this.errorsMessage.push("is-danger");
        this.check = false;
      } else {
        this.errors.push("");
        this.errorsMessage.push("");
      }
      if (this.restaurantPhone === "") {
        this.errors.push("phone required");
        this.errorsMessage.push("is-danger");
        this.check = false;
      } else {
        this.errors.push("");
        this.errorsMessage.push("");
      }
      if (this.open === null) {
        this.errors.push("time open required");
        this.errorsMessage.push("is-danger");
        this.check = false;
      } else {
        this.errors.push("");
        this.errorsMessage.push("");
      }
      if (this.close === null) {
        this.errors.push("time open required");
        this.errorsMessage.push("is-danger");
        this.check = false;
      } else {
        this.errors.push("");
        this.errorsMessage.push("");
      }
      if (this.selectedTypeOfRes.typeResId === "") {
        this.errors.push("type of restaurant required");
        this.errorsMessage.push("is-danger");
        this.check = false;
      } else {
        this.errors.push("");
        this.errorsMessage.push("");
      }
      this.timeOpenClose =dayjs(this.open).format("HH:mm")+"-"+dayjs(this.close).format("HH:mm")
      console.log(this.timeOpenClose);
      return this.check
    },
    createRestaurant() {
      axios.post("http://localhost/api/insertrestaurant", {
        restaurantName: this.restaurantName,
        restaurantLocation: this.restaurantLocation,
        timeOpenClose: this.timeOpenClose,
        restaurantPhone: this.restaurantPhone,
        restaurantDescription: this.restaurantDescription,
        typeResId: this.selectedTypeOfRes,
        accountId: this.$store.getters.accountId
      }).then(response=>{
        this.$store.commit('setRestaurantId',response.data)
        this.$store.commit('setRestaurantName',this.restaurantName)
        this.$router.push('/restaurant');
      })
    }
  },
  created() {
    axios
      .get("http://localhost/api/gettypeofrestaurant")
      .then(response => {
        this.typeOfRestaurant = response.data;
        console.log(this.typeOfRestaurant);
      });
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
#biggest {
  background-color: #f0cab1;
  height: 50%;
  background-attachment: fixed;  
}
#RestaurantName {
  text-align: left;
  padding-left: 500px;
  width: 1000px;
}
#Description {
  text-align: left;
  padding-left: 500px;
}
#Username {
  text-align: left;
  padding-left: 500px;
  width: 1300px;
}
#Name {
  text-align: left;
  padding-left: 500px;
  width: 1000px;
}
#Email {
  text-align: left;
  padding-left: 500px;
  width: 1000px;
}
#Tel {
  text-align: left;
  padding-left: 500px;
  width: 1300px;
}
#Location {
  text-align: left;
  padding-left: 500px;
}
#input {
  padding-left: 20px;
}
#type {
  text-align: left;
  padding-left: 900px;
  width: 2000px;
}
#Password {
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
li {
  list-style-type: none;
}
</style>
