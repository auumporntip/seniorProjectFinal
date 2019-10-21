<template>
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
    <!-- <v-btn v-else flat icon color="white">
      <v-icon></v-icon>
    </v-btn>-->
    <v-toolbar-title class="headline-text white--text">{{this.$store.getters.namePages}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <div v-if="this.$store.getters.namePages === 'Menu'">
      Promotion : {{typeOfService.typeName}}
      <br />
      Bill : {{billId}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Table No: {{tableNumber}}
      {{time}}
    </div>-->
    {{time}}
  </v-toolbar>
</template>

<script>
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
  import FlipCountdown from 'vue2-flip-countdown'

export default {
  name: "Bar",
      components: { FlipCountdown },
  data() {
    return {
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
      console.log(this.$store.getters.namePages);
      if (
        this.$store.getters.namePages === "Order" ||
        this.$store.getters.namePages === "Status" ||
        this.$store.getters.namePages === "Receipt"
      ) {
        this.$router.push("/Momenu");
      } else if (this.$store.getters.namePages === "Menu") {
        this.$router.push("/MoType");
      }
    }
  },
  created() {
    if (this.$store.getters.namePages != "TypeOfService") {
      axios
        .get(
          "http://localhost:3000/api/getbillbybillid/" +
            sessionStorage.getItem("billId")
        )
        .then(response => {
          this.bill = response.data;
          var date = new Date()
          var dayjs1 = dayjs(date)
          setInterval(() => {
            var date2 = new Date()
            var dayjs2 = dayjs(date2)
            // console.log(date, date2)
            var time = dayjs2.diff(dayjs1)
            // console.log(time)
            this.time = dayjs(time).format("HH:mm:ss")
          }, 1000);
        });
    }
    this.billId = sessionStorage.getItem("billId");
    this.tableNumber = sessionStorage.getItem("tableNumber");
    this.typeOfService = JSON.parse(sessionStorage.getItem("typeOfService"));
  }
};
</script>
