<template>
  <v-content>
    <BarMoType></BarMoType>
    <v-flex class="space">
    <v-img :src="image_src1"></v-img>
    <v-btn block color="#cd9575" class="white--text">Buffet 1199.-</v-btn>
    <v-img :src="image_src2" class="white--text"></v-img>
    <v-btn block color="#cd9575" class="white--text">Buffet 799.-</v-btn>
    <v-img :src="image_src3"></v-img>
    <v-btn block color="#cd9575" class="white--text">Buffet 499.-</v-btn>
    <v-img :src="image_src4"></v-img>
    <v-btn block color="#cd9575" class="white--text">A-La-Carte</v-btn>
    </v-flex>
  </v-content>
</template>

<script>
import BarMoType from "../components/BarMoType";
import { store } from "../store/store";
export default {
  name: "MoTypePage",
  components: {
    BarMoType
  },
  data () {
        return {
            image_src1: require("../assets/prestige.png"),
            image_src2: require("../assets/prestige.png"),
            image_src3: require("../assets/prestige.png"),
            image_src4: require("../assets/prestige.png")
            
        }
    }
};
</script>

<style scoped>
.space{
  margin: 15px;
}
</style>