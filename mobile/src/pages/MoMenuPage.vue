<template>
  <v-content>
    <v-toolbar dark color="#cd9575">
      <v-toolbar-title class="headline-text white--text">Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-text class="white--text">
          Buffet 1199.-
          <br>
        </v-text>
        <v-text class="white--text">Bill No: 001</v-text>
      </div>
    </v-toolbar>
    <div>
      <b-tabs v-model="activeTab" class="bg">
        <b-tab-item label="YAKINIKU">
          <v-card color="#cd9575">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
         
         <v-card color="#cd9575" class="spaceCard">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
          
          <v-card color="#cd9575" class="spaceCard">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
        </b-tab-item>

        <b-tab-item label="SUSHI">
          <v-card color="#cd9575">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
         
         <v-card color="#cd9575" class="spaceCard">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
          
          <v-card color="#cd9575" class="spaceCard">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
        </b-tab-item>

        <b-tab-item label="SASHIMI">
          <v-card color="#cd9575">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
         
         <v-card color="#cd9575" class="spaceCard">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
          
          <v-card color="#cd9575" class="spaceCard">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>

 <v-card color="#cd9575" class="spaceCard">
          <v-flex xs12>
            <v-layout>
              <v-flex xs6>
                <v-img :src="image_src" height="125px" class="spacePic" contain></v-img>
              </v-flex>
              <v-flex xs6>
                <v-content>
                  <div class="title">{{nameMenu}}</div>
                  <div class="subheading">{{price}}</div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-card>
          
        </b-tab-item>
      </b-tabs>
    </div>

    <footer>
      <ButtonNext></ButtonNext>
    </footer>
  </v-content>
</template>

<script>
import Bar from "../components/bar";
import ButtonNext from "../components/buttonNext";
export default {
  name: "MoMemuPage",
  components: {
    Bar,
    ButtonNext
  },
  data() {
    return {
      activeTab: 0,
      image_src: require("../assets/wagyu.jpg"),
      nameMenu: "Menu: Wagyu",
      price: "Price: 49.00 Baht"
    };
  }
};
</script>

<style scoped>
.space {
  margin: 10px;
}
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
.spacePic{
  margin-left: 5%;
}
.bg{
  background-color: #eaddd4;
}
.spaceCard{
  margin-top: 4%;
}
</style>


