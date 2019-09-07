<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">POSITION</v-card-title>
          <b-table
            :data="positionData"
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
                <v-btn color="primary" dark @click="addDialog=true" class="add">Add</v-btn>
                <v-dialog v-model="addDialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Add Position
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="PositionName"
                            type="String"
                            v-model="newPo.positionName"
                            :rules="nameRules"
                          ></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="addDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Edit-->
            <v-layout id="layoutEdit">
              <v-flex xs2>
                <v-btn color="primary" dark @click="editDialog=true" class="add">Edit</v-btn>
                <v-dialog v-model="editDialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Edit Position
                      <v-form>
                        <v-container v-for="position in checkedRows" :key="position.positionId">
                          <v-text-field label="PositionId" v-model="position.positionId" disabled></v-text-field>
                          <v-text-field label="PositionName" v-model="position.positionName"></v-text-field>
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
                <v-btn color="primary" dark @click="clickDelete" class="clear">Delete</v-btn>
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
  name: "positionsuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      newPo: [],
      addDialog: false,
      nameRules: [v => !!v || "Position name is required"],

      //Edit
      editDialog: false,
      positionData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "positionId",
          label: "positionId",
          width: "40",
          numeric: true
        },
        {
          field: "positionName",
          label: "positionName"
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
        console.log(this.newPo);
        axios
          .post("http://localhost:3000/api/insertPosition", {
            positionId: this.newPo.positionId,
            positionName: this.newPo.positionName,
          })
          .then(response => {
            this.rePosition();
            this.newPo = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    addCancel() {
      this.addDialog = false;
      this.newPo = [];
    },
    editSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updatePosition/",
            this.checkedRows[index]
          )
          .then(() => {
            this.rePosition();
          });
      }
      this.editDialog = false;
    },
    rePosition() {
      axios
        .get("http://localhost:3000/api/getallposition")
        .then(response => {
          this.positionData = response.data;
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
                  "http://localhost:3000/api/deletePosition/" +
                    this.checkedRows[index].positionId
                )
                .then(() => {
                  this.rePosition();
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
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallposition").then(response => {
      this.positionData = response.data;
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
