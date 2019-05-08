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
        :data="menu"
        :columns="columns"
        :selected.sync="selected"
        focusable
        class="elevation-1"
      ></b-table>
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
                  <v-btn color="blue darken-1" flat @click="dialogAdd = false">Close</v-btn>
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
                        <img :src="selected.menuPathImage" width="80px" height="80px">
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
                  <v-btn color="blue darken-1" flat @click="dialogEdit = false">Close</v-btn>
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

export default {
  name: "MenuPage",
  components: {
    Header,
    sidebar
  },
  data() {
    return {
      imageForUpload:null,
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
      menuId: "",
      menuName: "",
      menuPrice: "",
      pathImage: "",
      restaurantId: "1",
      category: [],
      menu: [],
      selected: {},
      columns: [
        {
          field: "menuId",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "menuName",
          label: "Menu"
        },
        {
          field: "menuPrice",
          label: "Price"
        },
        {
          field: "categoryName",
          label: "cat"
        }
      ]
    };
  },
  methods: {
    onFileChange() {
      this.imageForUpload=this.image
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
      console.log(this.selected.menuPathImage)
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
            "http://localhost:3000/api/deletemenu/" +
              this.selected.menuId +
              "/" +
              this.selected.restaurantId
          );
          this.menu = this.arrayRemove(this.menu, this.selected);
          this.$toast.open("delete success");
        }
      });
    },
    confirmAdd() {
      var formData = new FormData();
      formData.append("file", this.imageForUpload);
      axios
        .post("http://localhost:3000/api/uploadFB", formData)
        .then(response => {
          let data = response.data
          this.pathImage = data.url;

          var categoryName = "";
          for (let index = 0; index < this.category.length; index++) {
            if (this.selectedItem === this.category[index].categoryId) {
              categoryName = this.category[index].categoryName;
            }
          }
          axios
            .post("http://localhost:3000/api/insertmenu", {
              menuName: this.menuName,
              menuPrice: this.menuPrice,
              categoryId: this.selectedItem,
              menuPathImage: this.pathImage,
              restaurantId: this.restaurantId
            })
            .then(response => {
              this.menuId = response.data[0];
              this.menu.push({
                menuId: this.menuId,
                menuName: this.menuName,
                menuPrice: this.menuPrice,
                categoryId: this.selectedItem,
                categoryName: categoryName,
                menuPathImage: this.pathImage,
                restaurantId: this.restaurantId
              });
              this.selectedItem=''
              this.pathImage=''
              this.menuName=''
              this.menuPrice=''
              this.menuId=''
              this.image=''
            });
          this.dialogAdd = false;
        });
    },
    confirmEdit() {
      axios.put("http://localhost:3000/api/updatemenu/", {
        menuId: this.selected.menuId,
        menuName: this.selected.menuName,
        menuPrice: this.selected.menuPrice,
        menuPathImage: this.selected.menuPathImage,
        categoryId: this.selectedItem,
        restaurantId: this.selected.restaurantId
      });
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
          "http://localhost:3000/api/getmenubycategory/" +
            this.selectedCategory.categoryId +
            "/" +
            1
        )
        .then(response => {
          this.menu = response.data;
        });
      this.checkCategory = true;
    },
    allcategory() {
      axios.get("http://localhost:3000/api/getallmenu/1").then(response => {
        this.menu = response.data;
      });
      this.checkCategory = false;
    }
  },
  created: function() {
    axios.get("http://localhost:3000/api/getallmenu/1").then(response => {
      this.menu = response.data;
      this.selected = response.data[0];
    });
    axios.get("http://localhost:3000/api/getcategory/1").then(response => {
      this.category = response.data;
    });
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
#layoutDel {
  margin-left: 600px;
  margin-top: 20px;
  position: absolute;
}
#layoutEdit {
  margin-left: 400px;
  margin-top: 20px;
  position: absolute;
}
#layoutAdd {
  margin-left: 200px;
  margin-top: 20px;
  position: absolute;
}
</style>
