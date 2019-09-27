<template>
  <div>
    <v-layout>
      <v-flex xs2>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" @click="clickButton">Add Menu</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Menu</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <div v-if="image==null">
                      <img
                        src="../../../assets/1.png"
                        width="100px"
                        height="100px"
                        class="imageSize"
                      />
                    </div>
                    <div v-else>
                      <img :src="image" width="100px" height="100px" />
                    </div>

                    <v-flex xs7 sm6>
                      <v-text-field
                        class="name"
                        label="Menu Name"
                        v-model="menu.menuName"
                        :rules="nameRules"
                      ></v-text-field>
                      <b-field class="file">
                        <b-upload v-model="image" v-on:input="onFileChange" class="uploadBtn">
                          <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Click to upload</span>
                          </a>
                        </b-upload>
                      </b-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field label="Menu Price" v-model="menu.menuPrice" :rules="priceRules"></v-text-field>
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
              <v-btn color="blue darken-1" flat @click="confirmAdd">Save</v-btn>
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
  name: "AddButton",
  store,
  components: {},

  data() {
    return {
      nameRules: [
        v => !!v || "Name is required",
        v => this.checkName || "Name has already"
      ],
      priceRules: [
        v => !!v || "Price is required",
        v => !isNaN(this.menu.menuPrice) || "not a number"
      ],
      categoryRules: [v => !!v || "Category is required"],
      allMenu: [],
      menu: {},
      image: null,
      dialog: false,
      imageForUpload: null,
      pathImage: null,
      category: null,
      selectedCategory: null,

      restaurantId: 1
    };
  },
  computed: {
    checkName() {
      for (let index = 0; index < this.allMenu.length; index++) {
        if (
          this.menu.menuName.toLowerCase() ===
          this.allMenu[index].menuName.toLowerCase()
        ) {
          return false;
        }
      }
      return true;
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/getallmenu/" + this.restaurantId)
      .then(response => {
        this.allMenu = response.data;
        console.log(this.allMenu);
      });
  },

  methods: {
    clickButton() {
      axios
        .get("http://localhost:3000/api/getcategory/" + this.restaurantId)
        .then(response => {
          this.category = response.data;
        });
    },
    selected() {
      console.log(this.selectedCategory);
    },
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
    confirmAdd() {
      if (this.$refs.form.validate()) {
        if (this.imageForUpload != null) {
          var formData = new FormData();
          formData.append("file", this.imageForUpload);
          axios
            .post("http://localhost:3000/api/uploadFB", formData)
            .then(response => {
              this.pathImage = response.data.url;
              axios
                .post("http://localhost:3000/api/insertmenu", {
                  menuName: this.menu.menuName,
                  menuPrice: this.menu.menuPrice,
                  categoryId: this.selectedCategory,
                  menuPathImage: this.pathImage,
                  restaurantId: this.restaurantId
                })
                .then(response => {
                  axios
                    .get(
                      "http://localhost:3000/api/getallmenu/" +
                        this.restaurantId
                    )
                    .then(response => {
                      this.$store.commit("setMenu", response.data);
                    });
                  this.$toast.open("insert success");
                  this.closeDialog();
                  this.$refs.form.resetValidation();
                });
            });
        } else {
          axios
            .post("http://localhost:3000/api/insertmenu", {
              menuName: this.menu.menuName,
              menuPrice: this.menu.menuPrice,
              categoryId: this.selectedCategory,
              menuPathImage: this.pathImage,
              restaurantId: this.restaurantId
            })
            .then(response => {
              axios
                .get(
                  "http://localhost:3000/api/getallmenu/" + this.restaurantId
                )
                .then(response => {
                  this.$store.commit("setMenu", response.data);
                  this.$store.commit("setCheckCategory", false);
                });
              this.$toast.open("insert success");
              this.closeDialog();
               this.$refs.form.resetValidation();
            });
        }
      }
    },
    closeDialog() {
      this.menu = {};
      this.image = null;
      this.dialog = false;
      this.imageForUpload = null;
      this.pathImage = null;
      this.selectedCategory = "";
      this.$store.commit("setSelectedMenu", null);
      this.$refs.form.rules;
       this.$refs.form.resetValidation();
    }
  }
};
</script>

<style scoped>
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
.uploadBtn {
  padding-top: 5%;
  padding-left: 25%;
}
.name {
  padding-left: 25%;
}
.imageSize {
  margin-left: 4%;
}
</style>
