<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <Header></Header>
      </v-flex>
      <v-flex xs2>
        <sidebar></sidebar>
      </v-flex>
      <v-flex xs9>
        <MenuTable></MenuTable>
        <v-layout row wrap>
          <v-flex xs4>
            <AddButton></AddButton>
          </v-flex>
          <v-flex xs4>
            <EditButton></EditButton>
          </v-flex>
          <v-flex xs4>
            <DeleteButton></DeleteButton>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
import { store } from "../../store/store";
import AddButton from "./componentMenu/AddButton";
import EditButton from "./componentMenu/EditButton";
import DeleteButton from "./componentMenu/DeleteButton";
import MenuTable from "./componentMenu/MenuTable";

export default {
  name: "MenuPage",
  store,
  components: {
    Header,
    sidebar,
    AddButton,
    MenuTable,
    DeleteButton,
    EditButton
  },
  data() {
    return {};
  },
  created() {
    axios.get("http://localhost:3000/api/getcategory/" + 1).then(response => {
      this.category = response.data;
    });
  }
};
</script>

