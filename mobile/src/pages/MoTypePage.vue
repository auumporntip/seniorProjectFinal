<template>
  <v-content>
    <div class="bg">
      <Bar></Bar>
      <v-flex class="space">
        <v-dialog max-width="490" v-model="dialog" data-app>
          <v-card>
            <v-form ref="form">
              <v-container grid-list-md>
                <v-text-field
                  label="Number of Customers"
                  prepend-icon="people"
                  v-model="newCust.numOfCust"
                  :rules="numRules"
                ></v-text-field>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#7d7a73" flat @click="clickBack">BACK</v-btn>
                <v-btn color="#305378" flat @click="clickNext">NEXT</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <div v-for="service in typeOfService" :key="service.typeId">
          <v-img v-if="service.typePathImage != null" :src="service.typePathImage"></v-img>
          <v-img v-else :src="require('../assets/nophoto.png')"></v-img>
          <v-btn
            block
            color="#B7CDC2"
            @click="openDialog(service)"
          >{{service.typeName}} {{service.typePrice}}</v-btn>
        </div>
      </v-flex>
    </div>
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { host } from "./data";

export default {
  name: "MoTypePage",
  components: {
    Bar
  },
  data() {
    return {
      typeOfService: [],
      selectService: [],

      newCust: [],
      dialog: false,

      numRules: [
        v => !!v || "Number of customer is required",
        v => !isNaN(this.newCust.numOfCust) || "Please input number",
        v => v > 0 || "Number of customer must more than zero",
        v => v < 30 || "Number of customer must less than 30"
      ],
      tableRules: [v => !!v || "Table number is required"]
    };
  },
  methods: {
    openDialog(service) {
      this.dialog = true;
      this.selectService = service;
    },
    clickBack() {
      this.newCust = [];
      this.dialog = false;
      this.$refs.form.resetValidation();
    },
    clickNext() {
      localStorage.setItem('first',0)
      const totalPrice = 0;
      var timeStart = dayjs(Date()).format("HH:mm:ss");
      var timeEnd = 0;

      var hourStart = parseInt(timeStart.substring(0, 2));
      var minuteStart = parseInt(timeStart.substring(3, 5));
      var secondStart = parseInt(timeStart.substring(6, 8));
      var hourTypeOfService = parseInt(
        this.selectService.typeTime.substring(
          0,
          this.selectService.typeTime.indexOf(".")
        )
      );
      var minuteTypeOfService = parseInt(
        this.selectService.typeTime.substring(
          this.selectService.typeTime.indexOf(".") + 1
        )
      );
      
      var hourEnd = 0
      var minuteEnd = 0
      if (minuteStart+minuteTypeOfService > 60) {
        hourEnd = hourStart+hourTypeOfService+1
        minuteEnd = minuteStart+minuteTypeOfService-60
        if (hourEnd>=24) {
          hourEnd = hourEnd-24
          if (hourEnd>9 && minuteEnd>9) {
            timeEnd = hourEnd+':'+minuteEnd+':'+secondStart
          }else if (hourEnd>9 && minuteEnd<9) {
            timeEnd = hourEnd+':0'+minuteEnd+':'+secondStart
          }else if (hourEnd<9 && minuteEnd>9) {
            timeEnd = '0'+hourEnd+':'+minuteEnd+':'+secondStart
          }{
            timeEnd = '0'+hourEnd+':0'+minuteEnd+':'+secondStart
          }
        }else{
          if (hourEnd>9 && minuteEnd>9) {
            timeEnd = hourEnd+':'+minuteEnd+':'+secondStart
          }else if (hourEnd>9 && minuteEnd<9) {
            timeEnd = hourEnd+':0'+minuteEnd+':'+secondStart
          }else if (hourEnd<9 && minuteEnd>9) {
            timeEnd = '0'+hourEnd+':'+minuteEnd+':'+secondStart
          }{
            timeEnd = '0'+hourEnd+':0'+minuteEnd+':'+secondStart
          }
        }
      }else if (minuteStart+minuteTypeOfService < 60) {
        hourEnd = hourStart+hourTypeOfService
        minuteEnd = minuteStart+minuteTypeOfService
        if (hourEnd>=24) {
          hourEnd = hourEnd-24
          if (hourEnd>9 && minuteEnd>9) {
            timeEnd = hourEnd+':'+minuteEnd+':'+secondStart
          }else if (hourEnd>9 && minuteEnd<9) {
            timeEnd = hourEnd+':0'+minuteEnd+':'+secondStart
          }else if (hourEnd<9 && minuteEnd>9) {
            timeEnd = '0'+hourEnd+':'+minuteEnd+':'+secondStart
          }else{
            timeEnd = '0'+hourEnd+':0'+minuteEnd+':'+secondStart
          }
        }else{
          if (hourEnd>9 && minuteEnd>9) {
            timeEnd = hourEnd+':'+minuteEnd+':'+secondStart
          }else if (hourEnd>9 && minuteEnd<9) {
            timeEnd = hourEnd+':0'+minuteEnd+':'+secondStart
          }else if (hourEnd<9 && minuteEnd>9) {
            timeEnd = '0'+hourEnd+':'+minuteEnd+':'+secondStart
          }else{
            timeEnd = '0'+hourEnd+':0'+minuteEnd+':'+secondStart
          }
        }
      }
      
      if (this.$refs.form.validate()) {
        axios
          .post(host + "insertbill", {
            totalPrice: this.newCust.numOfCust * this.selectService.typePrice,
            eatTimeEnd: timeEnd,
            eatTimeStart: timeStart,
            numOfCust: this.newCust.numOfCust,
            typeId: this.selectService.typeId,
            tableNumber: this.$route.params.tableNumber,
            billStatus: "0",
            created_at: dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"),
            update_at: dayjs(Date()).format("YYYY-MM-DD HH:mm:ss")
          })
          .then(response => {
            var token = {
              billId: response.data[0],
              tableNumber: this.$route.params.tableNumber,
              typeOfService: this.selectService
            };
            axios.post(host + "signjwt", token).then(response => {
              localStorage.setItem("token", response.data);
              this.dialog = false;
              this.$refs.form.resetValidation();
              this.$router.push("/Momenu");
            });
          });
      }
    }
  },
  created() {
    axios
      .post(host + "checkTable/" + this.$route.params.tableNumber)
      .then(response => {
        if (response.data.tableAvailable === false) {
          this.$router.push("/MoLanding");
        }
      });

    this.$store.commit("setNamePages", "TypeOfService");
    axios.get(host + "gettypeofservice/" + 1).then(response => {
      this.typeOfService = response.data;
    });
  }
};
</script>

<style scoped>
.space {
  margin: 15px;
  padding-top: 4.4em;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
.bg {
  background-color: #f7f6ee;
}
</style>