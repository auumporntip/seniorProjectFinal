<template>
  <div>
    <v-text-field
      class="search"
      v-model="keyword"
      append-icon="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-layout row wrap align-center>
      <v-subheader class="text">Category</v-subheader>
      <b-dropdown v-model="selectedCategory" id="button">
        <v-btn flat slot="trigger" v-if="this.$store.getters.checkCategory">
          {{selectedCategory.categoryName}}
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>

        <v-btn flat slot="trigger" v-else>
          <span>Category</span>
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>

        <b-dropdown-item @click="allCategory">All Category</b-dropdown-item>
        <b-dropdown-item
          v-for="option in category"
          :value="option"
          :key="option.categoryId"
          @click="changeCategoryMenu"
        >{{option.categoryName}}</b-dropdown-item>
      </b-dropdown>
    </v-layout>
&nbsp;&nbsp;&nbsp;&nbsp;
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
        <b-table-column label="Image" width="80">
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
        <b-table-column label="Edit Menu" width="120">
          <EditButton></EditButton>
        </b-table-column>
        <b-table-column label="Delete Menu" width="120">
          <DeleteButton></DeleteButton>
        </b-table-column>
      </template>
    </b-table>
  </div>
  <!-- </div> -->
</template>
<script>
import axios from "axios";
import { store } from "../../../store/store";
import EditButton from "../componentMenu/EditButton";
import DeleteButton from "../componentMenu/DeleteButton";

export default {
  name: "TestAxios",
  components: {
    EditButton,
    DeleteButton
  },
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
/* .head {
  margin-left: 20px;
} */
.search {
  margin-left: 57%;
  position: absolute;
  margin-top: -3%;
}
/* #button {
  margin-left: 10px;
} */
#imageColumn {
  margin-left: 1%;
  margin-right: 1%;
}
#button {
  margin-left: 86%;
  margin-top: -5%;
}
.text {
  margin-left: 75%;
  margin-top: 0%;
}
</style>