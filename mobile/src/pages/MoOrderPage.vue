<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <v-card color="primary" class="elevation-1" >
        <v-layout row>
          <v-flex xs4>
            <v-card-text class="textHead">Menu</v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="textHead">Amount</v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="textHead">Price</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card color="primary" class="elevation-1" outline v-for="order in orders" :key="order.orderId">
        <v-layout row>
          <v-flex xs4>
            <v-card-text class="text">{{order.menuName}}</v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="text">{{order.amount}}</v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="text">{{order.menuPrice}}</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card height="auto" flat>
        <v-card-title>
          <strong class="subheading black--text">Total Prices: {{sumTotalPrice}} ฿</strong>
          <v-btn @click="confirm" color="#cd9575" class="white--text" id="confirmBtn">Confirm</v-btn>
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
    };
  },
  methods: {
    confirm() {
      for (let index = 0; index < this.orders.length; index++) {
        axios
          .post("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/insertordered", {
            pricePerPiece: this.orders[index].menuPrice,
            amount: this.orders[index].amount,
            menuId: this.orders[index].menuId,
            statusId: 1,
            billId: sessionStorage.getItem("billId")
          })
          .then(response => {
            console.log(response.data);
            this.$router.push("/Mostatus");
            sessionStorage.setItem("foodMenu", null);
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
    this.$store.commit("setNamePages", "Order");
    this.orders = JSON.parse(sessionStorage.getItem("orders"));
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
  font-weight: 1000;
}
.text {
  text-align: left;
  font-weight: 500;
}
#confirmBtn{
  margin-left: 10%;
}

</style>
