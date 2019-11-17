<template>
  <div>
    <div class="text-xs-center" id="addBtn">
      <v-dialog v-model="categoryBtn" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn color="#B7CDC2" v-on="on" style="margin-top:0.39%;">
            <v-icon left dark>menu</v-icon>Category
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="nameDialog">Category</span>
            <v-icon style="padding-left:73%; margin-top:-3%;" @click="categoryBtn=false">close</v-icon>
            <v-text-field
              class="search"
              v-model="keyword"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <b-table
            :data="items"
            :checked-rows.sync="checkedRows"
            :is-row-checkable="(row) => row.id !== 3"
            checkable
            :checkbox-position="checkboxPosition"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            id="tableStyle"
          >
            <template slot-scope="props">
              <b-table-column label="Id" width="100">{{ props.row.categoryId }}</b-table-column>
              <b-table-column label="Category name" width="200">{{ props.row.categoryName }}</b-table-column>
              <b-table-column label="Edit" width="100">
                <!-- edit category -->
                <v-icon @click="editDialog2(props.row)">edit</v-icon>
              </b-table-column>
            </template>
            <template slot="bottom-left">
              <b>&nbsp;&nbsp;Total checked</b>
              : {{ checkedRows.length }}
            </template>
          </b-table>
          <v-btn color="#B7CDC2" @click="AddDialog=true" class="addDialog">
            <v-icon left dark>add</v-icon>Add Category
          </v-btn>
          <!-- <v-btn color="black" @click="editDialog=true" flat>
            <v-icon left dark>edit</v-icon>Edit Category
          </v-btn>-->
          <v-btn color="#B7CDC2" @click="comfirmDelete()" style="margin-bottom:3%;">
            <v-icon left dark>delete</v-icon>Delete Category
          </v-btn>
        </v-card>
      </v-dialog>
    </div>

    <!-- add category -->
    <v-layout>
      <v-flex xs2>
        <!-- <v-btn color="black" outline @click="AddDialog=true" class="addBtn">Add Category</v-btn>  -->
        <v-dialog v-model="AddDialog" max-width="420">
          <v-card>
            <v-card-text class="nameDialog">
              Add Category
              <v-form ref="form">
                <v-container fluid>
                  <v-text-field
                    type="text"
                    label="Name of category"
                    v-model="newCat.categoryName"
                    :rules="nameRules"
                  ></v-text-field>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#7d7a73" flat @click="addCancel">CANCEL</v-btn>
              <v-btn color="#305378" flat @click="addSave">SAVE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <!-- editCategory -->
    <v-layout>
      <v-flex xs2>
        <v-dialog v-model="editDialog" max-width="450">
          <v-card>
            <v-card-text class="nameDialog">
              Edit Category
              <v-form ref="form1">
                <v-container>
                  <v-text-field label="ID of category" disabled v-model="cat.categoryId"></v-text-field>
                  <v-text-field
                    label="Name of category"
                    v-model="cat.categoryName"
                    :rules="editRules"
                  ></v-text-field>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#7d7a73" flat @click="closeEdit">CANCEL</v-btn>
              <v-btn color="#305378" flat @click="editSave">SAVE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <!-- delete -->
    <v-layout>
      <v-flex xs2>
        <div>
          <v-row justify="center">
            <v-dialog v-model="delDataDialog" max-width="290">
              <v-card>
                <v-card-title class="title" style="margin-bottom:0px">DELETE CONFIRMATION</v-card-title>
                <v-card-text class="confirmDialog">
                  <v-icon color="red">warning</v-icon>you sure you want to delete this employee?
                  You can't undo this action
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="#7d7a73" flat @click="closeDelete()">CANCEL</v-btn>
                  <v-btn color="red" flat @click="onConfirm">DELETE</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
        <!-- </v-card-text> -->
        <!-- </v-card> -->
        <!-- </v-dialog> -->
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs2>
        <!-- <v-dialog v-model="delDataDialog" max-width="450"> -->
        <!-- <v-card> -->
        <!-- <v-card-text> -->
        <!-- <b-table
                :data="category"
                :columns="columns"
                :checked-rows.sync="checkedRows"
                :is-row-checkable="(row) => row.id !== 3"
                checkable
                :checkbox-position="checkboxPosition"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
              >
                <template slot="bottom-left">
                  <b>Total checked</b>
                  : {{ checkedRows.length }}
                </template>
        </b-table>-->

        <!-- <v-btn color="black darken-1" outline @click="dialog = true">
                <v-icon left dark>delete</v-icon>DELETE CATEGORY
        </v-btn>-->
        <!-- <div> -->
        <div>
          <v-row justify="center">
            <!-- <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog</v-btn> -->
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-icon
                  color="red lighten-1"
                  style="font-size:70px; margin-left:1.55em; margin-top: 0.3em;"
                >error</v-icon>
                <v-card-title class="nameDialog1">Error!</v-card-title>
                <v-card-text style="font-size:1.5em;">Please selected some menu row</v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" flat @click="closeDialog()">CLOSE</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
        <!-- </v-card-text> -->
        <!-- </v-card> -->
        <!-- </v-dialog> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../../../store/store";
import { host } from "../../data";

export default {
  name: "CategoryButton",
  store,
  components: {},

  data() {
    return {
      dialog: false,
      categoryBtn: false,

      //Add
      AddDialog: false,
      newCat: [],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && this.checkName()) || "This name has already"
      ],
      editRules: [
        v => !!v || "Name is required",
        v => (v && this.editCheckName()) || "This name has already"
      ],
      restaurantId: 1,

      //edit
      editDataDialog: false,
      editDialog: false,
      category: [],
      cat: [],
      checkboxPosition: "left",
      checkedRows: [],
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,
      editName: "",

      //delete
      delDataDialog: false,

      //search
      keyword: ""
    };
  },
  methods: {
    addCancel() {
      this.AddDialog = false;
      this.$refs.form.resetValidation();
      this.newCat = [];
      this.categoryBtn = true;
    },
    addSave() {
      if (this.$refs.form.validate()) {
        axios
          .post(host + "insertCategory", {
            categoryName: this.newCat.categoryName,
            restaurantId: 1
          })
          .then(response => {
            this.reCat();
            this.newCat = [];
            this.$refs.form.resetValidation();
            this.AddDialog = false;
          });
        this.categoryBtn = true;
      }
    },
    editDialog2(editCategory) {
      this.cat = editCategory;
      this.editDialog = true;
      this.editName = editCategory.categoryName;
    },
    editSave() {
      console.log(this.checkedRows);
      if (this.$refs.form1.validate()) {
        axios
          .put(host + "updatecategory", {
            categoryId: this.cat.categoryId,
            categoryName: this.cat.categoryName
          })
          .then(() => {
            this.$refs.form1.resetValidation();
            this.editDialog = false;
            this.categoryBtn = true;
            this.reCat();
            axios.get(host + "getallmenu/" + 1).then(response => {
              this.$store.commit("setMenu", response.data);
            });
          });
      }
    },

    onConfirm() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        console.log(this.checkedRows);
        axios
          .delete(host + "deletecategory/" + this.checkedRows[index].categoryId)
          .then(response => {
            if (response.data === false) {
              this.$toast.open("cannot delete");
              this.reCat();
              this.checkedRows = [];
              this.delDataDialog = false;
            } else {
              this.$toast.open("delete success");
              this.reCat();
              this.checkedRows = [];
              this.delDataDialog = false;
            }
          });
      }
      this.categoryBtn = true;
    },

    comfirmDelete() {
      if (this.checkedRows.length > 0) {
        this.delDataDialog = true;
      } else {
        this.dialog = true;
      }
    },
    closeEdit() {
      this.reCat();
      this.editDialog = false;
      this.categoryBtn = true;
    },
    closeDelete() {
      this.delDataDialog = false;
      this.categoryBtn = true;
    },
    closeDialog() {
      this.dialog = false;
      this.categoryBtn = true;
    },
    reCat() {
      axios.get(host + "getallcategory").then(response => {
        this.category = response.data;
      });
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

      return true;
    },
    editCheckName() {
      if (this.cat.categoryName.toLowerCase() === this.editName.toLowerCase()) {
        return true;
      } else {
        for (let index = 0; index < this.category.length; index++) {
          if (this.cat.categoryId === this.category[index].categoryId) {
            continue;
          }
          if (
            this.cat.categoryName.toLowerCase() ===
            this.category[index].categoryName.toLowerCase()
          ) {
            return false;
          }
        }
        return true;
      }
    }
  },
  computed: {
    items() {
      if (this.keyword != "") {
        return this.category.filter(items =>
          items.categoryName.toLowerCase().includes(this.keyword.toLowerCase())
        );
      } else {
        return this.category;
      }
    }
  },

  created: function() {
    axios.get(host + "getcategory/" + 1).then(response => {
      this.category = response.data;
    });
  }
};
</script>

<style scoped>
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
#addBtn {
  margin-top: -6%;
  margin-left: -85%;
}
#tableStyle {
  margin: 2%;
}
.confirmDialog {
  padding-top: 0px;
}
.search {
  margin-left: 25%;
  position: absolute;
  margin-top: -1%;
}
.nameDialog {
  margin-top: 1%;
  margin-left: 2%;
  font-size: 2em;
}
.addDialog {
  margin-bottom: 3%;
  overflow-x: hidden;
  margin-left: 3%;
}
.nameDialog1 {
  margin-left: 2%;
  font-size: 2.5em;
  justify-content: center;
  color: rgb(97, 97, 97);
  padding-top: 5%;
}
</style>


