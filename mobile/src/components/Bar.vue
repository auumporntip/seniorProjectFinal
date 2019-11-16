<template>
  <div>
    <v-toolbar color="#84A295" fixed>
      <p v-if="this.$store.getters.namePages === 'Menu'" flat icon color="white">
        <v-icon></v-icon>
      </p>
      <v-img
        v-else-if=" this.$store.getters.namePages ==='TypeOfService'"
        :src="image_src"
        max-width="65px"
        style="margin-left:-1em;"
      ></v-img>
      <v-btn v-else @click="goBack" flat icon color="white">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title
        class="headline-text white--text"
        style="margin-left:5px;"
      >{{this.$store.getters.namePages}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="this.typeOfService.service === 'buffet'">
      Duration : 
      {{time}}
      </div>
    </v-toolbar>
  </div>
</template>


<script>
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import momentT from "moment-timezone";
import Swal from "sweetalert2";
import jwt from "jsonwebtoken";
import { host } from "../pages/data";

export default {
  name: "Bar",
  data() {
    return {
      dialog: false,
      warning: false,
      image_src: require("../assets/loginCircle.jpg"),
      typeOfService: [],
      billId: "",
      tableNumber: "",
      bill: [],
      time: ""
    };
  },
  methods: {
    goBack() {
      if (
        this.$store.getters.namePages === "Order" ||
        this.$store.getters.namePages === "Status" ||
        this.$store.getters.namePages === "CallEmployee" ||
        this.$store.getters.namePages === "Receipt"
      ) {
        this.$router.push("/Momenu");
      } else if (this.$store.getters.namePages === "Menu") {
        this.$router.push("/MoType");
      }
    },
    checkTimeEnd(frontTime, backTime, second) {
      var front = this.typeOfService.typeTime.substring(
        0,
        this.typeOfService.typeTime.indexOf(".")
      );
      var back = this.typeOfService.typeTime.substring(
        this.typeOfService.typeTime.indexOf(".") + 1
      );

      var front1 = 0;
      var back1 = 0;

      if (parseInt(back) < 15) {
        front1 = parseInt(front) - 1;
        back1 = parseInt(back) + 60 - 15;
      } else {
        back1 = parseInt(back) - 15;
      }
      var hour = 0;
      var minute = 0;

      if (front1 < 10) {
        hour = "0" + front1;
      } else {
        hour = front1;
      }
      if (back1 < 10) {
        minute = "0" + back1;
      }
      if (frontTime === hour && backTime === minute && second === "00") {
        Swal.fire({
          title: "Warning",
          text: "Time end in 15 minute",
          type: "warning",
          confirmButtonColor: "#cd9575",
          confirmButtonText: "Close"
        });
      }
      if (dayjs(Date()).format("HH:mm:ss") === this.bill[0].eatTimeEnd) {
        Swal.fire({
          title: "Warning",
          text: "Time End Please checkbill",
          type: "warning",
          confirmButtonColor: "#cd9575",
          confirmButtonText: "Close"
        });
      }
    }
  },
  created() {
    if (localStorage.getItem("token") != null) {
      var token = jwt.decode(localStorage.getItem("token"));
      this.billId = token.billId;
      this.tableNumber = token.tableNumber;
      this.typeOfService = token.typeOfService;

      if (
        this.$store.getters.namePages != "TypeOfService" &&
        this.typeOfService.service === "buffet"
      ) {
        var front = this.typeOfService.typeTime.substring(
          0,
          this.typeOfService.typeTime.indexOf(".")
        );
        var back = this.typeOfService.typeTime.substring(
          this.typeOfService.typeTime.indexOf(".") + 1
        );
        axios.get(host + "getbillbybillid/" + this.billId).then(response => {
          this.bill = response.data;
          var date1 = moment(moment(this.bill[0].created_at)._d).unix();
          setInterval(() => {
            var date2 = moment(new Date()).unix();
            var date3 = moment.unix(date2 - date1);
            var date4 = momentT(date3._d);
            var time = date4.tz("Asia/Bangkok").format("hh:mm:ss");
            if (time.charAt(0) != "0") {
              var index = parseInt(time.substring(0, 2)) - 12;

              this.time = "0" + index + time.substring(2, 8);
            } else {
              var index1 = parseInt(time.charAt(1)) - 7;
              this.time = "0" + index1 + time.substring(2, 8);
            }
            console.log(this.time);

            this.checkTimeEnd(
              this.time.substring(0, 2),
              this.time.substring(3, 5),
              this.time.substring(6, 8)
            );
          }, 1000);
        });
      }
    }
  }
};
</script>
