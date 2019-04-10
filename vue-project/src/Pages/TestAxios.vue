<template>
  <div>
    <b-table :data="menu" :columns="columns" :selected.sync="selected" focusable></b-table>
    <button class="button is-medium is-primary" @click="insert">insert</button>
    <button class="button is-medium is-danger" @click="confirmCustom">Delete</button>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload">
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TestAxios",
  data() {
    const menu = [];
    // this.test();
    // this.test()
    // console.log(data)

    return {
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
              "/1"
          );
          
          this.menu = this.arrayRemove(this.menu, this.selected);
          this.$toast.open("delete success");
          
        }
      });
    },
    insert() {
      this.$dialog.confirm({
        title: "Privacy Politics",
        message: "insert",
        cancelText: "Disagree",
        confirmText: "Agree",
        type: "is-success",
        onConfirm: () => {
          console.log(this.selected);
          axios.post("http://localhost:3000/api/insertmenu", this.selected);
          this.$toast.open("insert success");
        }
      })
    },
    arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele != value;
      });
    }
  },
  created: function() {
    axios.get(`http://localhost:3000/api/getallmenu/1`).then(response => {
      this.menu = response.data;
      this.selected = response.data[0];
      console.log(response.data);
      // return response.data
    });
  }
};
</script>

<style>
</style>
