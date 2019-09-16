<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <b-table :data="orders" mobile-card :columns="columns"></b-table>
      <v-card height="auto" flat>
        <v-card-title>
          <strong class="subheading black--text">Total Prices : {{sumTotalPrice}} Baht</strong>
          <v-btn @click="confirm" color="#cd9575" class="white--text">Confirm</v-btn>
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
      columns: [
        {
          field: "menuName",
          label: "Menu",
          width: "1000",
          numeric: true
        },
        {
          field: "amount",
          label: "Amount",
          width: "10",
          numeric: true
        },
        {
          field: "menuPrice",
          label: "Price per piece",
          width: "1000",
          numeric: true
        }
      ]
    };
  },
  methods: {
    confirm() {
      for (let index = 0; index < this.orders.length; index++) {
        axios
          .post("http://localhost:3000/api/insertordered", {
            pricePerPiece: this.orders[index].menuPrice,
            amount: this.orders[index].amount,
            menuId: this.orders[index].menuId,
            statusId: 1,
            billId: localStorage.getItem("billId")
          })
          .then(response => {
            console.log(response.data);
            this.$router.push("/Mostatus");
            localStorage.setItem('foodMenu',null)
          });
      }
    }
  },
  computed: {
    sumTotalPrice() {
      console.log(this.orders.length);
      for (let index = 0; index < this.orders.length; index++) {
        this.sum += this.orders[index].amount * this.orders[index].menuPrice;
      }
      return this.sum;
    }
  },
  created() {
    this.$store.commit("setNamePages", "Order");
    this.orders = JSON.parse(localStorage.getItem("orders"));
    // console.log(this.$store.getters.orders)
  }
};
</script>

<style scoped>
.wrapper {
  margin: 15px;
}
</style>
