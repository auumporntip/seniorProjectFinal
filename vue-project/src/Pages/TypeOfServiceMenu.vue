
<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="barcolor"></div>
    <div id="boxright">
      <span id="cat">Category Name: </span>
      <b-table
        :data="menu"
        :columns="columns"
        :selected.sync="selected"
        focusable
        class="elevation-1"
      ></b-table>
      <span id="AddEditDelete">
        <AddMenuButton></AddMenuButton>
        <EditMenuButton></EditMenuButton>
        <v-layout id="layoutDel">
          <v-flex xs2>
            <v-btn color="primary" dark @click="confirmCustom">Delete Menu</v-btn>
          </v-flex>
        </v-layout>
      </span>
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
  name: "TypeOfServiceMenu",
  components: {
    Header,
    sidebar,
    AddMenuButton,
    EditMenuButton,
    DeleteMenuButton
  },
  data() {
    const menu = [];
    return {
      data: {
        id: 1,
        user: {
          first_name: "tiw",
          last_name: "tiw"
        }
      },
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 5,
      menu: menu,
      selected: {},
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
  },
  methods: {
    confirmCustom() {
      console.log(this.selected);
      this.$dialog.confirm({
        title: "Privacy Politics",
        message: "จะลบจริงอ่อ",
        cancelText: "Disagree",
        confirmText: "Agree",
        type: "is-success",
        onConfirm: () => {
          axios.delete(
            "http://localhost:3000/api/deletemenu/" +
              this.selected.menuId +
              "/" +
              this.selected.restaurantId
          );
          this.menu = this.arrayRemove(this.menu, this.selected);
          this.$toast.open("delete success");
        }
      });
    },
    arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele != value;
      });
    }
  },
  created: function() {
    axios.get("http://localhost:3000/api/getallmenu/1").then(response => {
      this.menu = response.data;
      this.selected = response.data[0];
      console.log(response.data);
      // return response.data
    });
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
#cat {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 20px;
  float: left;
}
#AddEditDelete {
  margin-left: 20px;
  margin-right: 20px;
  float: center;
}
#layoutDel {
  margin-left: 600px;
  margin-top: 20px;
  position: absolute;
}
</style>
