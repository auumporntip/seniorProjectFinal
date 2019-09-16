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
      console.log( this.$store.getters.namePages)
      if(this.$store.getters.namePages === 'Order' || this.$store.getters.namePages === 'Status'  || this.$store.getters.namePages === 'Receipt' ){
        this.$router.push("/Momenu");
      }else if (this.$store.getters.namePages === 'Menu') {
        this.$router.push("/MoType");
      }
    }
  },
  created() {
  },
};
</script>
