<template>
  <v-content>
    <Bar></Bar>
    <v-tabs v-model="tab" color="white" align-with-title>
      <v-tabs-slider color="#cd9575"></v-tabs-slider>
      <v-tab v-for="category in category" :key="category.categoryId">{{ category.categoryName }}</v-tab>
    </v-tabs>
    
    <v-card color="white">
      <v-flex xs12 v-for="(menu) in items" :key="menu.menuId">
        <v-layout>
          <v-flex xs6 class="box">
            <div v-if="menu.menuPathImage!=null">
              <img :src="menu.menuPathImage" class="spacePic" contain />
              <img />
            </div>
            <div v-else>
              <img src="../assets/1.png" class="spacePic" contain />
              <img />
            </div>
          </v-flex>
          <v-flex xs6>
            <v-content>
              <div class="title">{{menu.menuName}}</div>
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

export default {
  name: "MoMenuPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      item: [],
      tab: 0,
      foodMenu: [],
      category: null,
      order: []
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
      localStorage.setItem(
        "orders",
        JSON.stringify(this.foodMenu.filter(food => food.amount > 0))
      );
      localStorage.setItem("foodMenu", JSON.stringify(this.foodMenu));
      console.log(JSON.parse(localStorage.getItem("orders")));
      this.$router.push("/Moorder");
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
    this.$store.commit("setNamePages", "Menu");
    console.log(JSON.parse(localStorage.getItem("foodMenu")))
    if (JSON.parse(localStorage.getItem("foodMenu")) != null) {
      this.foodMenu = JSON.parse(localStorage.getItem("foodMenu"));
    } else {
      axios.get("http://localhost:3000/api/getallmenu/" + 1).then(response => {
        this.foodMenu = response.data;
        this.foodMenu.forEach(element => {
          element.amount = 0;
        });
      });
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
.spacePic {
  /* margin-left: 5%;
  padding-top: 15%; */
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 80px;
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
  margin-bottom: 3%;
}
.box {
  height: 120px;
}
</style>