<template>
  <div>
    <div class="text-xs-center" id="addBtn">
      <v-menu v-model="categoryBtn" :close-on-content-click="false" :nudge-width="200" offset-x>
        <template v-slot:activator="{ on }">
          <v-btn color="black" outline dark v-on="on">
            <v-icon left dark>menu</v-icon>Category
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-tile>
              <v-btn color="black" @click="AddDialog=true" flat>
                <v-icon left dark>add</v-icon>Add Category
              </v-btn>
            </v-list-tile>

            <v-list-tile>
              <v-btn color="black" @click="editDataDialog=true" flat>
                <v-icon left dark>edit</v-icon>Edit Category
              </v-btn>
            </v-list-tile>

            <v-list-tile>
              <v-btn color="black" @click="delDataDialog=true" flat>
                <v-icon left dark>delete</v-icon>Delete Category
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </div>

    <!-- add category -->
    <v-layout>
      <v-flex xs2>
        <!-- <v-btn color="black" outline @click="AddDialog=true" class="addBtn">Add Category</v-btn> -->
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
              <v-btn color="red darken-1" flat @click="addCancel">CLOSE</v-btn>
              <v-btn color="blue darken-1" flat @click="addSave">SAVE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <!-- editCategory -->
    <v-layout>
      <v-flex xs2>
        <v-dialog v-model="editDataDialog" max-width="450">
          <v-card>
            <v-card-text>
              <b-table
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
              </b-table>

              <v-btn color="black darken-1" outline @click="editDialog=true">
                <v-icon left dark>edit</v-icon>EDIT CATEGORY
              </v-btn>
              <v-dialog max-width="390" v-model="editDialog">
                <v-card>
                  <v-card-text class="headline">
                    Edit Category
                    <v-form v-for="cat in checkedRows" :key="cat.categoryId">
                      <v-container>
                        <v-text-field label="CategoryId" disabled v-model="cat.categoryId"></v-text-field>
                        <v-text-field label="CategoryName" v-model="cat.categoryName"></v-text-field>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="editDialog=false">CANCEL</v-btn>
                    <v-btn color="blue darken-1" flat @click="editSave">SAVE</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="editDataDialog=false">CLOSE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <!-- delete -->
    <v-layout>
      <v-flex xs2>
        <v-dialog v-model="delDataDialog" max-width="450">
          <v-card>
            <v-card-text>
              <b-table
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
              </b-table>

              <v-btn color="black darken-1" outline @click="dialog = true">
                <v-icon left dark>delete</v-icon>DELETE CATEGORY
              </v-btn>
              <div>
                <div v-if="checkedRows > '0'">
                  <v-row justify="center">
                    <!-- <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog</v-btn> -->

                    <v-dialog v-model="dialog" max-width="290">
                      <v-card>
                        <!-- <v-card-title class="headline"></v-card-title> -->
                        <v-card-text>Are you sure you want to delete?</v-card-text>
                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="blue darken-1" flat @click="dialog = false">CANCEL</v-btn>
                          <v-btn color="red darken-1" flat @click="onConfirm">DELETE</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
                <div v-else>
                  <v-row justify="center">
                    <!-- <v-btn color="primary" dark @click.stop="dialog = true">Open Dialog</v-btn> -->
                    <v-dialog v-model="dialog" max-width="290">
                      <v-card>
                        <v-card-title class="headline">Error</v-card-title>
                        <v-card-text>Please selected some menu row</v-card-text>
                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="blue darken-1" flat @click="dialog = false">CLOSE</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
              </div>
            </v-card-text>
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
        v => this.checkName || "Name has already"
      ],
      restaurantId: 1,

      //edit
      editDataDialog: false,
      editDialog: false,
      category: [],
      checkboxPosition: "left",
      checkedRows: [],
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,
      columns: [
        {
          field: "categoryId",
          label: "categoryId",
          width: "40",
          numeric: true
        },
        {
          field: "categoryName",
          label: "categoryName"
        }
      ],

      //delete
      delDataDialog: false
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
          .post("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/insertCategory", {
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
    editSave() {
      console.log(this.checkedRows);
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/updatecategory",
            this.checkedRows[index]
          )
          .then(() => {
            this.reCat();
            axios
              .get("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/getallmenu/" + 1)
              .then(response => {
                this.$store.commit("setMenu", response.data);
              });
          });
      }
      this.checkedRows = [];
      this.editDialog = false;
    },

    onConfirm() {
      for (let index = 0; index < this.checkedRows.length; index++) {

      console.log(this.checkedRows)
        axios
          .delete(
            "http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/deletecategory/" +
              this.checkedRows[index].categoryId
          )
          .then(() => {
            this.reCat();
            this.delDataDialog = false;
          });
      }
    },
    // catDelete() {
    //   console.log(this.checkedRows);
    //   if (this.checkedRows != "") {
    //     this.$dialog.confirm({
    //       title: "Privacy Politics",
    //       message: "Are you sure you want to delete?",
    //       cancelText: "Disagree",
    //       confirmText: "Agree",
    //       type: "is-success",
    //       onConfirm: () => {
    //         for (let index = 0; index < this.checkedRows.length; index++) {
    //           axios
    //             .delete(
    //               "http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/deletecategory/" +
    //                 this.checkedRows[index].categoryId
    //             )
    //             .then(() => {
    //               this.reCat();
    //             });
    //         }

    //         this.$toast.open("delete success");
    //       }
    //     });
    //   } else {
    //     this.$dialog.alert({
    //       title: "Error",
    //       message: "Please selected some menu row",
    //       type: "is-warning"
    //     });
    //   }
    // },
    reCat() {
      axios.get("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/getallcategory").then(response => {
        this.category = response.data;
      });
    }
  },
  computed: {
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
    axios.get("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/getcategory/" + 1).then(response => {
      this.category = response.data;
    });
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
#addBtn {
  margin-top: -6%;
  margin-left: -85%;
}
</style>
