<template>
  <v-content>
    <div class="bg">
      <v-img
        :src="require('../assets/logo1.jpg')"
        aspect-ratio="2"
        contain
        style="margin-top:3em;"
      ></v-img>
      <v-flex xs9>
        <v-form>
          <v-text-field
            solo
            label="Input your bill id"
            :rules="inputRules"
            class="textInput"
            v-model="billId"
          ></v-text-field>
        </v-form>
        <v-btn depressed color="#B7CDC2" class="btn" @click="next"
          >NEXT</v-btn
        >
      </v-flex>
    </div>
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
  width: 100%;
  position: fixed;
  background-color: #84a295;
}

.textInput {
  margin-top: 1em;
  margin-left: 6em;
  border-radius: 1em;
}
.btn {
  margin-left: 10em;
  border-radius: 0.2em;
}
.theme--light.v-messages {
  color: rgba(255, 34, 34, 0.86) !important;
}
.card {
  background-position-x: center;
  width: 30%;
}
</style>
