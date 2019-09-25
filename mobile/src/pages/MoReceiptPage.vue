<template>
  <v-content>
    <Bar></Bar>
    <v-layout class="space">
      <v-flex xs6>
        <p class="subheading">Bill : {{bill[0].billId}}</p>
        <p class="subheading">Table : {{bill[0].tableNumber}}</p>
      </v-flex>
      <v-flex xs6>
        <p class="subheading">Date : {{bill[0].created_at}}</p>
        <p class="subheading">Time Start : {{bill[0].eatTimeStart}}</p>
      </v-flex>
    </v-layout>

    <div class="wrapper">
      <b-table :data="data" :columns="columns"></b-table>
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
  name: "MoReceiptPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      bill: '',
      typeOfService: [],
      tableNumber: "",

      data: [{ id: 1, ordered: "Buffet 1199.-", amount: "2", price: "2,398" }],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "1000",
          numeric: true
        },
        {
          field: "ordered",
          label: "Ordered"
        },
        {
          field: "amount",
          label: "Amount"
        },
        {
          field: "price",
          label: "Price",
          numeric: true
        }
      ]
    };
  },
  created() {
    this.$store.commit("setNamePages", "Receipt");
    this.typeOfService = JSON.parse(sessionStorage.getItem("typeOfService"));

    axios
      .get(
        "http://localhost:3000/api/getbillbybillid/" +
          sessionStorage.getItem("billId")
      )
      .then(response => {
        this.bill = response.data;
        
    console.log(this.bill);
      });
  }
};
</script>

<style scoped>
.space {
  margin: 20px;
  text-align: center;
}
.wrapper {
  margin: 15px;
  padding-bottom: 15px;
}
</style>