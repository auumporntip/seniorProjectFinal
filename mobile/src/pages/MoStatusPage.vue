<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">

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
            <div v-if="orders.statusId==3">
            <v-card-text class="textRed">{{order.statusName}}</v-card-text>
            </div>
            <div v-else>
               <v-card-text class="text">{{order.statusName}}</v-card-text>
            </div>
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
      columns: [
        {
          field: "menuName",
          label: "Menu"
        },
        {
          field: "statusName",
          label: "Status"
        }
      ]
    };
  },
  created() {
    this.$store.commit("setNamePages", "Status");
    axios
      .get(
        "http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/getorderbybillid/" +
          sessionStorage.getItem("billId")
      )
      .then(response => {
        this.orders = response.data;
      });
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