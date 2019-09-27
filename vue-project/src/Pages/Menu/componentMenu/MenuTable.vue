<template>
  <div>
    <span id="test">
      <v-flex xs12>
        <v-card-title>
          Category of food
          <!-- <span class="head">Category of Food:</span> -->
          <b-dropdown v-model="selectedCategory">
            <v-btn class="button is-dark" slot="trigger" v-if="this.$store.getters.checkCategory">
              {{selectedCategory.categoryName}}
              <b-icon icon="menu-down"></b-icon>
            </v-btn>

            <v-btn class="button is-dark" slot="trigger" v-else id="button">
              All Category
              <!-- <b-icon icon="menu-down"></b-icon> -->
            </v-btn>
            <b-dropdown-item @click="allCategory">All Category</b-dropdown-item>
            <b-dropdown-item
              v-for="option in category"
              :value="option"
              :key="option.categoryId"
              @click="changeCategoryMenu"
            >{{option.categoryName}}</b-dropdown-item>
          </b-dropdown>
          <v-layout>
            <v-flex xs2>
              <v-btn class="add" @click="AddDialog=true">Add Category</v-btn>
              <v-dialog v-model="AddDialog" max-width="490">
                <v-card>
                  <v-card-text class="headline">
                    Add Category
                    <v-form ref="form">
                      <v-container fluid>
                        <v-text-field
                          label="categoryName"
                          v-model="newCat.categoryName"
                          type="text"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="addCancel">Cancel</v-btn>
                    <v-btn text @click="addSave">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>

          <v-text-field
            class="search"
            v-model="keyword"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-flex>
    </span>

    <!-- <div class="search"> -->
    <!-- <b-field>
        <b-input placeholder="Search..." type="search" v-model="keyword"></b-input>
    </b-field>-->

    <b-table
      :data="items"
      :selected.sync="selectedMenu"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @select="selected"

      id="imageColumn"
    >
      <template slot-scope="props">
        <b-table-column label="Image" width="80" >
          <div class="img-resize" v-if="props.row.menuPathImage!=null">
            <img :src="props.row.menuPathImage" />
          </div>
          <div class="img-resize" v-else>
            <img src="../../../assets/1.png" />
          </div>
        </b-table-column>

        <b-table-column label="Menu Name" width="200">{{ props.row.menuName }}</b-table-column>

        <b-table-column label="Price" width="200">{{ props.row.menuPrice }}</b-table-column>

        <b-table-column label="Category" width="0">{{ props.row.categoryName }}</b-table-column>
      </template>
    </b-table>
  </div>
  <!-- </div> -->
</template>
<script>
import axios from "axios";
import { store } from "../../../store/store";

export default {
  name: "TestAxios",
  data() {
    return {
      //Add
      AddDialog: false,
      newCat: [],
      nameRules: [
        v => !!v || "Name is required",
        v => this.checkName || "Name has already"
      ],
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,

      selectedMenu: {},
      keyword: "",

      category: {},
      selectedCategory: ""
    };
  },
  methods: {
    addCancel() {
      this.AddDialog = false;
      this.$refs.form.resetValidation();
      this.newCat = [];
    },
    addSave() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3000/api/insertCategory", {
            categoryName: this.newCat.categoryName,
            restaurantId: 1
          })
          .then(response => {
            this.reCat();
            (this.newCat = []), this.$refs.form.resetValidation();
            this.AddDialog = false;
          });
      }
    },
    reCat() {
      axios.get("http://localhost:3000/api/getallcategory").then(response => {
        this.category = response.data;
      });
    },
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
      this.$store.commit("setCheckCategory", true);
    },
    allCategory() {
      axios.get("http://localhost:3000/api/getallmenu/" + 1).then(response => {
        this.$store.commit("setMenu", response.data);
      });
      this.$store.commit("setCheckCategory", false);
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
    },
    checkName() {
      for (let index = 0; index < this.category.length; index++) {
        if (
          this.newCat.categoryName.toLowerCase() ===
          this.category[index].categoryName.toLowerCase()
        ) {
          return false;
        }
      }
      this.$refs.form.rules;
      return true;
    }
  },
  created: function() {
    axios.get("http://localhost:3000/api/getallmenu/" + 1).then(response => {
      this.$store.commit("setMenu", response.data);
      this.selectedMenu = response.data[0];
      this.$store.commit("setSelectedMenu", response.data[0]);
    });
    axios.get("http://localhost:3000/api/getcategory/" + 1).then(response => {
      this.category = response.data;
    });

    this.$store.commit("setCheckCategory", false);
  }
};
</script>    
<style >
.head {
  margin-left: 20px;
}
.search {
  margin-left: 57%;
  position: absolute;
}
#button {
  margin-left: 10px;
}
#imageColumn{
  margin-left: 1%;
  margin-right: 1%;
}
</style>