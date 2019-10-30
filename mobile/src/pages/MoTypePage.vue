<template>
  <v-content>
    <Bar></Bar>
    <v-flex class="space">
      <v-dialog max-width="490" v-model="dialog">
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
              <v-btn color="green darken-1" text @click="clickBack">Back</v-btn>
              <v-btn color="green darken-1" text @click="clickNext">Next</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <div v-for="service in typeOfService" :key="service.typeId">
        <v-img :src="service.typePathImage"></v-img>
        <v-btn
          block
          color="#cd9575"
          class="white--text"
          @click="openDialog(service)"
        >{{service.typeName}} {{service.typePrice}}</v-btn>
      </div>
    </v-flex>
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";

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

      numRules: [v => !!v || "Number of Customers is required"],
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
          .post("http://localhost:3000/api/insertbill", {
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
            axios
              .post("http://localhost:3000/api/signjwt", token)
              .then(response => {
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
      .post(
        "http://localhost:3000/api/checkTable/" + this.$route.params.tableNumber
      )
      .then(response => {
        if (response.data.tableAvailable === false) {
          this.$router.push("/MoLanding");
        }
      });

    this.$store.commit("setNamePages", "TypeOfService");
    axios
      .get("http://localhost:3000/api/gettypeofservice/" + 1)
      .then(response => {
        this.typeOfService = response.data;
      });
  }
};
</script>

<style scoped>
.space {
  margin: 15px;
  padding-top: 20%;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>