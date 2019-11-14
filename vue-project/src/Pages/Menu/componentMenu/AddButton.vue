<template>
  <div>
    <v-layout>
      <v-flex xs2>
        <v-dialog data-app v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="#B7CDC2" v-on="on" @click="clickButton" class="addBtn">
              <v-icon left dark>add</v-icon>Add Menu
            </v-btn>
          </template>
          <v-card>
            <v-card-title style="padding-bottom:0%;">
              <span class="nameDialog">Add Menu</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md style="padding-top:0%;">
                  <v-layout wrap>
                    <div v-if="image==null">
                      <v-img
                        :src="require('../../../assets/1.png')"
                        aspect-ratio="1.5"
                        width="150px"
                        height="150px"
                        style="margin-left:15%; margin-top:7%;"
                      ></v-img>
                    </div>
                    <div v-else>
                      <v-img
                        :src="image"
                        aspect-ratio="1.5"
                        width="150px"
                        height="150px"
                        style="margin-left:15%; margin-top:7%;"
                      ></v-img>
                    </div>
                    <b-field class="file">
                      <b-upload v-model="image" v-on:input="onFileChange" class="uploadBtn">
                        <a class="button is-info" outlined>
                          <b-icon icon="upload"></b-icon>
                          <span>Click to upload image</span>
                        </a>
                      </b-upload>
                    </b-field>
                    <v-layout column style="margin-left:45%; margin-top:-45%;">
                      <v-flex xs6>
                        <v-text-field label="Menu Name" v-model="menu.menuName" :rules="nameRules"></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          label="Menu Price"
                          v-model="menu.menuPrice"
                          :rules="priceRules"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-select
                          label="Select Category"
                          v-model="selectedCategory"
                          :items="category"
                          item-text="categoryName"
                          item-value="categoryId"
                          :rules="categoryRules"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#7d7a73" flat @click="closeDialog">Cancel</v-btn>
              <v-btn color="#305378" flat @click="confirmAdd">Save</v-btn>
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
import { host } from "../../data";

export default {
  name: "AddButton",
  store,
  components: {},

  data() {
    return {
      nameRules: [
        v => !!v || "Name is required",
        v => (v && this.checkName()) || "This name has already"
      ],
      priceRules: [
        v => !!v || "Price is required",
        v => !isNaN(this.menu.menuPrice) || "Not a number",
        v => v > 0 || "Price must more than zero",
        v => v < 5000 || "Price must less than 5000"
      ],
      categoryRules: [v => !!v || "Category is required"],
      allMenu: [],
      menu: [],
      image: null,
      dialog: false,
      imageForUpload: null,
      pathImage: null,
      category: null,
      selectedCategory: null,

      restaurantId: 1,

      //add category
      AddDialog: false
    };
  },
  created() {
    axios
      .get(host+"getallmenu/" + this.restaurantId)
      .then(response => {
        this.allMenu = response.data;
      });
    axios.get(host+"getcategory/" + 1).then(response => {
      this.category = response.data;
    });
  },

  methods: {
    clickButton() {
      axios
        .get(host+"getcategory/" + this.restaurantId)
        .then(response => {
          this.category = response.data;
        });
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
            .post(host+"uploadFB", formData)
            .then(response => {
              this.pathImage = response.data.url;
              axios
                .post(host+"insertmenu", {
                  menuName: this.menu.menuName,
                  menuPrice: this.menu.menuPrice,
                  categoryId: this.selectedCategory,
                  menuPathImage: this.pathImage,
                  restaurantId: this.restaurantId
                })
                .then(response => {
                  axios
                    .get(
                      host+"getallmenu/" +
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
            .post(host+"insertmenu", {
              menuName: this.menu.menuName,
              menuPrice: this.menu.menuPrice,
              categoryId: this.selectedCategory,
              menuPathImage: this.pathImage,
              restaurantId: this.restaurantId
            })
            .then(response => {
              axios
                .get(
                  host+"getallmenu/" + this.restaurantId
                )
                .then(response => {
                  this.allMenu = response.data;
                  this.$store.commit("setMenu", response.data);
                  this.$store.commit("setCheckCategory", false);
                });
              this.$toast.open("insert success");

              this.closeDialog();
              this.$refs.form.resetValidation();
            });
        }
        this.dialog = false;
      }
    },
    closeDialog() {
      this.menu = [];
      this.image = null;
      this.dialog = false;
      this.imageForUpload = null;
      this.pathImage = null;
      this.selectedCategory = "";
      this.$store.commit("setSelectedMenu", null);
      this.$refs.form.resetValidation();
    },
    addCancel() {
      this.AddDialog = false;
      this.$refs.form.resetValidation();
    },
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
  }
};
</script>

<style scoped>
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
.uploadBtn {
  padding-top: 100%;
  margin-left: -80%;
}

.imageSize {
  margin-left: 4%;
}
.addBtn {
  margin-top: 20%;
  margin-left: -135%;
}
.nameDialog {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 2em;
}
</style>
