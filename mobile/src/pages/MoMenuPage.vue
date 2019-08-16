<template>
  <v-content>
    <BarMoMenu></BarMoMenu>
    <v-tabs v-model="tab" color="white" align-with-title>
      <v-tabs-slider color="#cd9575"></v-tabs-slider>
      <v-tab v-for="category in category" :key="category.categoryId">{{ category.categoryName }}</v-tab>
    </v-tabs>

    <v-card color="white">
      <v-flex xs12 v-for="menu in items" :key="menu.menuId">
        <v-layout>
          <v-flex xs6>
            <v-img :src="menu.menuPathImage" class="spacePic" contain></v-img>
          </v-flex>
          <v-flex xs6>
            <v-content>
              <div class="title">{{menu.menuName}}</div>
              <div class="subheading">{{menu.menuPrice}}</div>
              <div class="iconBtn">
                <v-btn outline small color="black">
                  <v-icon class="body-1">remove</v-icon>
                </v-btn>

                <v-text>{{amount}}</v-text>

                <v-btn outline small color="black">
                  <v-icon class="body-1">add</v-icon>
                </v-btn>
              </div>
            </v-content>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-card>
    <v-btn href="/MoOrder" class="white--text" color="#cd9575" block fixed>NEXT</v-btn>
    <navBarMoMenu></navBarMoMenu>
  </v-content>
</template>

<script>
import BarMoMenu from "../components/BarMoMenu";
import NavBarMoMenu from "../components/NavBarMoMenu";
import axios from "axios";

export default {
  name: "MoMenuPage",
  components: {
    BarMoMenu,
    NavBarMoMenu
  },
  data() {
    return {
      tab: 0,
      menu: {},
      category: {},
      image_src: require("../assets/wagyu.jpg"),
      nameMenu: "Wagyu",
      price: "฿ 49.00",
      amount: "2",
      selectCategory: ""
    };
  },
  methods: {},
  computed: {
    items() {
      return this.menu.filter(
        items => items.categoryId === this.category[this.tab].categoryId
      );
    }
  },
  created() {
    console.log(this.tab);
    axios.get("http://localhost:3000/api/getallmenu/" + 1).then(response => {
      this.menu = response.data;
    });
    axios.get("http://localhost:3000/api/getcategory/" + 1).then(response => {
      this.category = response.data;
      console.log(this.category);
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
  margin-left: 5%;
  padding-top: 15%;
  height: 100%;
}
.v-layout {
  text-align: left;
}
.v-btn {
  min-width: 0;
}
.v-text-field {
  min-width: 0;
}
.v-card {
  margin: 5%;
}
.v-text {
  text-align: center;
}
.iconBtn {
  margin: 0%;
  padding-left: 5%;
}
#spaceNext{
  margin-bottom: 3%
}
</style>