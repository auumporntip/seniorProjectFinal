<template>
  <div>
    <v-layout>
      <v-flex xs2>
        <!-- <v-btn color="black" outline v-on="on" @click="checkSelected()"> -->
        <v-icon @click="checkSelected()">edit</v-icon>
        <!-- </v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600px" data-app>
          <v-card>
            <v-card-title style="padding-bottom:0%;">
              <span class="nameDialog">Edit Menu</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md style="padding-top:0%;">
                  <v-layout wrap>
                    <div v-if="image != null">
                      <v-img
                        :src="image"
                        aspect-ratio="1.5"
                        width="150px"
                        height="150px"
                        style="margin-left:15%; margin-top:7%;"
                      ></v-img>
                    </div>
                    <div v-else-if="selectedMenu.menuPathImage == null">
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
                        :src="selectedMenu.menuPathImage"
                        aspect-ratio="1.5"
                        width="150px"
                        height="150px"
                        style="margin-left:15%; margin-top:7%;"
                      ></v-img>
                    </div>
                    <b-field class="file">
                      <b-upload
                        v-model="image"
                        v-on:input="onFileChange"
                        class="uploadBtn"
                      >
                        <a class="button is-info" outlined>
                          <b-icon icon="upload"></b-icon>
                          <span>Click to upload image</span>
                        </a>
                      </b-upload>
                    </b-field>
                    <v-layout column style="margin-left:45%; margin-top:-45%;">
                      <v-flex xs6>
                        <v-text-field
                          label="Menu Name"
                          v-model="selectedMenu.menuName"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          label="Menu Price"
                          v-model="selectedMenu.menuPrice"
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
                        ></v-select
                      ></v-flex> </v-layout
                  ></v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#7d7a73" flat @click="closeDialog">CANCEL</v-btn>
              <v-btn color="#305378" flat @click="confirmEdit">SAVE</v-btn>
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
  name: "EditButton",
  data() {
    return {
      nameRules: [
        v => !!v || "Name is required",
        v => (v && this.checkName()) || "Name has already"
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

      category: [],
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
        axios.get(host + "getcategory/" + this.restaurantId).then(response => {
          this.category = response.data;
        });

        this.selectedCategory = this.$store.getters.selectedMenu.categoryId;
      }
    },
    closeDialog() {
      axios.get(host + "getallmenu/" + 1).then(response => {
        this.$store.commit("setMenu", response.data);
        this.$store.commit("setCheckCategory", false);
        this.$store.commit("setSelectedMenu", null);
        this.dialog = false;
        this.selectedMenu = {};
        this.image = null;
        this.imageForUpload = null;
        this.category = {};
        this.selectedCategory = "";
        this.$refs.form.resetValidation();
        this.$refs.form.rules;
      });
    },
    confirmEdit() {
      if (this.image == null) {
        axios.put(host + "updatemenu/", this.selectedMenu).then(() => {
          this.closeDialog();
        });
      } else {
        var formData = new FormData();
        formData.append("file", this.imageForUpload);
        axios.post(host + "uploadFB", formData).then(response => {
          this.selectedMenu.menuPathImage = response.data.url;
          axios.put(host + "updatemenu/", this.selectedMenu).then(() => {
            this.closeDialog();
          });
        });
      }
      this.dialog = false;
    },
    checkName() {
      if (
        this.name.toLowerCase() === this.selectedMenu.menuName.toLowerCase()
      ) {
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
    axios.get(host + "getallmenu/" + this.restaurantId).then(response => {
      this.allMenu = response.data;
    });
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
.nameDialog {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 2em;
}
</style>
