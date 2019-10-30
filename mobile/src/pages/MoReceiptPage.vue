<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <v-layout class="space">
        <v-flex xs5>
          <p class="subheading">Bill : {{token.billId}}</p>
          <p class="subheading">Table : {{token.tableNumber}}</p>
        </v-flex>
        <v-flex xs7>
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

    <v-btn class="white--text" color="#cd9575" id="spaceNext" @click="dialog=true">Check Bill</v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-text>Are you sure you want to check bill?</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" flat @click="dialog=false" class="cancelBtn">cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="okDialog" class="okBtn">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

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
            <v-btn color="blue darken-1" flat @click="orderDialog = false" class="closeBtn">BACK</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- <template>
    <v-container>
    <v-dialog v-model="waitDialog">
      <v-card color="#F9F9F9" >
      <div class="img"> <center><v-progress-circular :value="60"></v-progress-circular></center> </div>
      <p class="text">Please wait, your request is being processed. </p>
    </v-card>
    </v-dialog>
    </v-container>
    </template>-->

    <NavBar></NavBar>
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import {host} from './data'

export default {
  name: "MoReceiptPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      bill: "",
      token: "",
      orders:'',
      dialog: false,
      typeOfService: [],
      tableNumber: "",
      orderDialog: false,
      waitDialog: false,
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
  methods: {
    okDialog() {
      axios
        .post(host+"insertnotification", {
          notiMessage: "check bill",
          restaurantId: 1,
          billId: this.token.billId
        })
        .then(response => {
          this.dialog = false;
          this.waitDialog = true;

          this.$router.push("Mowait");
        });
    }
  },
  created() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/MoLanding");
    }
    this.$store.commit("setNamePages", "Receipt");
    this.token = jwt.decode(sessionStorage.getItem("token"));
    this.typeOfService = this.token.typeOfService;
    axios
      .get(host+"getorderbybillid/" + this.token.billId)
      .then(response => {
        this.orders = response.data;
        console.log(this.orders);
      });

    axios
      .get(host+"getbillbybillid/" + this.token.billId)
      .then(response => {
        this.bill = response.data;

        this.date = dayjs(this.bill[0].created_at).format("YYYY/MM/DD");
        this.time = dayjs(this.bill[0].created_at).format("HH:mm:ss");
        this.bill[0].typeName = this.typeOfService.typeName;
        if (this.typeOfService.service === "buffet") {
          this.bill[0].totalPrice =
            this.typeOfService.typePrice * this.bill[0].numOfCust;
        } else {
          var price = 0;
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
  margin-left: 6%;
}
.textHead {
  font-weight: 1000;
}
.text {
  text-align: left;
  font-weight: 500;
}
.cancelBtn {
  margin-left: 10%;
}
.okBtn {
  padding-left: 20%;
}
.text {
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 40px;
}
.img {
  padding-top: 20px;
}
</style>