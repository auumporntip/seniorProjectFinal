<template>
  <v-toolbar dark color="#cd9575">
    <v-btn @click="goBack" flat icon color="white">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title class="headline-text white--text">{{this.$store.getters.namePages}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      {{promotion}}<br/>{{tableNo}}
    </div>
  </v-toolbar>
</template>

<script>
import { store } from "../store/store";
export default {
  name: "Bar",
  data() {
    return {
      promotion: "Buffet 1199.-",
      tableNo: "Table No: 001"
    };
  },
  methods: {
    goBack(){
      this.$router.push("/Momenu");
    }
  },
  created() {
  },
};
</script>
