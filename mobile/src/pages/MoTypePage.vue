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
              <v-text-field label="Table number" v-model="newCust.tableNumber" :rules="tableRules"></v-text-field>
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
      console.log(dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"));
      
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3000/api/insertbill", {
            totalPrice: 0,
            eatTimeEnd: dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"),
            eatTimeStart: dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"),
            numOfCust: this.newCust.numOfCust,
            typeId: this.selectService.typeId,
            tableNumber: this.newCust.tableNumber,
            created_at:dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"),
            update_at:dayjs(Date()).format("YYYY-MM-DD HH:mm:ss")
          })
          .then(response => {
            sessionStorage.setItem("timestart", Date());
            sessionStorage.setItem("billId", response.data);
            sessionStorage.setItem("typeOfService", JSON.stringify(this.selectService));
            sessionStorage.setItem("tableNumber", this.newCust.tableNumber);
            this.dialog = false;
            this.$refs.form.resetValidation();
            this.$router.push("/Momenu");
          });
      }
    }
  },
  created() {
    console.log(process.env.localhost)
    this.$store.commit("setNamePages", "TypeOfService");
    axios
      .get("http://localhost:3000/api/gettypeofservice/" + 1)
      .then(response => {
        this.typeOfService = response.data;
        console.log(this.typeOfService)
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