<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">STATUS</v-card-title>
          <b-table
            :data="statusData"
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
                      Add Employee
                      <v-form>
                        <v-container fluid>
                          <v-text-field
                            label="StatusName"
                            v-model="newStatus.statusName"
                            type="text"
                            :rules="nameRules"
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
                      Edit Employee
                      <v-form v-for="Edit in checkedRows" :key="Edit.statusId">
                        <v-container>
                          <v-text-field label="StatusId" v-model="Edit.statusId" disabled></v-text-field>
                          <v-text-field
                            label="StatusName"
                            v-model="Edit.statusName"
                            :rules="nameRules"
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
  name: "statussuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      AddDialog: false,
      newStatus: [],
      nameRules: [v => !!v || "Name is required"],
      //Edit
      EditDialog: false,
      nameRules: [v => !!v || "Name is required"],
      //Delete
      statusData: [],
      isPaginated: true,
      perPage: 10,
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "statusId",
          label: "statusId",
          width: "40",
          numeric: true
        },
        {
          field: "statusName",
          label: "statusName"
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
      this.newStatus = [];
    },
    addSave() {
      console.log(this.newStatus);
      axios
        .post("http://localhost:3000/api/insertStatus", {
          statusName: this.newStatus.statusName
        })
        .then(response => {
          this.reStatus();
          this.newStatus = [];
        });
      this.AddDialog = false;
    },
    EditSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updatestatus/",
            this.checkedRows[index]
          )
          .then(() => {
            this.reStatus();
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
                  "http://localhost:3000/api/deletestatus/" +
                    this.checkedRows[index].statusId
                )
                .then(() => {
                  this.reStatus();
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
    reStatus() {
      axios.get("http://localhost:3000/api/getallstatus").then(response => {
        this.statusData = response.data;
      });
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallstatus").then(response => {
      this.statusData = response.data;
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
