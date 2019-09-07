<template>
  <v-content>
    <BarMoType></BarMoType>
    <v-flex class="space">
      <v-dialog max-width="490" v-model="openDialog">
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
      <v-img :src="image_src1"></v-img>
      <v-btn block color="#cd9575" class="white--text" @click="openDialog=true">Buffet 1199.-</v-btn>
      <v-img :src="image_src2" class="white--text"></v-img>
      <v-btn block color="#cd9575" class="white--text" @click="openDialog=true">Buffet 799.-</v-btn>
      <v-img :src="image_src3"></v-img>
      <v-btn block color="#cd9575" class="white--text" @click="openDialog=true">Buffet 499.-</v-btn>
      <v-img :src="image_src4"></v-img>
      <v-btn block color="#cd9575" class="white--text" @click="openDialog=true">A-La-Carte</v-btn>
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
  data() {
    return {
      newCust: [],
      openDialog: false,
      numRules: [v => !!v || "Number of Customers is required"],
      tableRules: [v => !!v || "Table number is required"],
      image_src1: require("../assets/prestige.png"),
      image_src2: require("../assets/prestige.png"),
      image_src3: require("../assets/prestige.png"),
      image_src4: require("../assets/prestige.png")
    };
  },
  methods: {
    clickBack() {
      this.newCust = [];
      this.openDialog = false;
      this.$refs.form.resetValidation();
    },
    clickNext() {
      if (this.$refs.form.validate()) {
        console.log(this.newCust);
        this.newCust = [];
        this.openDialog = false;
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>

<style scoped>
.space {
  margin: 15px;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>