<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">TYPE OF RESTAURANT</v-card-title>
          <b-table
            :data="typeOfResData"
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
                <v-btn color="primary" dark class="add" @click="AddDialog=true">Add</v-btn>
                <v-dialog v-model="AddDialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Add TypeOfRestaurant
                      <v-form>
                        <v-container fluid>
                          <v-text-field
                            label="TypeResName"
                            v-model="newType.typeResName"
                            type="text"
                            :rules="TypeResRules"
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
                <v-btn color="primary" dark class="add" @click="EditDialog=true">Edit</v-btn>
                <v-dialog max-width="490" v-model="EditDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Edit TypeOfRestaurant
                      <v-form v-for="Edit in checkedRows" :key="Edit.typeResId">
                        <v-container>
                          <v-text-field label="TypeResId" v-model="Edit.typeResId" disabled></v-text-field>
                          <v-text-field
                            label="TypeResName"
                            v-model="Edit.typeResName"
                            type="text"
                            :rules="TypeResRules2"
                          ></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="EditDialog=false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="EditSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Delete-->
            <v-layout>
              <v-flex xs2>
                <v-btn color="primary" dark @click="deleteClick">Delete</v-btn>
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
  name: "typeofressuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      AddDialog: false,
      newType: [],
      TypeResRules: [v => !!v || "Type Restaurant Name is required"],
      //Edit
      EditDialog: false,
      TypeResRules2: [v => !!v || "Type Restaurant Name is required"],
      //Delete
      typeOfResData: [],
      isPaginated: true,
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "typeResId",
          label: "typeResId",
          width: "40",
          numeric: true
        },
        {
          field: "typeResName",
          label: "typeResName"
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
      this.AddDialog = false;
      this.newType = [];
    },
    addSave() {
      console.log(this.newType);
      axios
        .post("http://localhost:3000/api/inserttypeofres", {
          typeResName: this.newType.typeResName
        })
        .then(response => {
          this.reType();
          this.newType = [];
        });
      this.AddDialog = false;
    },
    EditSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updatetypeofrestaurant/",
            this.checkedRows[index]
          )
          .then(() => {
            this.reType();
          });
      }
      this.EditDialog = false;
    },
    deleteClick() {
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
                  "http://localhost:3000/api/deletetypeofrestaurant/" +
                    this.checkedRows[index].typeResId
                )
                .then(() => {
                  this.reType();
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
    reType() {
      axios
        .get("http://localhost:3000/api/getalltypeofrestaurant")
        .then(response => {
          this.typeOfResData = response.data;
        });
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/getalltypeofrestaurant")
      .then(response => {
        this.typeOfResData = response.data;
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
