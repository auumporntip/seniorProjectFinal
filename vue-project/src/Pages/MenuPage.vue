<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
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
      <div id="table">
        <b-input placeholder="Search..." type="search" v-model="keyword"></b-input>

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
          @click="printselected"
        >
          <template slot-scope="props">
            <b-table-column label="Image" width="150">
              <div class="img-resize" v-if="props.row.menuPathImage!=null">
                <img :src="props.row.menuPathImage">
              </div>
              <div class="img-resize" v-else>
                <img src="../assets/1.png">
              </div>
            </b-table-column>

            <b-table-column label="Menu Name" width="200">{{ props.row.menuName }}</b-table-column>

            <b-table-column label="Price" width="200">{{ props.row.menuPrice }}</b-table-column>

            <b-table-column label="Category" width="0">{{ props.row.categoryName }}</b-table-column>
          </template>
        </b-table>
      </div>

      <span id="AddEditDelete">
        <!-- Add Button -->
        <v-layout id="layoutAdd">
          <v-flex xs2>
            <v-dialog v-model="dialogAdd" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Add Menu</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add Menu</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <div>
                        <img :src="image" width="100px" height="100px">
                      </div>
                      <b-field class="file">
                        <b-upload v-model="image" v-on:input="onFileChange">
                          <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Click to upload</span>
                          </a>
                        </b-upload>
                      </b-field>
                      <v-flex xs7 sm6>
                        <v-text-field label="Menu Name" v-model="menuName" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Menu Price" v-model="menuPrice" required></v-text-field>
                      </v-flex>
                      <v-select
                        label="Select Category"
                        v-model="selectedItem"
                        :items="category"
                        item-text="categoryName"
                        item-value="categoryId"
                      ></v-select>
                    </v-layout>
                  </v-container>
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
        <!-- Edit Button -->
        <v-layout id="layoutEdit">
          <v-flex xs2>
            <v-dialog v-model="dialogEdit" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on" @click="categorySelected">Edit Menu</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Edit Menu</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs5 sm3>
                        <div v-if="image==null">
                          <img :src="selected.menuPathImage" width="80px" height="80px">
                        </div>
                        <div v-else>
                          <img :src="image" width="80px" height="80px">
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
                        <v-text-field label="Menu Name" v-model="selected.menuName" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Menu Price" v-model="selected.menuPrice" required></v-text-field>
                      </v-flex>
                      <v-select
                        label="Select Category"
                        v-model="selectedItem"
                        :items="category"
                        item-text="categoryName"
                        item-value="categoryId"
                      ></v-select>
                    </v-layout>
                  </v-container>
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
        <!-- Delete Button -->
        <v-layout id="layoutDel">
          <v-flex xs2>
            <v-btn color="primary" dark @click="confirmDelete">Delete Menu</v-btn>
          </v-flex>
        </v-layout>
      </span>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
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
      keyword: "",

      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,

      imageForUpload: null,
      image: null,
      checkCategory: false,
      selectedCategory: "",
      file: null,
      dialogAdd: false,
      dialogEdit: false,
      selectedItem: {
        categoryId: "",
        categoryName: ""
      },
      categoryName: "",
      menuId: "",
      menuName: "",
      menuPrice: "",
      pathImage: null,
      restaurantId: this.$store.getters.restaurantId,
      category: [],
      menu: [],
      selected: {}
    };
  },
  methods: {
    printselected() {
      for (let index = 0; index < this.menu.length; index++) {
        if (this.menu[i].menuId === this.selected.menuId) {
          this.menu[i].menuPathImage = this.pathImage;
        }
      }
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
    categorySelected() {
      this.selectedItem = this.selected.categoryId;
      console.log(this.selected.menuPathImage);
    },
    confirmDelete() {
      this.$dialog.confirm({
        title: "Privacy Politics",
        message: "จะลบจริงอ่อ",
        cancelText: "Disagree",
        confirmText: "Agree",
        type: "is-success",
        onConfirm: () => {
          axios.delete(
            "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/deletemenu/" +
              this.selected.menuId +
              "/" +
              this.$store.getters.restaurantId
          );
          this.menu = this.arrayRemove(this.menu, this.selected);
          this.$toast.open("delete success");
        }
      });
    },
    confirmAdd() {
      for (let index = 0; index < this.category.length; index++) {
        if (this.selectedItem === this.category[index].categoryId) {
          this.categoryName = this.category[index].categoryName;
        }
      }
      if (this.imageForUpload != null) {
        var formData = new FormData();
        formData.append("file", this.imageForUpload);
        axios
          .post(
            "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/uploadFB",
            formData
          )
          .then(response => {
            let data = response.data;
            this.pathImage = data.url;
            axios
              .post(
                "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/insertmenu",
                {
                  menuName: this.menuName,
                  menuPrice: this.menuPrice,
                  categoryId: this.selectedItem,
                  menuPathImage: this.pathImage,
                  restaurantId: this.$store.getters.restaurantId
                }
              )
              .then(response => {
                this.menuId = response.data[0];
                this.menu.push({
                  menuId: this.menuId,
                  menuName: this.menuName,
                  menuPrice: this.menuPrice,
                  categoryId: this.selectedItem,
                  categoryName: this.categoryName,
                  menuPathImage: this.pathImage,
                  restaurantId: this.$store.getters.restaurantId
                });
              });
          });
      } else {
        axios
          .post(
            "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/insertmenu",
            {
              menuName: this.menuName,
              menuPrice: this.menuPrice,
              categoryId: this.selectedItem,
              menuPathImage: this.pathImage,
              restaurantId: this.$store.getters.restaurantId
            }
          )
          .then(response => {
            this.menuId = response.data[0];
            this.menu.push({
              menuId: this.menuId,
              menuName: this.menuName,
              menuPrice: this.menuPrice,
              categoryId: this.selectedItem,
              categoryName: this.categoryName,
              menuPathImage: this.pathImage,
              restaurantId: this.$store.getters.restaurantId
            });
          });
      }
      this.dialogAdd = false;
    },
    confirmEdit() {
      if (this.image === null) {
        axios.put(
          "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/updatemenu/",
          {
            menuId: this.selected.menuId,
            menuName: this.selected.menuName,
            menuPrice: this.selected.menuPrice,
            menuPathImage: this.selected.menuPathImage,
            categoryId: this.selectedItem,
            restaurantId: this.$store.getters.restaurantId
          }
        );
      } else {
        var formData = new FormData();
        formData.append("file", this.imageForUpload);
        axios
          .post(
            "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/uploadFB",
            formData
          )
          .then(response => {
            let data = response.data;
            this.pathImage = data.url;
            for (let index = 0; index < this.menu.length; index++) {
              if (this.menu[index].menuId === this.selected.menuId) {
                this.menu[index].menuPathImage = this.pathImage;
              }
            }
            axios.put(
              "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/updatemenu/",
              {
                menuId: this.selected.menuId,
                menuName: this.selected.menuName,
                menuPrice: this.selected.menuPrice,
                menuPathImage: this.pathImage,
                categoryId: this.selectedItem,
                restaurantId: this.$store.getters.restaurantId
              }
            );
          });
      }
      console.log(this.selected);
      this.$toast.open("edit success");
      this.dialogEdit = false;
    },
    arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele != value;
      });
    },
    changeCategoryMenu() {
      axios
        .get(
          "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/getmenubycategory/" +
            this.selectedCategory.categoryId +
            "/" +
            this.$store.getters.restaurantId
        )
        .then(response => {
          this.menu = response.data;
        });
      this.checkCategory = true;
    },
    allcategory() {
      axios
        .get(
          "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/getallmenu/"+this.$store.getters.restaurantId
        )
        .then(response => {
          this.menu = response.data;
        });
      this.checkCategory = false;
    },
    closeDialog() {
      this.selectedItem = null;
      this.pathImage = null;
      this.menuName = null;
      this.menuPrice = null;
      this.menuId = null;
      this.image = null;
      this.imageForUpload = null;
      this.dialogAdd = false;
      this.dialogEdit = false;
    }
  },
  computed: {
    items() {
      if (this.keyword != "") {
        return this.menu.filter(
          items =>
            items.menuName.toLowerCase().includes(this.keyword.toLowerCase()) ||
            items.categoryName
              .toLowerCase()
              .includes(this.keyword.toLowerCase()) ||
            items.menuPrice.toString().includes(this.keyword.toLowerCase())
        );
      } else {
        return this.menu;
      }
    }
  },
  created: function() {
    axios
      .get(
        "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/getallmenu/"+this.$store.getters.restaurantId
      )
      .then(response => {
        this.menu = response.data;
        this.selected = response.data[0];
      });
    axios
      .get(
        "http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/getcategory/"+this.$store.getters.restaurantId
      )
      .then(response => {
        this.category = response.data;
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
  background-attachment: fixed;  
  width: 1180px;
  height: 52em;
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
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 30px;
}
#layoutDel {
  margin-left: 600px;
  margin-top: 0px;
  position: absolute;
}
#layoutEdit {
  margin-left: 400px;
  margin-top: 0px;
  position: absolute;
}
#layoutAdd {
  margin-left: 200px;
  margin-top: 0px;
  position: absolute;
}
#table {
  margin-left: 50px;
  margin-right: 50px;
}
.div.img-resize {
  width: 32px;
  height: 32px;
  overflow: hidden;
  text-align: center;
}
div.img-resize img {
  width: auto;
  height: 40px;
}
</style>
