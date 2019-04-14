
<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="barcolor"></div>
    <div id="boxright">
      <div id="catname">Category Name:</div>
      <b-table
        :data="data"
        :columns="columns"
        :checked-rows.sync="checkedRows"
        checkable
        id="table"
      >
        <template slot="bottom-left">
          <b>Total checked</b>
          : {{ checkedRows.length }}
        </template>
      </b-table>
      <v-layout id="layout">
        <v-flex xs2>
          <v-btn color="primary" dark @click=" ">Add menu</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import AddMenuButton from "@/components/AddMenuButton";
import EditMenuButton from "@/components/EditMenuButton";
import DeleteMenuButton from "@/components/DeleteMenuButton";
import axios from "axios";
export default {
  name: "AddCategory",
  components: {
    Header,
    sidebar
  },
  data() {
    const data = [
      //   { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
      //   { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
      //   { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
      //   { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
      //   { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
    ];

    return {
      data,
      checkedRows: [data[1], data[3]],
      columns: [
        {
          field: "menuId",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "menuName",
          label: "Menu"
        },
        {
          field: "menuPrice",
          label: "Price"
        },
        {
          field: "restaurantId",
          label: "res"
        },
        {
          field: "categoryId",
          label: "cat"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boxright {
  background-color: #f0cab1;
  width: 1170px;
  height: 100vh;
  margin-top: 0px;
  margin-left: 180px;
}
#table {
  padding-left: 0px;
  margin-top: 20px;
}
b {
  padding-left: 20px;
}
#catname {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
  padding-top: 20px;
  padding-left: 40px;
}
#layout{
    margin-left: 500px;
}
</style>
