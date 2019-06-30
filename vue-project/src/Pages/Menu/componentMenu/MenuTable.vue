<template>
  <div>
    <span class="head">Category of Food:</span>
    <b-dropdown v-model="selectedCategory">
      <button class="button is-dark" slot="trigger" v-if="this.$store.getters.checkCategory">
        {{selectedCategory.categoryName}}
        <b-icon icon="menu-down"></b-icon>
      </button>
      <button class="button is-dark" slot="trigger" v-else>
        All Category
        <b-icon icon="menu-down"></b-icon>
      </button>
      <b-dropdown-item @click="allCategory">All Category</b-dropdown-item>
      <b-dropdown-item
        v-for="option in category"
        :value="option"
        :key="option.categoryId"
        @click="changeCategoryMenu"
      >{{option.categoryName}}</b-dropdown-item>
    </b-dropdown>
    <b-field>
      <b-input placeholder="Search..." type="search" v-model="keyword"></b-input>
    </b-field>
    <b-table
      :data="items"
      :selected.sync="selectedMenu"
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
      @select="selected"
    >
      <template slot-scope="props">
        <b-table-column label="Image" width="80">
          <div class="img-resize" v-if="props.row.menuPathImage!=null">
            <img :src="props.row.menuPathImage">
          </div>
          <div class="img-resize" v-else>
            <img src="../../../assets/1.png">
          </div>
        </b-table-column>

        <b-table-column label="Menu Name" width="200">{{ props.row.menuName }}</b-table-column>

        <b-table-column label="Price" width="200">{{ props.row.menuPrice }}</b-table-column>

        <b-table-column label="Category" width="0">{{ props.row.categoryName }}</b-table-column>
      </template>
    </b-table>
  </div>
</template>
<script>
import axios from "axios";
import { store } from "../../../store/store";

export default {
  name: "TestAxios",
  data() {
    return {
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,

      selectedMenu: {},
      keyword: "",

      category: {},
      selectedCategory: "",
    };
  },
  methods: {
    changeCategoryMenu() {
      axios
        .get(
          "http://localhost:3000/api/getmenubycategory/" +
            this.selectedCategory.categoryId +
            "/" +
            1
        )
        .then(response => {
          this.$store.commit("setMenu", response.data);
        });
    this.$store.commit('setCheckCategory',true)
    },
    allCategory() {
      axios.get("http://localhost:3000/api/getallmenu/" + 1)
        .then(response => {
          this.$store.commit("setMenu", response.data);
        });
    this.$store.commit('setCheckCategory',false)
    },
    selected() {
      setTimeout(() => {
        this.$store.commit("setSelectedMenu", this.selectedMenu);
        console.log(this.selectedMenu);
      }, 1);
    }
  },
  computed: {
    items() {
      if (this.keyword != "") {
        return this.$store.getters.menu.filter(
          items =>
            items.menuName.toLowerCase().includes(this.keyword.toLowerCase()) ||
            items.categoryName
              .toLowerCase()
              .includes(this.keyword.toLowerCase())
        );
      } else {
        return this.$store.getters.menu;
      }
    }
  },
  created: function() {
    axios.get("http://localhost:3000/api/getallmenu/" + 1).then(response => {
      this.$store.commit("setMenu", response.data);
      console.log(this.$store.getters.menu);
      this.selectedMenu = response.data[0];
      this.$store.commit("setSelectedMenu", response.data[0]);
    });
    axios.get("http://localhost:3000/api/getcategory/" + 1).then(response => {
      this.category = response.data;
      console.log(this.category)
    });

    this.$store.commit('setCheckCategory',false)
  }
};
</script>    