<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <v-card color="primary" class="elevation-1" >
        <v-layout row>
          <v-flex xs6>
            <v-card-text class="textHeadMenu">Menu</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="textHead">Amount</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="textHead">Price</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card color="primary" class="elevation-1" outline v-for="order in orders" :key="order.orderId">
        <v-layout row>
          <v-flex xs6>
            <v-card-text class="textMenu">{{order.menuName}}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="text">{{order.amount}}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="text">{{order.menuPrice * order.amount}}</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card height="auto" flat>
        <v-card-title>
          <strong class="text">Total Prices: {{sumTotalPrice}} ฿</strong>
          <v-btn @click="confirm" color="#B7CDC2" id="confirmBtn">Confirm</v-btn>
        </v-card-title>
      </v-card>
    </div>
    <NavBar></NavBar>
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import { store } from "../store/store";
import axios from "axios";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import {host} from './data'

export default {
  name: "MoOrderPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      orders: null,
      sum: 0,
      token:'',
    };
  },
  methods: {
    confirm() {
      for (let index = 0; index < this.orders.length; index++) {
        axios
          .post(host+"insertordered", {
            pricePerPiece: this.orders[index].menuPrice,
            amount: this.orders[index].amount,
            menuId: this.orders[index].menuId,
            statusId: 1,
            billId: this.token.billId
          })
          .then(response => {
            console.log(response.data);
            this.$router.push("/Mostatus");
            localStorage.setItem("foodMenu", null);
          });
      }
    }
  },
  computed: {
    sumTotalPrice() {
      for (let index = 0; index < this.orders.length; index++) {
        this.sum += this.orders[index].amount * this.orders[index].menuPrice;
      }
      return this.sum;
    }
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/MoLanding");
    }
    this.$store.commit("setNamePages", "Order");
    this.token = jwt.decode(localStorage.getItem('token'))
    this.orders = JSON.parse(localStorage.getItem("orders"));
  }
};
</script>

<style scoped>
.wrapper {
  margin: 15px;
  padding-top: 20%;  
  margin-bottom: 20%;
}
.textHead {
  font-size: 1.4em;
  text-align: center;
  font-weight: bold;
}
.text {
  text-align: center;
  font-size: 1.2em;
}
#confirmBtn{
  margin-left: 10%;
}
.textHeadMenu {
  font-size: 1.4em;
  text-align: left;
  font-weight: bold;
}
.textMenu {
  text-align: left;
  font-size: 1.2em;
}

</style>
