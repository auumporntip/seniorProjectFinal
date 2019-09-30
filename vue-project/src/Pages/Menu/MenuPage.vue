<template>
  <div>
    <sidebar></sidebar>
    <div id="bigBox">
      <div class="bg">
        <v-card-title class="headline font-weight-medium">MENU</v-card-title>
        <div id="button">
          <AddButton></AddButton><CategoryButton></CategoryButton>
        </div>
        <MenuTable></MenuTable>
      </div>
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
import CategoryButton from "./componentMenu/CategoryButton";

export default {
  name: "MenuPage",
  store,
  components: {
    sidebar,
    AddButton,
    MenuTable,
    DeleteButton,
    EditButton,
    CategoryButton
  },
  data() {
    return {};
  },
  created() {
    axios.get("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/getcategory/" + 1).then(response => {
      this.category = response.data;
    });
  }
};
</script>

<style scoped>
.bg {
  background-color: #f0cab1;
  border-radius: 20px;
  padding: 1%;
}
#bigBox {
  background-color: #eeeeee;
  height: 800px;
  padding: 2%;
  margin-top: -800px;
  margin-left: 20%;
  background-attachment: fixed;
}
#button {
  margin-left: 20%;
  margin-top: -2%;
}
</style>