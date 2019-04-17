<template>
  <v-content>
    <BarMoReceipt></BarMoReceipt>

    <v-layout class="space">
      <v-flex xs6>
        <p class="subheading">{{billNo}}</p>
        <p class="subheading">{{tableNo}}</p>
      </v-flex>
      <v-flex xs6>
        <p class="subheading">{{date}}</p>
        <p class="subheading">{{time}}</p>
      </v-flex>
    </v-layout>

    <div class="wrapper">
      <b-table :data="data" :columns="columns"></b-table>
    </div>

    <NavBarMoReceipt></NavBarMoReceipt>
  </v-content>
</template>

<script>
import BarMoReceipt from "../components/BarMoReceipt";
import NavBarMoReceipt from "../components/NavBarMoReceipt";
export default {
  name: "MoReceiptPage",
  components: {
    BarMoReceipt,
    NavBarMoReceipt
  },
  data() {
    return {
      billNo: "Bill No : 001",
      tableNo: "Table No : 1A",
      date: "Date : 01/10/2019",
      time: "Time : 11.30 A.M.",
      data: [{ id: 1, ordered: "Buffet 1199.-", amount: "2", price: "2,398" }],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "1000",
          numeric: true
        },
        {
          field: "ordered",
          label: "Ordered"
        },
        {
          field: "amount",
          label: "Amount"
        },
        {
          field: "price",
          label: "Price",
          numeric: true
        }
      ]
    };
  }
};
</script>

<style scoped>
.space {
  margin: 20px;
  text-align: center;
}
.wrapper {
  margin: 15px;
  padding-bottom: 15px;
}
</style>