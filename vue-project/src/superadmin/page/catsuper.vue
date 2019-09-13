<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">Category of menu</v-card-title>
          <b-table
            :data="catData"
            :columns="columns"
            :checked-rows.sync="checkedRows"
            :is-row-checkable="(row) => row.id !== 3"
            checkable
            :checkbox-position="checkboxPosition"
          >
            <template slot="bottom-left">
              <b>Total checked</b>
              : {{ checkedRows.length }}
            </template>
          </b-table>
          <span id="Addeditdelete">
            <!--Add-->
            <v-layout>
              <v-flex xs2>
                <v-btn color="primary" dark class="add" @click="addDialog=true">Add</v-btn>
                <v-dialog v-model="addDialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Add Category
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="CategoryName"
                            type="String"
                            v-model="newCat.categoryName"
                            :rules="nameRules"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantId"
                            type="number"
                            v-model="newCat.restaurantId"
                            :rules="idRules"
                          ></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="addCancel">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Edit-->
            <v-layout id="layoutEdit">
              <v-flex xs2>
                <v-btn color="primary" dark class="add" @click="editDialog=true">Edit</v-btn>
                <v-dialog max-width="490" v-model="editDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Edit Category
                      <v-form v-for="cat in checkedRows" :key="cat.categoryId">
                        <v-container>
                          <v-text-field label="CategoryId" disabled v-model="cat.categoryId"></v-text-field>
                          <v-text-field label="CategoryName" v-model="cat.categoryName"></v-text-field>
                          <v-text-field label="RestaurantId" v-model="cat.restaurantId"></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="editDialog=false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="editSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Delete-->
            <v-layout>
              <v-flex xs2>
                <v-btn color="primary" dark class="clear" @click="catDelete">Delete</v-btn>
              </v-flex>
            </v-layout>
          </span>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import sidebarsuper from "@/superadmin/component/sidebarsuper";
import axios from "axios";

export default {
  name: "catsuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      // Add
      addDialog: false,
      newCat: [],
      nameRules: [v => !!v || "Name of category  is required"],
      idRules: [v => !!v || "Restaurant ID is required"],

      //Edit
      editDialog: false,

      catData: [],
      checkboxPosition: "left",
      checkedRows: [],
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
        },
        {
          field: "restaurantId",
          label: "restaurantId"
        },
        {
          field: "created_at",
          label: "created_at"
        },
        {
          field: "update_at",
          label: "update_at"
        }
      ]
    };
  },
  methods: {
    addSave() {
      if (this.$refs.form.validate()) {
        console.log(this.newCat);
        axios
          .post("http://localhost:3000/api/insertBill", {
            categoryId: this.newCat.categoryId,
            categoryName: this.newCat.categoryName,
            restaurantId: this.newCat.restaurantId
          })
          .then(response => {
            this.reCategory();
            this.newCat = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    addCancel() {
      this.addDialog = false;
      this.newCat = [];
    },
    editSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updateCategory/",
            this.checkedRows[index]
          )
          .then(() => {
            this.reCategory();
          });
      }
      this.editDialog = false;
    },
    catDelete() {
      console.log(this.checkedRows);
      if (this.checkedRows != "") {
        this.$dialog.confirm({
          title: "Privacy Politics",
          message: "Are you sure you want to delete?",
          cancelText: "Disagree",
          confirmText: "Agree",
          type: "is-success",
          onConfirm: () => {
            for (let index = 0; index < this.checkedRows.length; index++) {
              axios
                .delete(
                  "http://localhost:3000/api/deletecategory/" +
                    this.checkedRows[index].categoryId
                )
                .then(() => {
                  this.refreshCategory();
                });
            }

            this.$toast.open("delete success");
          }
        });
      } else {
        this.$dialog.alert({
          title: "Error",
          message: "Please selected some menu row",
          type: "is-warning"
        });
      }
    },
    reCategory() {
      axios.get("http://localhost:3000/api/getallcategory").then(response => {
        this.catData = response.data;
      });
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallcategory").then(response => {
      this.catData = response.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background-color: #f0cab1;
  border-radius: 20px;
}
#bigbox {
  background-color: #eeeeee;
  padding: 2%;
  height: 800px;
  margin-top: -800px;
  margin-left: 20%;
  background-attachment: fixed;
}
#Addeditdelete {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
#layoutEdit {
  margin: 0 50px 0 50px;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>
