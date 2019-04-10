<template>
  <v-content>
    <BarStatus></BarStatus>
    <div class="wrapper">
    <b-table :data="data" :columns="columns"></b-table>
    </div>
    <v-footer height="auto">
      <v-card class="flex" color="lime darken-4">
          <v-flex xs12 sm12 text-xs-center>
       <v-btn color="white">Menu Page</v-btn>
          
          <v-btn color="white">Check Bill</v-btn>
          </v-flex>
         </v-card>
    </v-footer>
  </v-content>
</template>

<script>
import Bar from "../components/bar";
import ButtonNext from "../components/buttonNext";
import BarStatus from "../components/BarStatus";
export default {
  name: "MoStatusPage",
  components: {
    Bar,
    ButtonNext,
    BarStatus
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      data: [
        {id: 1,menu: "Bacon", status: "Preparing"},
        {id: 2,menu: "Bacon", status: "Preparing"},
        {id: 3,menu: "Bacon", status: "Preparing"},
        {id: 4,menu: "Bacon", status: "Preparing"},
        {id: 5,menu: "Bacon", status: "Preparing"},
        {id: 6,menu: "Bacon", status: "Preparing"}
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
.wrapper{
    margin: 15px;
}
</style>



