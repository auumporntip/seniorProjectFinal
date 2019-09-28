<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <v-layout class="space">
        <v-flex xs4>
          <p class="subheading">Bill : {{bill[0].billId}}</p>
          <p class="subheading">Table : {{bill[0].tableNumber}}</p>
        </v-flex>
        <v-flex xs8>
          <p class="subheading">Date : {{date}}</p>
          <p class="subheading">Time Start : {{time}}</p>
        </v-flex>
      </v-layout>

      <b-table :data="bill" :columns="columns"></b-table>
    </div>
    <v-btn
      class="white--text"
      color="#cd9575"
      id="spaceNext"
      @click="orderDialog=true"
    >Ordered detail</v-btn>
    <v-dialog max-width="490" v-model="orderDialog">
      <v-card>
        <v-form ref="form">
          <v-container fluid>
            <v-card color="primary" class="elevation-1">
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

            <v-card
              color="primary"
              class="elevation-1"
              outline
              v-for="order in orders"
              :key="order.orderId"
            >
              <v-layout row>
                <v-flex xs4>
                  <v-card-text class="text">{{order.menuName}}</v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text class="text">{{order.amount}}</v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text class="text">{{order.menuPrice*order.amount}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="orderDialog=false">Back</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <NavBar></NavBar>
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "MoReceiptPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      bill: "",
      typeOfService: [],
      tableNumber: "",
      orderDialog: false,
      columns: [
        {
          field: "typeName",
          label: "Promotion"
        },
        {
          field: "numOfCust",
          label: "Customer"
        },
        {
          field: "totalPrice",
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
        "http://localhost:3000/api/getorderbybillid/" +
          sessionStorage.getItem("billId")
      )
      .then(response => {
        this.orders = response.data;
        console.log(this.orders)
      });

    var id = sessionStorage.getItem("billId");

    axios
      .get("http://localhost:3000/api/getbillbybillid/" + id)
      .then(response => {
        this.bill = response.data;

        this.date = dayjs(this.bill[0].created_at).format("YYYY/MM/DD");
        this.time = dayjs(this.bill[0].created_at).format("HH:mm:ss");
        this.bill[0].typeName = this.typeOfService.typeName;
        if (this.typeOfService.service === "buffet") {
          this.bill[0].totalPrice = this.typeOfService.typePrice;
        } else {
          var price= 0;
          for (let index = 0; index < this.orders.length; index++) {
            price +=
              this.orders[index].amount * this.orders[index].pricePerPiece;
          }
          this.bill[0].totalPrice = price;
        }
      });
  }
};
</script>

<style scoped>
.space {
  margin: 20px;
  text-align: left;
}
.wrapper {
  margin: 15px;
  padding-bottom: 15px;
  padding-top: 20%;
}
#spaceNext {
  margin-left: 50%;
}
.textHead {
  font-weight: 1000;
}
.text {
  text-align: left;
  font-weight: 500;
}
</style>