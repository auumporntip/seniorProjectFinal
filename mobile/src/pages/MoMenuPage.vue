<template>
  <v-content>
    <BarMoMenu></BarMoMenu>

    <v-tabs v-model="tab" color="white" align-with-title>
      <v-tabs-slider color="#cd9575"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card color="white">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
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

        <v-card color="white">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
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

      </v-tab-item>
      <v-tab-item>
        <v-card color="white">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
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
      </v-tab-item>
      <v-tab-item>
        <v-card color="white">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
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
      </v-tab-item>
    </v-tabs-items>

    <v-btn href="/MoOrder" class="white--text" color="#cd9575" block fixed>NEXT</v-btn>

    <v-footer>
      <navBarMoMenu></navBarMoMenu>
    </v-footer>
  </v-content>
</template>

<script>
import BarMoMenu from "../components/BarMoMenu";
import NavBarMoMenu from "../components/NavBarMoMenu";
export default {
  name: "MoMemuPage",
  components: {
    BarMoMenu,
    NavBarMoMenu
  },
  data() {
    return {
      tab: null,
      items: ["YAKINIKU", "SUSHI", "SASHIMI"],
      image_src: require("../assets/wagyu.jpg"),
      nameMenu: "Wagyu",
      price: "฿ 49.00",
      amount: "2"
    };
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
.iconBtn{
  margin: 0%;
  padding-left: 5%;
}
</style>