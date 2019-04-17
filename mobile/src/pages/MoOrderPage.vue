<template>
  <v-content>
    <BarMoOrder></BarMoOrder>
    <div class="wrapper">
      <b-table :data="data" mobile-card :columns="columns"></b-table>
      <v-card height="auto" flat>
        <v-card-title>
          <strong class="subheading black--text">Total Prices : 0 Baht</strong>
          <v-spacer></v-spacer>
          <v-btn href="/MoStatus" color="#cd9575" class="white--text">Confirm</v-btn>
        </v-card-title>
      </v-card>
    </div>
    <v-footer>
      <NavBarMoOrder></NavBarMoOrder>
    </v-footer>
  </v-content>
</template>

<script>
import BarMoOrder from "../components/BarMoOrder";
import NavBarMoOrder from "../components/NavBarMoOrder";
export default {
  name: "MoOrderPage",
  components: {
    BarMoOrder,
    NavBarMoOrder
  },
  data() {
    return {
      data: [
        { id: 1, menu: "Bacon", amount: 5, price: 50.0 },
        { id: 1, menu: "Bacon", amount: 5, price: 50.0 },
        { id: 1, menu: "Bacon", amount: 5, price: 50.0 },
        { id: 1, menu: "Bacon", amount: 5, price: 50.0 },
        { id: 1, menu: "Bacon", amount: 5, price: 50.0 }
      ],

      columns: [
        {
          field: "id",
          label: "ID",
          width: "1000",
          numeric: true
        },
        {
          field: "menu",
          label: "Menu"
        },
        {
          field: "amount",
          label: "Amount",
          width: "10",
          numeric: true
        },
        {
          field: "price",
          label: "Price per piece",
          width: "1000",
          numeric: true
        }
      ]
    };
  }
};
</script>

<style scoped>
.wrapper {
  margin: 15px;
}
</style>
