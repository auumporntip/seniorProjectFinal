
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
      
      <div id="table">
      <b-field>
        <b-input placeholder="Search..." type="search" v-model="keyword"></b-input>
      </b-field>
      <b-table
        :data="items"
        :selected.sync="selected"
        focusable
        class="elevation-1"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column label="Menu">{{ props.row.menuName }}</b-table-column>

          <b-table-column label="Amount">{{ props.row.numOfTrans }}</b-table-column>

          <b-table-column label="Category">{{ props.row.categoryName }}</b-table-column>

          <b-table-column label="Table">{{ props.row.tableNumber }}</b-table-column>

          <b-table-column label="Status">{{ props.row.statusName }}</b-table-column>

          <b-table-column label="Time">{{ props.row.transDate }}</b-table-column>
        </template>
      </b-table>
      </div>

      <br>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
import dayjs from "dayjs";
import { store } from '../store/store'

export default {
  name: "MenuPage",
  store,
  components: {
    Header,
    sidebar
  },
  data() {
    return {
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 9,

      checkCategory: false,
      selectedCategory: "",
      restaurantId: "1",
      category: [],
      selected: {},
      orders: [],
      keyword:""
    };
  },
  computed: {
    items() {
      if(this.keyword!=""){
        return this.orders.filter(
            items =>
              items.menuName.toLowerCase().includes(this.keyword.toLowerCase()) ||
              items.categoryName.toLowerCase().includes(this.keyword.toLowerCase()) ||
              items.tableNumber.toString().includes(this.keyword.toLowerCase())||
              items.transDate.toLowerCase().includes(this.keyword.toLowerCase())
          )
      }else{
        return this.orders
      }
    }
  },
  methods: {
    formatDate(time) {
      return dayjs(time).format("HH:mm");
    },
    changeCategoryMenu() {
      console.log(this.selectedCategory.categoryId);
      axios
        .get(
          "http://13.228.170.25:7777/api/gettransactionbycategoryid/1/" +
            this.selectedCategory.categoryId
        )
        .then(response => {
          this.orders = response.data;
        });
      this.checkCategory = true;
    },
    allcategory() {
      axios.get("http://13.228.170.25:7777/api/gettransaction/"+this.$store.getters.restaurantId).then(response => {
        this.orders = response.data;
      });
      this.checkCategory = false;
    }
  },
  created: function() {
    axios.get("http://13.228.170.25:7777/api/getcategory/"+this.$store.getters.restaurantId).then(response => {
      this.category = response.data;
    });
    axios.get("http://13.228.170.25:7777/api/gettransaction/"+this.$store.getters.restaurantId).then(response => {
      this.orders = response.data;
      for (let index = 0; index < this.orders.length; index++) {
        console.log(dayjs(this.orders[index].transDate).format("HH:mm:ss"))
        this.orders[index].transDate = dayjs(this.orders[index].transDate).format("HH:mm")
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*@media screen and (min-width: 320px) and (max-width: 374px) {
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
}*/
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
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;  
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

#table {
  margin-left: 50px;
  margin-right: 50px;
}
</style>
