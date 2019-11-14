<template>
  <v-content>
    <div class="bg">
      <BarMoType></BarMoType>
      <v-flex class="space">
        <v-dialog max-width="490" v-model="dialog" data-app>
          <v-card>
            <v-form ref="form">
              <v-container fluid>
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
import BarMoType from "../components/BarMoType";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { host } from "./data";

export default {
  name: "MoTypePage",
  components: {
    BarMoType
  },
  data() {
    return {
      typeOfService: [],
      selectService: [],

      newCust: [],
      dialog: false,

      numRules: [
        v => !!v || "Number of customer is required",
        v => v > 0 || "Number of customer must more than zero"
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
      const totalPrice = 0;
      if (this.$refs.form.validate()) {
        axios
          .post(host + "insertbill", {
            totalPrice: this.newCust.numOfCust * this.selectService.typePrice,
            eatTimeEnd: dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"),
            eatTimeStart: dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"),
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
              sessionStorage.setItem("token", response.data);
              console.log(
                jwt.decode(sessionStorage.getItem("token", response.data))
              );
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