<template>
  <v-content>
    <BarIcon></BarIcon>
    <b-table :data="data" mobile-card :columns="columns"></b-table>
 
    <v-footer height="auto">
      <v-card class="flex" flat tile color="#cd9575">
        <v-card-title>
          <strong class="title white--text">Total 5 orders</strong>
          <v-spacer></v-spacer>
          <v-btn color="white">Confirm</v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-content>
</template>

<script>
import Bar from "../components/bar";
import ButtonNext from "../components/buttonNext";
import BarIcon from "../components/BarIcon";
export default {
  name: "MoOrderPage",
  components: {
    Bar,
    ButtonNext,
    BarIcon
  },
  data() {
    return {
      data: [
        { menu: "Bacon", price: 50.0, quan: 5 },
        { menu: "Bacon", price: 50.0, quan: 5 },
        { menu: "Bacon", price: 50.0, quan: 5 },
        { menu: "Bacon", price: 50.0, quan: 5 },
        { menu: "Bacon", price: 50.0, quan: 5 }
      ],

      columns: [
        {
          field: "menu",
          label: "Menu"
        },
        {
          field: "price",
          label: "Price",
          width: "1000",
          numeric: true
        },
        {
          field: "quan",
          label: "Quantity",
          width: "10",
          numeric: true
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>


