<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      
        <v-card-text>
          <v-radio-group v-model="radios" :disabled="false" :mandatory="false">
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
              <v-text-field
                :disabled="radios != '2'"
                label="Others"
                id="/"
                v-model="others"
              ></v-text-field>
            </v-layout>
          </v-radio-group>
        </v-card-text>

    </div>
    <v-btn @click="done" color="#B7CDC2" block id="spaceNext">CALL EMPLOYEE</v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline"
            >Are you sure to send message</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#7d7a73" flat @click="dialog = false">NO</v-btn>
            <v-btn color="#305378" flat @click="confirmDialog">YES</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
  name: "MoCallEmp",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      dialog: false,
      token: "",
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
          Swal.fire({
            title: "Please input message for send to employee",
            text: "",
            type: "warning",
            confirmButtonColor: "#cd9575"
          });
        }
      } else {
        Swal.fire({
          title: "Please select problem",
          text: "",
          type: "warning",
          confirmButtonColor: "#cd9575"
        });
      }
    },
    confirmDialog() {
      axios
        .post(host + "insertnotification", {
          notiMessage: this.message,
          restaurantId: 1,
          billId: this.billId
        })
        .then(response => {
          this.$router.push("Momenu");
        });
    },
    closeDialog() {
      this.dialog = false;
      this.radios = "";
      this.others = "";
      this.message = "";
    }
  },
  created() {
    this.$store.commit("setNamePages", "CallEmployee");
    this.token = jwt.decode(localStorage.getItem("token"));
    this.billId = this.token.billId;
    this.tableNo = this.token.tableNumber;
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
.text {
  padding-top: 3%;
}
#spaceNext {
  margin-bottom: 15%;
  margin-left: 2em;
  margin-right: 2em;
  width: 85%;;
  margin-top: -15%;
}
</style>
