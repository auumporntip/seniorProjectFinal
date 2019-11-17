<template>
  <v-content>
    <v-toolbar class="tabBar" fixed>
      <Bar></Bar>
      <v-tabs v-model="tab" color="#84A295" fixed-tabs>
        <v-tabs-slider color="#B7CDC2"></v-tabs-slider>
        <v-tab
          class="white--text"
          v-for="category in category"
          :key="category.categoryId"
          >{{ category.categoryName }}</v-tab
        >
      </v-tabs>
    </v-toolbar>
    <!-- <v-card color="white" class="cardMenu"> -->
    <div class="cardMenu">
      <v-flex xs12 v-for="menu in items" :key="menu.menuId">
        <v-layout>
          <v-flex xs6 class="box">
            <div v-if="menu.menuPathImage != null">
              <v-img :src="menu.menuPathImage" aspect-ratio="1.8"></v-img>
            </div>
            <div v-else>
              <v-img
                :src="require('../assets/1.png')"
                aspect-ratio="1.8"
              ></v-img>
            </div>
          </v-flex>
          <v-flex xs6 class="spaceText">
            <v-content>
              <div class="subheading">{{ menu.menuName }}</div>
              <div class="subheading">{{ menu.menuPrice }} ฿</div>
              <div class="iconBtn">
                <v-btn
                  v-if="menu.amount > 0"
                  @click="menu.amount--"
                  outline
                  small
                  color="black"
                >
                  <v-icon class="body-1">remove</v-icon>
                </v-btn>
                <v-btn v-else outline small disabled color="black">
                  <v-icon class="body-1">remove</v-icon>
                </v-btn>
                {{ menu.amount }}
                <v-btn
                  @click="addMenu(menu.menuId)"
                  outline
                  small
                  color="black"
                >
                  <v-icon class="body-1">add</v-icon>
                </v-btn>
              </div>
            </v-content>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-btn @click="next" color="#B7CDC2" id="spaceNext"
        >VIEW ORDER DETAIL</v-btn
      >
    </div>
    <!-- </v-card> -->
    <!-- <v-dialog v-model="errorDialog" persistent data-app>
      <v-card max-width="290" style="margin:0%;">
        <v-icon
          color="red lighten-1"
          style="font-size:70px; margin-left:1.55em; margin-top: 0.3em;"
        >error</v-icon>
        <v-card-text class="nameDialog">Please add some menu at least one</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#305378" flat @click="errorDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <navBar></navBar>

    <!-- detail -->
    <v-dialog max-width="290" v-model="detailDialog" style="margin:0%;">
      <v-card style="border-radius: 5%;">
        <v-card-title class="nameDialog">Bill Detail</v-card-title>
        <v-container grid-list-md style="padding-top:0%; padding-left:2%;">
          <v-card-text
            v-if="typeOfService.service == 'alacarte'"
            style="font-size:1.3em;"
          >
            <span>Course: {{ typeOfService.typeName }}</span
            ><br />
            <span>Customer: {{ bill.numOfCust }}</span
            ><br />
            <span>Time Start: {{ bill.eatTimeStart }}</span
            ><br />
            <span>Time End: - </span><br />
          </v-card-text>
          <v-card-text v-else style="font-size:1.3em;">
            <span>Course: {{ typeOfService.typeName }}</span
            ><br />
            <span>Customer: {{ bill.numOfCust }}</span
            ><br />
            <span>Time Start: {{ bill.eatTimeStart }}</span
            ><br />
            <span>Time End: {{ bill.eatTimeEnd }}</span
            ><br />
            <span>
              Duration:
              {{
                typeOfService.typeTime.substring(
                  0,
                  this.typeOfService.typeTime.indexOf(".")
                )
              }}
              hour
              {{
                this.typeOfService.typeTime.substring(
                  this.typeOfService.typeTime.indexOf(".") + 1
                )
              }}
              minute </span
            ><br />
          </v-card-text>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#305378"
            flat
            @click="detailDialog = false"
            style="margin-right:5%; margin-bottom:3%;"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import Vue from "vue";
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import axios from "axios";
import { store } from "../store/store";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { host } from "./data";

export default {
  name: "MoMenuPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      bill: [],
      typeOfService: [],
      item: [],
      tab: 0,
      foodMenu: [],
      category: null,
      order: [],
      token: "",
      detailDialog: false,
      errorDialog: false
    };
  },
  methods: {
    addMenu(menuId) {
      //หาindex ของmenu ในArray
      const index = this.foodMenu.findIndex(
        foodMenu => foodMenu.menuId === menuId
      );

      const menu = {
        ...this.foodMenu[index],
        amount: this.foodMenu[index].amount + 1
      };
      this.$set(this.foodMenu, index, menu);
    },
    next() {
      this.order = this.foodMenu.filter(food => food.amount > 0);
      if (this.order.length != 0) {
        localStorage.setItem("orders", JSON.stringify(this.order));
        localStorage.setItem("foodMenu", JSON.stringify(this.foodMenu));
        this.$router.push("/Moorder");
      } else {
        Swal.fire({
          title: "Please add some menu at least one order",
          type: "warning",
          confirmButtonColor: "#cd9575"
        });
      }
    }
  },
  computed: {
    items() {
      if (this.category != null) {
        return this.foodMenu.filter(item => {
          return item.categoryId === this.category[this.tab].categoryId;
        });
      }
    }
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/MoLanding");
    }
    this.$store.commit("setNamePages", "Menu");
    this.token = jwt.decode(localStorage.getItem("token"));
    this.typeOfService = this.token.typeOfService;
    if (localStorage.getItem("first") === "0") {
      this.detailDialog = true;
      localStorage.removeItem("first");
    }
    axios.get(host + "getbillbybillId/" + this.token.billId).then(response => {
      this.bill = response.data[0];
    });

    if (JSON.parse(localStorage.getItem("foodMenu")) != null) {
      this.foodMenu = JSON.parse(localStorage.getItem("foodMenu"));
    } else {
      if (this.typeOfService.typePrice != null) {
        axios
          .get(host + "getmenubytypeofserviceid/" + this.typeOfService.typeId)
          .then(response => {
            this.foodMenu = response.data;
            this.foodMenu.forEach(element => {
              element.amount = 0;
            });
          });
      } else {
        axios.get(host + "getallmenu/" + 1).then(response => {
          this.foodMenu = response.data;
          this.foodMenu.forEach(element => {
            element.amount = 0;
          });
        });
      }
    }
    axios.get(host + "getcategory/" + 1).then(response => {
      this.category = response.data;
    });
  }
};
</script>

<style scoped>
.title {
  margin: 0%;
  padding-left: 10%;
  padding-top: 15%;
}
.subheading {
  padding-left: 10%;
  padding-top: 6%;
}
.v-layout {
  text-align: left;
}
.v-btn {
  min-width: 0;
}
.iconBtn {
  margin: 0%;
  padding-left: 5%;
}
#spaceNext {
  margin-bottom: 15%;
  margin-left: 2em;
  margin-right: 2em;
  width: 85%;
}
.box {
  height: 120px;
  margin-left: 5%;
}
.header {
  /* position: fixed; */
  z-index: 10;
  overflow: hidden;
}
.cardMenu {
  padding-top: 10em;
  margin: 0px;
  padding-bottom: 5%;
  overscroll-behavior-y: inherit;
}
.spaceText {
  margin-right: 5%;
}
.tabBar {
  padding-top: 4em;
  background-color: #84a295;
  padding-left: 0%;
  padding-right: 0%;
}
.nameDialog {
  margin-left: 2%;
  font-size: 1.8em;
  padding-top: 4%;
  padding-bottom: 0%;
}
.styleDialog {
  margin: 0px;
}
</style>
