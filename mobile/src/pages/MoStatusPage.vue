<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <b-table :data="orders" :columns="columns"></b-table>
    </div>

    <v-footer>
      <NavBar></NavBar>
    </v-footer>
  </v-content>
</template>

<script>
import Bar from "../components/Bar";
import NavBar from "../components/NavBar";
import { store } from "../store/store";
import axios from "axios";
export default {
  name: "MoStatusPage",
  components: {
    Bar,
    NavBar
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      orders:[],
      columns: [
        {
          field: "menuName",
          label: "Menu"
        },
        {
          field: "statusName",
          label: "Status"
        }
      ]
    };
  },
  created() {
    this.$store.commit("setNamePages", "Status");
    axios.get("http://localhost:3000/api/getorderbybillid/"+localStorage.getItem('billId')).then(response=>{
      this.orders = response.data
    })
  }
};
</script>

<style scoped>
.wrapper {
  margin: 15px;
  padding-bottom: 15px;
}
</style>