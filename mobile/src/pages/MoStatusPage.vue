<template>
  <v-content>
    <Bar></Bar>
    <div class="wrapper">
      <b-table :data="data" :columns="columns"></b-table>
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
      data: [
        { id: 1, menu: "Bacon", status: "Preparing" },
        { id: 2, menu: "Bacon", status: "Preparing" },
        { id: 3, menu: "Bacon", status: "Preparing" },
        { id: 4, menu: "Bacon", status: "Preparing" },
        { id: 5, menu: "Bacon", status: "Preparing" },
        { id: 6, menu: "Bacon", status: "Preparing" }
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
          field: "status",
          label: "Status"
        }
      ]
    };
  },
  created() {
    this.$store.commit("setNamePages", "Status");
  }
};
</script>

<style scoped>
.wrapper {
  margin: 15px;
  padding-bottom: 15px;
}
</style>