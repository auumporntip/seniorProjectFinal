
<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="barcolor"></div>
    <div id="boxright">
      <div id="static">
        <section id="dropdown">
          <span class="head">Category of Food:</span>
          <b-dropdown aria-role="list">
            <button class="button is-dark" slot="trigger">
              <span>Select Category</span>
              <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">A La Carte</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet299</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet399</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet499</b-dropdown-item>
          </b-dropdown>
        </section>
      </div>
      <br>
      <b-table :data="menu" :columns="columns" :selected.sync="selected" focusable></b-table>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
export default {
  name: "OrderedPage",
  components: {
    Header,
    sidebar
  },
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding-left: 11em;
}
#boxright {
  background-color: #f0cab1;
  width: 1170px;
  height: 100vh;
  margin-top: 0px;
  margin-left: 180px;
}
.list {
  background-color: #d2b48c;
  width: 1230px;
  height: 100px;
  padding-right: 50px;
  margin-top: 15px;
}
.head {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
  margin-top: 200px;
  padding-left: 40px;
}
#static {
  padding-top: 20px;
}
</style>
