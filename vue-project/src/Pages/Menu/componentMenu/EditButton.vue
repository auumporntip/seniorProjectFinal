<template>
  <div>
    <v-layout>
      <v-flex xs2>
        <v-btn color="primary" dark v-on="on" @click="checkSelected()">Edit Menu</v-btn>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Menu</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs5 sm3>
                      <div v-if="image!=null">
                        <img :src="image" width="80px" height="80px" />
                      </div>
                      <div v-else-if="selectedMenu.menuPathImage==null">
                        <img src="../../../assets/1.png" width="80px" height="80px" />
                      </div>
                      <div v-else>
                        <img :src="selectedMenu.menuPathImage" width="80px" height="80px" />
                      </div>
                    </v-flex>
                    <b-field class="file">
                      <b-upload v-model="image" v-on:input="onFileChange">
                        <a class="button is-primary">
                          <b-icon icon="upload"></b-icon>
                          <span>Click to upload</span>
                        </a>
                      </b-upload>
                    </b-field>
                    <v-flex xs7 sm6>
                      <v-text-field
                        label="Menu Name"
                        v-model="selectedMenu.menuName"
                        :rules="nameRules"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        label="Menu Price"
                        v-model="selectedMenu.menuPrice"
                        :rules="priceRules"
                      ></v-text-field>
                    </v-flex>
                    <v-select
                      label="Select Category"
                      v-model="selectedCategory"
                      :items="category"
                      item-text="categoryName"
                      item-value="categoryId"
                      :rules="categoryRules"
                    ></v-select>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="confirmEdit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../../../store/store";

export default {
  name: "EditButton",
  data() {
    return {
      nameRules: [
        v => !!v || "Name is required",
        v => this.checkName || "Name has already"
      ],
      priceRules: [
        v => !!v || "Price is required",
        v => !isNaN(this.selectedMenu.menuPrice) || "not a number"
      ],
      categoryRules: [v => !!v || "Category is required"],

      dialog: false,
      selectedMenu: {},

      name: null,

      image: null,
      imageForUpload: null,

      category: {},
      selectedCategory: "",

      allMenu: {},
      restaurantId: 1
    };
  },
  methods: {
    onFileChange() {
      this.imageForUpload = this.image;
      this.createImage(this.image);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = e => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    checkSelected() {
      if (this.$store.getters.selectedMenu == null) {
        this.dialog = false;
        this.$dialog.alert({
          title: "Error",
          message: "Please selected some menu row for edit",
          type: "is-warning"
        });
      } else {
        this.dialog = true;
        this.selectedMenu = this.$store.getters.selectedMenu;

        this.name = this.$store.getters.selectedMenu.menuName;
        axios
          .get("http://localhost:3000/api/getcategory/" + this.restaurantId)
          .then(response => {
            this.category = response.data;
          });

        this.selectedCategory = this.$store.getters.selectedMenu.categoryId;
      }
    },
    closeDialog() {
      console.log(this.name);
      axios.get("http://localhost:3000/api/getallmenu/" + 1).then(response => {
        this.$store.commit("setMenu", response.data);
        this.$store.commit("setCheckCategory", false);
        this.$store.commit("setSelectedMenu", null);
        this.dialog = false;
        this.selectedMenu = {};
        this.image = null;
        this.imageForUpload = null;
        this.category = {};
        this.selectedCategory = "";

        this.$refs.form.rules;
      });
    },
    confirmEdit() {
      if (this.image == null) {
        axios
          .put("http://localhost:3000/api/updatemenu/", this.selectedMenu)
          .then(() => {
            this.closeDialog();
          });
      } else {
        var formData = new FormData();
        formData.append("file", this.imageForUpload);
        axios
          .post("http://localhost:3000/api/uploadFB", formData)
          .then(response => {
            this.selectedMenu.menuPathImage = response.data.url;
            axios
              .put("http://localhost:3000/api/updatemenu/", this.selectedMenu)
              .then(() => {
                this.closeDialog();
              });
          });
      }
    }
  },
  computed: {
    checkName() {
      if (this.name === this.selectedMenu.menuName) {
        return true;
      } else {
        for (let index = 0; index < this.allMenu.length; index++) {
          if (
            this.selectedMenu.menuName.toLowerCase() ===
            this.allMenu[index].menuName.toLowerCase()
          ) {
            return false;
          }
        }
        return true;
      }
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/getallmenu/" + this.restaurantId)
      .then(response => {
        this.allMenu = response.data;
        console.log(this.allMenu);
      });
  }
};
</script>
<style scoped>
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>
