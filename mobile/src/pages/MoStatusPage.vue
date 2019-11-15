<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <!--menu-->
      <v-card color="primary" class="elevation-1">
        <v-layout row>
          <v-flex xs6>
            <v-card-text class="textHead">Menu</v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="textHead">Status</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card
        color="primary"
        class="elevation-1"
        outline
        v-for="order in orders"
        :key="order.orderId"
      >
        <v-layout row>
          <v-flex xs6>
            <v-card-text class="text">{{order.menuName}}</v-card-text>
          </v-flex>
          <v-flex xs4>
            <div v-if="orders.statusId===5">
              <v-card-text class="textRed">{{order.statusName}}</v-card-text>
            </div>
            <div v-else>
              <v-card-text class="text">{{order.statusName}}</v-card-text>
            </div>
          </v-flex>
        </v-layout>
      </v-card>

      <!--noti-->
      <v-card color="primary" class="elevation-1">
        <v-layout row>
          <v-flex xs6>
            <v-card-text class="textHead">Call Employee</v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="textHead">Status</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card
        color="primary"
        class="elevation-1"
        outline
        v-for="notification in noti"
        :key="notification.notiId"
      >
        <v-layout row>
          <v-flex xs6>
            <v-card-text class="text">{{notification.notiMessage}}</v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text v-if="notification.status===0" class="text">Waiting</v-card-text>
            <v-card-text v-if="notification.status===1" class="text">Finish</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    <v-footer>
      <NavBar></NavBar>
    </v-footer>
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import { store } from "../store/store";
import axios from "axios";
import jwt from "jsonwebtoken";
import { host } from "./data";
export default {
  name: "MoStatusPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      orders: [],
      noti: [],
      token: "",
      columns: [
        {
          field: "menuName",
          label: "Menu"
        },
        {
          field: "statusName",
          label: "Status"
        },
        {
          field: "notiMessage",
          label: "Message"
        },
        {
          field: "statusName",
          label: "Status"
        }
      ]
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/MoLanding");
    }
    this.$store.commit("setNamePages", "Status");
    this.token = jwt.decode(localStorage.getItem("token"));
    setInterval(() => {
      axios
        .get(host + "getorderbybillid/" + this.token.billId)
        .then(response => {
          this.orders = response.data;
        });
      axios
        .get(host + "getnotificationbybillid/" + this.token.billId)
        .then(response => {
          this.noti = response.data;
        });
    }, 5000);
  }
};
</script>

<style scoped>
.wrapper {
  margin: 15px;
  padding-top: 20%;
}
.textHead {
  font-weight: 1000;
}
.text {
  text-align: left;
  font-weight: 500;
}
.textRed {
  text-align: left;
  font-weight: 500;
  color: red;
}
</style>