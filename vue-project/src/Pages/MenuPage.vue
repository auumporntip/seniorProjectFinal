
<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="barcolor"></div>
    <div class="boxright">
      <div id="static">
        <!-- <section id="dropdown">
          <span class="head">Menu:</span>
          <b-dropdown aria-role="list">
            <button class="button is-dark" slot="trigger">
              <span>Select Type</span>
              <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">A La Carte</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet299</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet399</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet499</b-dropdown-item>
            <br>
          </b-dropdown>
          <b-dropdown aria-role="list">
            <button class="button is-dark" slot="trigger">
              <span>Select Category</span>
              <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">A La Carte</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet299</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet399</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet499</b-dropdown-item>
            <br>
          </b-dropdown>
        </section>-->
      </div>

      <br>
      <!-- <b-table :data="menu" :columns="columns" :selected.sync="selected" focusable class="elevation-1"></b-table> -->
      <section>
        <b-field grouped group-multiline>
          <b-select v-model="defaultSortDirection">
            <option value="asc">Default sort direction: ASC</option>
            <option value="desc">Default sort direction: DESC</option>
          </b-select>
          <b-select v-model="perPage" :disabled="!isPaginated">
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
          </b-select>
          <div class="control">
            <button class="button" @click="currentPage = 2" :disabled="!isPaginated">Set page to 2</button>
          </div>
          <div class="control is-flex">
            <b-switch v-model="isPaginated">Paginated</b-switch>
          </div>
          <div class="control is-flex">
            <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</b-switch>
          </div>
        </b-field>

        <b-table
          :data="data"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          :default-sort-direction="defaultSortDirection"
          default-sort="user.first_name"
        >
          <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.row.id }}</b-table-column>

            <b-table-column
              field="user.first_name"
              label="First Name"
              sortable
            >{{ props.row.user.first_name }}</b-table-column>

            <b-table-column
              field="user.last_name"
              label="Last Name"
              sortable
            >{{ props.row.user.last_name }}</b-table-column>

            
            
          </template>
        </b-table>
      </section>
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
  name: "MenuPage",
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
      data:{
        id:1,
        user:{
          first_name: "tiw",
          last_name:"tiw"
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
@media screen and (min-width: 320px) and (max-width: 374px) {
  div.boxright {
    background-color: #f0cab1;
    width: 222px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 104px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 20%;
  }
}
@media screen and (min-width: 375px) and (max-width: 424px) {
  div.boxright {
    background-color: #f0cab1;
    width: 212px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 104px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 20%;
  }
}
@media screen and (min-width: 425px) and (max-width: 767px) {
  div.boxright {
    background-color: #f0cab1;
    width: 215px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 104px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 20%;
  }
}
/* @media screen and (min-width: 480px) and (max-width: 767px) {
  div.boxright {
    background-color: #f0cab1;
    width: 376px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 104px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 15%;
  }
} */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  div.boxright {
    background-color: #f0cab1;
    width: 600px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 184px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 15%;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1279px) {
  div.boxright {
    background-color: #f0cab1;
    width: 820px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 184px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 15%;
  }
}
@media screen and (min-width: 1280px) and (max-width: 1365px) {
  div.boxright {
    background-color: #f0cab1;
    width: 1080px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 184px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 15%;
  }
}
@media screen and (min-width: 1360px) and (max-width: 1365px) {
  div.boxright {
    background-color: #f0cab1;
    width: 1170px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 184px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 15%;
  }
}
@media screen and (min-width: 1366px) {
  div.boxright {
    background-color: #f0cab1;
    width: 1170px;
    height: 100vh;
    margin-top: 0px;
    margin-left: 184px;
  }
  span.head {
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 14px;
    margin-top: 200px;
    padding-left: 10px;
  }
  button#button {
    margin-left: 30px;
    margin-top: 20px;
    margin-right: 30px;
    width: 15%;
  }
}
#button {
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 30px;
  width: 20%;
}
.list2 {
  align-items: left;
  width: 100px;
  height: 100px;
  float: right;
  padding-top: 20px;
}
.list1 {
  width: 100px;
  height: 100px;
  float: right;
  padding-right: 5px;
  padding-top: 20px;
}

body {
  padding-left: 11em;
  height: 100vh;
}
h1 {
  font-weight: normal;
}

.form {
  position: absolute;
  padding-left: 200px;
  padding-top: -100px;
  margin-top: -20px;
}
.boxright {
  background-color: #f0cab1;
  width: 1180px;
  height: 100vh;
  margin-top: 0px;
  margin-left: 180px;
}
.category {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
  margin-top: 200px;
  padding-left: 10px;
}
.list {
  background-color: #d2b48c;
  width: 1230px;
  height: 100px;
  padding-right: 50px;
  margin-top: 15px;
}
#AddEditDelete {
  margin-left: 20px;
  margin-right: 20px;
  float: center;
}
address {
  margin-top: 1em;
  padding-top: 1em;
  border-top: thin dotted;
}
.head {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
  margin-top: 200px;
  padding-left: 10px;
  padding-right: 20px;
}
#static {
  padding-top: 20px;
  margin-left: 30px;
}
#layoutDel {
  margin-left: 600px;
  margin-top: 20px;
  position: absolute;
}
</style>
