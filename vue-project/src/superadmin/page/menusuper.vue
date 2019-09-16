<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">MENU</v-card-title>
          <b-table
            :data="menuData"
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
                <v-dialog max-width="490" v-model="addDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Add Menu
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="MenuName"
                            v-model="newMenu.menuName"
                            :rules="nameRules"
                          ></v-text-field>
                          <v-text-field
                            label="MenuPrice"
                            type="number"
                            suffix="Baht"
                            v-model="newMenu.menuPrice"
                            :rules="priceRules"
                          ></v-text-field>
                          <v-text-field
                            label="MenuPathImage"
                            v-model="newMenu.menuPathImage"
                            :rules="pathRules"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantId"
                            type="number"
                            v-model="newMenu.restaurantId"
                            :rules="resIdRules"
                          ></v-text-field>
                          <v-text-field
                            label="CategoryId"
                            type="number"
                            v-model="newMenu.categoryId"
                            :rules="catIdRules"
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
                      Edit Menu
                      <v-form v-for="menu in checkedRows" :key="menu.menuId">
                        <v-container>
                          <v-text-field label="MenuId" disabled v-model="menu.menuId"></v-text-field>
                          <v-text-field label="MenuName" v-model="menu.menuName" :rules="nameRules"></v-text-field>
                          <v-text-field
                            label="MenuPrice"
                            v-model="menu.menuPrice"
                            :rules="priceRules"
                          ></v-text-field>
                          <v-text-field
                            label="MenuPathImage"
                            v-model="menu.menuPathImage"
                            :rules="pathRules"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantId"
                            v-model="menu.restaurantId"
                            :rules="resIdRules"
                          ></v-text-field>
                          <v-text-field
                            label="CategoryId"
                            v-model="menu.categoryId"
                            :rules="catIdRules"
                          ></v-text-field>
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
                <v-btn color="primary" dark class="clear" @click="clickDelete">Delete</v-btn>
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
  name: "menusuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      newMenu: [],
      addDialog: false,
      nameRules: [
        v => !!v || "Menu name is required",
        v => (v && v.length <= 15) || "Max 15 characters"
      ],
      pathRules: [v => !!v || "Path Image is required"],
      priceRules: [v => !!v || "Price is required"],
      resIdRules: [v => !!v || "Restaurant Id is required"],
      catIdRules: [v => !!v || "Category Id is required"],

      //Edit
      editDialog: false,

      menuData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "menuId",
          label: "Id",
          width: "40",
          numeric: true
        },
        {
          field: "menuName",
          label: "Name"
        },
        {
          field: "menuPrice",
          label: "Price"
        },
        {
          field: "menuPathImage",
          label: "Path Image"
        },
        {
          field: "restaurantId",
          label: "Restaurant Id"
        },
        {
          field: "categoryId",
          label: "Category Id"
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
    addCancel() {
      this.addDialog = false;
      this.newMenu = [];
    },
    addSave() {
      if (this.$refs.form.validate()) {
        console.log(this.newMenu);
        axios
          .post("http://localhost:3000/api/insertmenu", {
            menuId: this.newMenu.menuId,
            menuName: this.newMenu.menuName,
            menuPrice: this.newMenu.menuPrice,
            menuPathImage: this.newMenu.menuPathImage,
            restaurantId: this.newMenu.restaurantId,
            categoryId: this.newMenu.categoryId
          })
          .then(response => {
            this.reMenu();
            this.newMenu = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    editSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put("http://localhost:3000/api/updateMenu/", this.checkedRows[index])
          .then(() => {
            this.reMenu();
          });
      }
      this.checkedRows = [];
      this.editDialog = false;
    },
    reMenu() {
      axios.get("http://localhost:3000/api/getallMenu").then(response => {
        this.billData = response.data;
      });
    },
    clickDelete() {
      console.log(this.checkedRows);
      if (this.checkedRows != null) {
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
                  "http://localhost:3000/api/deleteMenu/" +
                    this.checkedRows[index].menuId +
                    "/" +
                    this.checkedRows[index].restaurantId
                )
                .then(() => {
                  this.reMenu();
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
    reMenu() {
      axios.get("http://localhost:3000/api/getallmenu").then(response => {
        this.menuData = response.data;
      });
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallmenu").then(response => {
      this.menuData = response.data;
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
  height: 800px;
  padding: 2%;
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
