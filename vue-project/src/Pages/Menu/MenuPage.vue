<template>
  <div>
    <sidebar></sidebar>
    <div id="bigBox">
      <section class="bg">
        <v-card-title class="title">MENU</v-card-title>
        <MenuTable></MenuTable>
        <AddButton></AddButton>
        <EditButton></EditButton>
        <DeleteButton></DeleteButton>
      </section>
    </div>
  </div>
</template>

<script>
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

<style scoped>
.bg {
  background-color: #f0cab1;
  border-radius: 20px;
}
#bigBox {
  background-color: #eeeeee;
  height: 800px;
  padding: 2%;
  margin-top: -800px;
  margin-left: 20%;
  background-attachment: fixed;
}
</style>