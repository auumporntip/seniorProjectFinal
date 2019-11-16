<template>
  <v-content>
    <v-card class="bg">
      <v-flex xs4>
          <v-img
            :src="require('../assets/loginCircle.jpg')"
            aspect-radio="1.2"
            class="pic"
          ></v-img
        >
        </v-flex>
        <v-flex xs3>
          <v-form>
            <v-text-field
              solo
              label="Enter your code"
              :rules="inputRules"
              class="textInput"
              v-model="billId"
            ></v-text-field>
          </v-form>
          <v-btn depressed color="rgb(221, 221, 221)" class="btn" @click="next"
            >NEXT</v-btn
          >
      </v-flex>
    </v-card>
  </v-content>
</template>

<script>
import { store } from "../store/store";
import axios from "axios";
import { host } from "./data";
import Swal from "sweetalert2";

export default {
  name: "MoLandingPage",
  components: {},
  data() {
    return {
      billId: "",
      inputRules: [v => !isNaN(this.billId) || "not a number"]
    };
  },
  methods: {
    next() {
      if (this.billId != "") {
        axios.post(host + "verifybill/" + this.billId).then(response => {
          
          if (response.data.login === true) {
            localStorage.setItem("token", response.data.token);
            this.$router.push("/Momenu");
          } else {
            Swal.fire({
              title: "",
              text: "Bill ID Incorrect",
              type: "warning",
              confirmButtonColor: "#cd9575"
            });
          }
        });
      } else {
        Swal.fire({
          title: "",
          text: "Please input Bill ID",
          type: "warning",
          confirmButtonColor: "#cd9575"
        });
      }
    }
  },
  created() {}
};
</script>
<style scoped>
.bg {
  height: 1000px;
  width: 1000px;
  position: fixed;
  background-color: #84a295;
}
.pic {
  display: table;
margin: 0 auto;
width: 80%;
}
.textInput {
  margin-top: 1em;
  margin-left: 2.7em;
  border-radius: 1em;
}
.btn {
  margin-left: 7em;
  border-radius: 0.2em;
}
.theme--light.v-messages {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>
