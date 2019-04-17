<template>
  <v-content>
    <BarMoStatus></BarMoStatus>
    <div class="wrapper">
      <b-table :data="data" :columns="columns"></b-table>
    </div>

    <v-footer>
      <NavBarMoStatus></NavBarMoStatus>
    </v-footer>
  </v-content>
</template>

<script>
import BarMoStatus from "../components/BarMoStatus";
import NavBarMoStatus from "../components/NavBarMoStatus";
export default {
  name: "MoStatusPage",
  components: {
    BarMoStatus,
    NavBarMoStatus
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
  }
};
</script>

<style scoped>
.wrapper {
  margin: 15px;
  padding-bottom: 15px;
}
</style>