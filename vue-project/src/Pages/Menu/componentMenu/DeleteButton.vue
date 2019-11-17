<template>
  <div>
    <!-- <v-btn color="primary" dark @click="confirmDelete">Delete Menu</v-btn> -->
    <v-icon @click="confirmDelete">delete</v-icon>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../../../store/store";
import { host } from "../../data";

export default {
  name: "DeleteButton",
  methods: {
    confirmDelete() {
      if (this.$store.getters.selectedMenu != null) {
        console.log(this.$store.getters.selectedMenu);
        this.$dialog.confirm({
          title: "Privacy Politics",
          message: "Are you sure you want to delete?",
          cancelText: "Disagree",
          confirmText: "Agree",
          type: "is-success",
          onConfirm: () => {
            axios
              .delete(
                host +
                  "deletemenu/" +
                  this.$store.getters.selectedMenu.menuId +
                  "/" +
                  1
                // this.$store.getters.restaurantId
              )
              .then(response => {
                if (response.data === false) {
                  this.$toast.open("cannot delete");
                } else {
                  this.$toast.open("delete success");
                }
                axios.get(host + "getallmenu/" + 1).then(response => {
                  this.$store.commit("setMenu", response.data);
                  this.$store.commit("setCheckCategory", false);
                  this.$store.commit("setSelectedMenu", null);
                });
              });
          }
        });
      } else {
        this.$dialog.alert({
          title: "Error",
          message: "Please selected some menu row",
          type: "is-warning"
        });
      }
    }
  }
};
</script>
<style scoped>
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>
