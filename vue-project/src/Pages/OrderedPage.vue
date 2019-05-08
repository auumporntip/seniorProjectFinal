
<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="barcolor"></div>
    <div class="boxright">
      <div id="static">
        <section id="dropdown">
          <span class="head">Category of Food:</span>
          <b-dropdown v-model="selectedCategory">
            <button class="button is-dark" slot="trigger" v-if="checkCategory">
              {{selectedCategory.categoryName}}
              <b-icon icon="menu-down"></b-icon>
            </button>
            <button class="button is-dark" slot="trigger" v-else>
              All Category
              <b-icon icon="menu-down"></b-icon>
            </button>
            <b-dropdown-item @click="allcategory">All Category</b-dropdown-item>
            <b-dropdown-item
              v-for="option in category"
              :value="option"
              :key="option.categoryId"
              @click="changeCategoryMenu"
            >{{option.categoryName}}</b-dropdown-item>
          </b-dropdown>
        </section>
      </div>

      <br>
      <b-table
        :data="orders"
        :columns="columns"
        :selected.sync="selected"
        focusable
        class="elevation-1"
      ></b-table>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";

export default {
  name: "MenuPage",
  components: {
    Header,
    sidebar
  },
  data() {
    return {
      checkCategory:false,
      selectedCategory: "",
      restaurantId: "1",
      category: [],
      selected: {},
      orders:[],
      columns: [
        {
          field: "transId",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "menuName",
          label: "Menu"
        },
        {
          field: "numOfTrans",
          label: "Amount"
        },
        {
          field: "categoryName",
          label: "Category"
        },
        {
          field: "tableNumber",
          label: "Table"
        },
        {
          field: "statusName",
          label: "Status"
        }
      ]
    };
  },
  methods: {
    changeCategoryMenu() {
      console.log(this.selectedCategory.categoryId)
      axios.get("http://localhost:3000/api/gettransactionbycategoryid/1/"+this.selectedCategory.categoryId).then(response=>{
      this.orders = response.data
    })
      this.checkCategory=true
    },
    allcategory() {
      axios.get("http://localhost:3000/api/gettransaction/1").then(response=>{
      this.orders = response.data
    })
      this.checkCategory = false
    }
  },
  created: function() {
    axios.get("http://localhost:3000/api/getcategory/1").then(response => {
      this.category = response.data;
    });
    axios.get("http://localhost:3000/api/gettransaction/1").then(response=>{
      this.orders = response.data
    })
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
</style>
