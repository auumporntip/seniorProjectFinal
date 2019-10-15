<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <v-layout class="space">
        <v-flex xs4>
          <p class="subheading">Bill:</p>
        </v-flex>
        <v-flex xs8>
          <p class="subheading">Table:</p>
        </v-flex>
      </v-layout>
      <v-card class="mx-auto" max-width="344" outlined>
        <v-card-text>
          <v-layout align-center>
            <v-checkbox label="Call Employee to your table" hide-details class="shrink mr-2"></v-checkbox>
          </v-layout>
          <v-layout align-center>
            <v-checkbox label="Check Bill" hide-details class="shrink mr-2"></v-checkbox>
          </v-layout>
          <v-layout align-center>
            <v-checkbox v-model="enabled" hide-details class="shrink mr-2"></v-checkbox>
            <v-text-field :disabled="!enabled" label="Others" id="/"></v-text-field>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
    <v-btn @click="done" class="white--text" color="#cd9575" block id="spaceNext">DONE</v-btn>
    <NavBar></NavBar>
  </v-content>
</template>
<script >
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import { store } from "../store/store";
import axios from "axios";
import dayjs from "dayjs";

export default {
//   data: () => ({
//     includeFiles: true,
//     enabled: false
//   }),
  name: "MoCallEmp",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      bill: "",
      includeFiles: true,
      enabled: false
    };
  },
  methods: {},
  created() {
    this.$store.commit("setNamePages", "CallEmployee");
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
  padding-top: 20%;
}
.text {
  padding-top: 3%;
}
</style>