<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <v-layout class="space">
        <v-flex xs4>
          <p class="subheading">Bill : {{this.billId}}</p>
        </v-flex>
        <v-flex xs8>
          <p class="subheading">Table : {{this.tableNo}}</p>
        </v-flex>
      </v-layout>
      <v-card class="mx-auto" max-width="344" outlined>
        <v-card-text>
          <v-radio-group v-model="radios" :disabled="disabled" :mandatory="false">
            <v-layout align-center>
              <v-radio
                label="Call Employee to your table"
                hide-details
                class="shrink mr-2"
                value="1"
              ></v-radio>
            </v-layout>
            <v-layout align-center>
              <v-radio hide-details class="shrink mr-2" value="2"></v-radio>
              <v-text-field :disabled="radios !='2'" label="Others" id="/" v-model="others"></v-text-field>
            </v-layout>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </div>
    <v-btn @click="done" class="white--text" color="#cd9575" block id="spaceNext">DONE</v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure to send message</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="green darken-1" text @click="confirmDialog">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <NavBar></NavBar>
  </v-content>
</template>
<script >
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "MoCallEmp",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      dialog: false,
      billId: "",
      tableNo: "",
      includeFiles: true,
      enabled: false,
      radios: "",
      others: "",
      message: ""
    };
  },
  methods: {
    done() {
      if (this.radios === "1") {
        this.message = "Please go to customer table ";
        this.dialog = true;
      } else if (this.radios === "2") {
        if (this.others != "") {
          this.message = this.others;
          this.dialog = true;
        } else {
          this.$dialog.alert({
            title: "Error",
            message: "Please input message for send to employee",
            type: "is-warning"
          });
        }
      } else {
        this.$dialog.alert({
          title: "Error",
          message: "Please input message for send to employee",
          type: "is-warning"
        });
      }
    },
    confirmDialog() {
      axios.post("http://localhost:3000/api/insertnotification", {
        notiMessage: this.message,
        restaurantId: 1,
        billId: this.billId
      }).then(response=>{
        this.$router.push('Momenu')
      })
    },
    closeDialog() {
      this.dialog = false;
      this.radios = "";
      this.others = "";
      this.message = "";
    }
  },
  created() {
    this.billId = sessionStorage.getItem("billId");
    this.tableNo = sessionStorage.getItem("tableNumber");
    this.$store.commit("setNamePages", "CallEmployee");
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
.text {
  padding-top: 3%;
}
</style>