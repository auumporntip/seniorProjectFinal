<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <v-layout class="space">
        <!-- <v-flex xs4.5>
          <p class="styleText">Bill : {{ token.billId }}</p>
          <p class="styleText">Table : {{ token.tableNumber }}</p>
        </v-flex>
        <v-flex xs7.5>
          <p class="styleText">Date : {{ date }}</p>
          <p class="styleText">Time Start : {{ time }}</p>
          <p class="styleText">Time End : {{ timeEnd }}</p>
        </v-flex>-->
      </v-layout>

      <b-table :data="bill" :columns="columns"></b-table>
    </div>
    <v-layout row>
      <v-btn color="#B7CDC2" id="spaceNext" @click="orderDialog = true">Ordered detail</v-btn>

      <v-btn color="#B7CDC2" @click="checkBill" style="margin-left:5%;">Check Bill</v-btn>
    </v-layout>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290" data-app>
        <v-card class="dialogCheckbill">
          <v-icon
            color="red lighten-1"
            style="font-size:70px; margin-left:1.55em; margin-top: 0.3em;"
          >error</v-icon>
          <v-card-text class="nameDialog">Are you sure you want to check bill?</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="#7d7a73" flat @click="dialog = false" class="cancelBtn">NO</v-btn>
            <v-btn color="#305378" flat @click="okDialog" class="okBtn">YES</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-dialog max-width="490" v-model="orderDialog" data-app>
      <v-card>
        <v-form ref="form">
          <v-container grid-list-md>
            <v-card>
              <v-layout row>
                <v-flex xs4>
                  <v-card-text class="styleText">Menu</v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text class="styleText">Amount</v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text class="styleText">Price</v-card-text>
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
                  <v-card-text class="text">{{ order.menuName }}</v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text class="text">{{ order.amount }}</v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text class="text">
                    {{
                    order.menuPrice * order.amount
                    }}
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#305378" flat @click="orderDialog = false" class="closeBtn">BACK</v-btn>
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
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { host } from "./data";

export default {
  name: "MoReceiptPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      timeEnd: "",
      bill: [],
      token: "",
      date: "",
      time: "",
      orders: "",
      dialog: false,
      typeOfService: [],
      tableNumber: "",
      orderDialog: false,
      waitDialog: false,
      columns: [
        {
          field: "billId",
          label: "Bill"
        },
        {
          field: "date",
          label: "Date"
        },
        {
          field: "eatTimeStart",
          label: "Time start"
        },
        {
          field: "eatTimeEnd",
          label: "Time end"
        },
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
    checkBill() {
      var orders = [];
      var checkOrder = [];
      axios
        .get(host + "getorderbybillid/" + this.token.billId)
        .then(response => {
          orders = response.data;
          checkOrder = orders.filter(items => {
            return items.statusId != 4 && items.statusId != 5;
          });
          console.log(checkOrder, "test");
          if (checkOrder.length != 0) {
            Swal.fire({
              title: "Please check status your order",
              text:
                "if you have some order not finish or cancel please call employee for change status",
              type: "warning",
              confirmButtonColor: "#cd9575"
            });
          } else {
            this.dialog = true;
          }
        });
    },
    okDialog() {
      axios.put(host + "updatebill", this.bill[0]).then(response => {
        axios
          .post(host + "insertnotification", {
            notiMessage: "check bill",
            restaurantId: 1,
            billId: this.token.billId
          })
          .then(response => {
            this.dialog = false;
            this.waitDialog = true;

            this.$router.push("Mowait");
          });
      });
    }
  },
  async created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/MoLanding");
    }
    this.$store.commit("setNamePages", "Receipt");
    this.token = jwt.decode(localStorage.getItem("token"));
    this.typeOfService = this.token.typeOfService;
    axios.get(host + "getorderbybillid/" + this.token.billId).then(response => {
      this.orders = response.data.filter(items => items.statusId != "5");
      axios
        .get(host + "getbillbybillid/" + this.token.billId)
        .then(response => {
          this.bill = response.data;
          this.bill[0].date = dayjs(this.bill[0].created_at).format(
            "YYYY/MM/DD"
          );
          this.time = this.bill[0].eatTimeStart;
          this.timeEnd = this.bill[0].eatTimeEnd;
          this.bill[0].typeName = this.typeOfService.typeName;
          if (this.typeOfService.service === "buffet") {
            var price = (this.typeOfService.typePrice * this.bill[0].numOfCust)
              .toString()
              .split(".");
            price[0] = price[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            this.bill[0].totalPrice = price.join(".");
          } else {
            var price = 0;
            for (let index = 0; index < this.orders.length; index++) {
              price +=
                this.orders[index].amount * this.orders[index].pricePerPiece;
            }
            var price = price.toString().split(".");
            price[0] = price[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            this.bill[0].totalPrice = price.join(".");
          }
        });
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
  padding-top: 3em;
}
#spaceNext {
  margin-left: 13%;
}
.textHead {
  font-weight: 1000;
  font-weight: 500;
}
.cancelBtn {
  margin-left: 10%;
}
.okBtn {
  padding-left: 20%;
}
.img {
  padding-top: 20px;
}
.nameDialog {
  margin-left: 2%;
  font-size: 1.5em;
  padding-top: 0%;
}
.dialogCheckbill {
  border-radius: 5%;
}
.styleText {
  font-size: 1.2em;
}
</style>
