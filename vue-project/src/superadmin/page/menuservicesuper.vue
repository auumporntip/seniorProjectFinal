<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">MENU SERVICE</v-card-title>
          <b-table
            :data="menuSerData"
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
                      Add Menuservice
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="TypeId"
                            type="number"
                            v-model="newMs.typeId"
                            :rules="typeIdRules"
                          ></v-text-field>
                          <v-text-field
                            label="MenuId"
                            type="number"
                            v-model="newMs.menuId"
                            :rules="menuIdRules"
                          ></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="addDialog=true">Cancel</v-btn>
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
                      Edit Menuservice
                      <v-form v-for="ms in checkedRows" :key="ms.menuServiceId">
                        <v-container>
                          <v-text-field label="menuServiceId" v-model="ms.menuServiceId" disabled></v-text-field>
                          <v-text-field label="TypeId" v-model="ms.typeId"></v-text-field>
                          <v-text-field label="MenuId" v-model="ms.menuId"></v-text-field>
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
  name: "menuservicesuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      newMs: [],
      addDialog: false,
      typeIdRules: [v => !!v || "Type ID is required"],
      menuIdRules: [v => !!v || "Menu ID is required"],

      //Edit
      editDialog: false,

      menuSerData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "menuServiceId",
          label: "menuServiceId",
          width: "40",
          numeric: true
        },
        {
          field: "typeId",
          label: "typeId"
        },
        {
          field: "menuId",
          label: "menuId"
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
        console.log(this.newMs);
        axios
          .post("http://localhost:3000/api/insertMenuService", {
            menuServiceId: this.newMs.menuServiceId,
            typeId: this.newMs.typeId,
            menuId: this.newMs.menuId
          })
          .then(response => {
            this.reMenuService();
            this.newMs = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    addCancel() {
      this.addDialog = false;
      this.$refs.form.resetValidation();
      this.newMs = [];
    },
    editSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updateMenuService/",
            this.checkedRows[index]
          )
          .then(() => {
            this.reMenuService();
          });
      }
      this.editDialog = false;
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
                  "http://localhost:3000/api/deleteMenuService/" +
                    this.checkedRows[index].menuServiceId
                )
                .then(() => {
                  this.reMenuService();
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
    reMenuService() {
      axios
        .get("http://localhost:3000/api/getAllMenuService")
        .then(response => {
          this.menuSerData = response.data;
        });
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallmenuservice").then(response => {
      this.menuSerData = response.data;
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
