<template>
  <v-content>
    <v-toolbar class="tabBar" fixed>
      <Bar></Bar>
      <v-tabs v-model="tab" color="white" fixed-tabs class="tabSlide">
        <v-tabs-slider color="#cd9575"></v-tabs-slider>
        <v-tab v-for="category in category" :key="category.categoryId">{{ category.categoryName }}</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-card color="white" class="cardMenu">
      <v-flex xs12 v-for="(menu) in items" :key="menu.menuId">
        <v-layout>
          <v-flex xs6 class="box">
            <div v-if="menu.menuPathImage!=null">
              <v-img :src="menu.menuPathImage" aspect-ratio="1.8"></v-img>
            </div>
            <div v-else>
              <v-img :src="require('../assets/1.png')" aspect-ratio="1.8"></v-img>
            </div>
          </v-flex>
          <v-flex xs6 class="spaceText">
            <v-content>
              <div class="subheading">{{menu.menuName}}</div>
              <div class="subheading">{{menu.menuPrice}} ฿</div>
              <div class="iconBtn">
                <v-btn v-if="menu.amount>0" @click="menu.amount--" outline small color="black">
                  <v-icon class="body-1">remove</v-icon>
                </v-btn>
                <v-btn v-else outline small disabled color="black">
                  <v-icon class="body-1">remove</v-icon>
                </v-btn>
                {{menu.amount}}
                <v-btn @click="addMenu(menu.menuId)" outline small color="black">
                  <v-icon class="body-1">add</v-icon>
                </v-btn>
              </div>
            </v-content>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-btn @click="next" class="white--text" color="#cd9575" block id="spaceNext">NEXT</v-btn>
    </v-card>
    <navBar></navBar>
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

export default {
  name: "MoMenuPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      typeOfService: [],
      item: [],
      tab: 0,
      foodMenu: [],
      category: null,
      order: [],
      token: ""
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
        sessionStorage.setItem("orders", JSON.stringify(this.order));
        sessionStorage.setItem("foodMenu", JSON.stringify(this.foodMenu));
        this.$router.push("/Moorder");
      } else {
        this.$dialog.alert({
          title: "Error",
          message: "Please add some menu at lease one",
          type: "is-warning"
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
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/MoLanding");
    }
    this.$store.commit("setNamePages", "Menu");
    this.token = jwt.decode(sessionStorage.getItem("token"));
    this.typeOfService = this.token.typeOfService;

    if (JSON.parse(sessionStorage.getItem("foodMenu")) != null) {
      this.foodMenu = JSON.parse(sessionStorage.getItem("foodMenu"));
    } else {
      if (this.typeOfService.typePrice != null) {
        axios
          .get(
            "http://localhost:3000/api/getmenubytypeofserviceid/" +
              this.typeOfService.typeId
          )
          .then(response => {
            this.foodMenu = response.data;
            this.foodMenu.forEach(element => {
              element.amount = 0;
            });
          });
      } else {
        axios
          .get("http://localhost:3000/api/getallmenu/" + 1)
          .then(response => {
            this.foodMenu = response.data;
            this.foodMenu.forEach(element => {
              element.amount = 0;
            });
          });
      }
    }
    axios.get("http://localhost:3000/api/getcategory/" + 1).then(response => {
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
  margin: 0%;
  padding-left: 10%;
  padding-top: 6%;
}
.v-layout {
  text-align: left;
}
.v-btn {
  min-width: 0;
}
.v-card {
  margin: 5%;
}
.iconBtn {
  margin: 0%;
  padding-left: 5%;
}
#spaceNext {
  margin-bottom: 20%;
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
  padding-top: 40%;
  margin: 0px;
  padding-bottom: 5%;
  overscroll-behavior-y: inherit;
}
.spaceText {
  margin-right: 5%;
}
.tabBar {
  padding-top: 18%;
  background-color: white;
}
</style>