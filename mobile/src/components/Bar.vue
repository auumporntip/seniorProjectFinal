<template>
   <div> 
     <v-toolbar dark color="#cd9575" fixed>
    <p v-if="this.$store.getters.namePages === 'Menu'" flat icon color="white">
      <v-icon></v-icon>
    </p>
    <v-img
      v-else-if=" this.$store.getters.namePages ==='TypeOfService'"
      :src="image_src"
      max-width="40px"
    ></v-img>
    <v-btn v-else @click="goBack" flat icon color="white">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title class="headline-text white--text">{{this.$store.getters.namePages}}</v-toolbar-title>
    <v-spacer></v-spacer>
    {{time}}
  </v-toolbar>
  </div> 
</template>


<script>
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import momentT from "moment-timezone";
import Swal from 'sweetalert2'

export default {
  name: "Bar",
  data() {
    return {
      dialog: false,
      warning: false,
      image_src: require("../assets/1.png"),
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
        this.$store.getters.namePages === "Receipt"
      ) {
        this.$router.push("/Momenu");
      } else if (this.$store.getters.namePages === "Menu") {
        this.$router.push("/MoType");
      }
    },
    checkTimeEnd(frontTime,backTime,second) {
      var front = this.typeOfService.typeTime.substring(
        0,
        this.typeOfService.typeTime.indexOf(".")
      );
      var back = this.typeOfService.typeTime.substring(
        this.typeOfService.typeTime.indexOf(".") + 1
      );
      
      
      var front1 = 0
      var back1 = 0
      
      if(parseInt(back)<15){
        front1 = parseInt(front)-1
        back1 = parseInt(back) +60 -15
      }else{
        back1 = parseInt(back)-15
      }
      var hour = 0
      var minute = 0

      if(front1<10){
        hour = '0'+front1
      }else{
        hour = front1
      }if(back1<10){
        minute = '0'+back1
      }
      if (frontTime === hour && backTime === minute && second === '00') {
        Swal.fire({
            title: "Warning",
            text: "Time end in 15 minute",
            type: "warning",
            confirmButtonColor: "#cd9575",
            confirmButtonText: "Close"
        });
        // this.$dialog.alert({
        //   title: "Warning",
        //   message: "Time end in 15 minute",
        //   type: "is-warning"
        // });
         
        // <v-card>
        //  <v-card-title>
        //   <span class="headline">Warning</span>
        // </v-card-title>
        //   <v-card-text>Time end in 15 minute</v-card-text>
        // <v-card-actions>
        //   <v-spacer></v-spacer>
        //   <v-btn color="green darken-1" text >close</v-btn>
        // </v-card-actions>
        //       </v-card>

        // <v-alert border="right" colored-border type="error" elevation="2">
        // Warning !!!! 
        // Time end in 15 minute
        // </v-alert>
      }
    }
  },
  created() {
    this.billId = sessionStorage.getItem("billId");
    this.tableNumber = sessionStorage.getItem("tableNumber");
    this.typeOfService = JSON.parse(sessionStorage.getItem("typeOfService"));
    
    if (
      this.$store.getters.namePages != "TypeOfService" &&
      this.typeOfService.service === "buffet"
    ) {
      var front = this.typeOfService.typeTime.substring(
        0,
        this.typeOfService.typeTime.indexOf(".")
      );
      var back = this.typeOfService.typeTime.substring(
        this.typeOfService.typeTime.indexOf(".") + 1)
      axios
        .get(
          "http://localhost:3000/api/getbillbybillid/" +
            sessionStorage.getItem("billId")
        )
        .then(response => {
          this.bill = response.data;
          var date1 = moment(moment(this.bill[0].created_at)._d).unix();
          // this.checkTimeEnd(this.time.substring(0,2),this.time.substring(3,5),this.time.substring(6,8))
          setInterval(() => {
            var date2 = moment(new Date()).unix();
            var date3 = moment.unix(date2 - date1);
            var date4 = momentT(date3._d);
            var time = date4.tz("Asia/Bangkok").format("hh:mm:ss");
            if (time.charAt(0) != "0") {
              var index = parseInt(time.substring(0, 2)) - 7;

              this.time = "0" + index1 + time.substring(2, 8);
            } else {
              var index1 = parseInt(time.charAt(1)) - 7;
              this.time = "0" + index1 + time.substring(2, 8);
            }
            
            this.checkTimeEnd(this.time.substring(0,2),this.time.substring(3,5),this.time.substring(6,8))
          }, 1000);
        });
    }
  }
};
</script>
