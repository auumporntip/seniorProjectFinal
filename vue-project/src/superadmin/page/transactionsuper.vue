<template>
  <div>
    <Header></Header>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section>
        <b-tabs>
          <b-tab-item label="Table">
            <b-table
              :data="transData"
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
          </b-tab-item>

          <span id="Addeditdelete">
            <!--Add-->
            <v-layout id="layoutAdd">
              <v-flex xs2>
                <v-btn color="primary" dark class="add" @click="AddDialog=true">Add</v-btn>
                <v-dialog v-model="AddDialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Add Transaction
                      <v-form>
                        <v-container fluid>
                          <v-text-field
                            label="TransPrice"
                            v-model="newTrans.transPrice"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="nameRules"
                          ></v-text-field>
                          <v-text-field
                            label="NumOfTrans"
                            v-model="newTrans.numOfTrans"
                            type="number"
                            :rules="numberRules"
                          ></v-text-field>
                          <v-text-field label="TransDate" v-model="newTrans.transDate" type="date"></v-text-field>
                          <v-text-field label="MenuId" v-model="newTrans.menuId" type="number" :rules="menuIdRules"></v-text-field>
                          <v-text-field label="StatusId" v-model="newTrans.statusId" type="number"  :rules="statusIdRules"></v-text-field>
                          <v-text-field label="BillId" v-model="newTrans.billId" type="number"  :rules="billIdRules"></v-text-field>
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
                      Edit Transaction
                      <v-form v-for="Edit in checkedRows" :key="Edit.transId">
                        <v-container>
                          <v-text-field label="TransId" v-model="Edit.transId" disabled></v-text-field>
                          <v-text-field
                            label="TransPrice"
                            v-model="Edit.transPrice"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="transRules"
                          ></v-text-field>
                          <v-text-field label="NumOfTrans" v-model="Edit.numOfTrans" type="number" :rules="numOfTransRules"></v-text-field>
                          <v-text-field label="TransDate" v-model="Edit.transDate" ></v-text-field>
                          <v-text-field label="MenuId" v-model="Edit.menuId" type="number" :rules="menuIdRules">></v-text-field>
                          <v-text-field label="StatusId" v-model="Edit.statusId" type="number" :rules="statusIdRules">></v-text-field>
                          <v-text-field label="BillId" v-model="Edit.billId" type="number" :rules="billIdRules">></v-text-field>
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
            <v-layout id="layoutDelete">
              <v-flex xs2>
                <v-btn color="primary" dark @click="deleteClick">Delete</v-btn>
              </v-flex>
            </v-layout>
          </span>
          <b-tab-item label="Checked rows">
            <pre>{{ checkedRows }}</pre>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebarsuper from "@/superadmin/component/sidebarsuper";
import axios from "axios";

export default {
  name: "transactionsuper",
  components: {
    Header,
    sidebarsuper
  },
  data() {
    return {
      //Add
      AddDialog: false,
      newTrans: [],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 5) || "Name must be less than 5 characters"
      ],
      numberRules: [
        v => !!v || "number is required",
        v => (v && v.length <= 5) || "number must be less than 5 characters"
      ],
      menuIdRules:[
        v => !!v || "menuId is required",
        v => (v && v.length <= 5) || "menuId must be less than 5 characters"
      ],
      statusIdRules:[
        v => !!v || "statusId is required",
        v => (v && v.length <= 5) || "statusId must be less than 5 characters"
      ],
      billIdRules:[
        v => !!v || "billId is required",
        v => (v && v.length <= 5) || "billId must be less than 5 characters"
      ],
      //Edit
      EditDialog: false,
      transRules: [
        v => !!v || "Transaction is required",
        v => (v && v.length <= 5) || "Transaction must be less than 5 characters"
      ],
      numOfTransRules:[
        v => !!v || "Number of Transaction is required",
        v => (v && v.length <= 5) || "Number of Transaction must be less than 5 characters"
      ],
      menuIdRules: [
        v => !!v || "MenuId is required",
        v => (v && v.length <= 5) || "MenuId must be less than 5 characters"
      ],
      statusIdRules: [
        v => !!v || "StatusId is required",
        v => (v && v.length <= 5) || "StatusId must be less than 5 characters"
      ],
      billIdRules: [
        v => !!v || "BillId is required",
        v => (v && v.length <= 5) || "BillId must be less than 5 characters"
      ],
      //Delete
      transData: [],
      isPaginated: true,
      perPage: 10,
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "transId",
          label: "transId",
          width: "40",
          numeric: true
        },
        {
          field: "transPrice",
          label: "transPrice"
        },
        {
          field: "numOfTrans",
          label: "numOfTrans"
        },
        {
          field: "transDate",
          label: "transDate"
        },
        {
          field: "menuId",
          label: "menuId"
        },
        {
          field: "statusId",
          label: "statusId"
        },
        {
          field: "billId",
          label: "billId"
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
      this.newTrans = [];
    },
    addSave() {
      console.log(this.newTrans);
      this.AddDialog = false;
      this.newTrans = [];
    },
    EditSave() {
      console.log(this.checkedRows);
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
                  "http://localhost:3000/api/deletetransaction" +
                    this.checkedRows[index].transId
                )
                .then(() => {
                  this.refreshAccount();
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
    refreshAccount() {
      axios.get("http://localhost:3000/api/getallaccount").then(response => {
        this.transData = response.data;
      });
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getalltransaction").then(response => {
      this.transData = response.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bigbox {
  background-color: #f0cab1;
  width: 1170px;
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;
}
#Addeditdelete {
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  float: center;
}
#layoutDelete {
  margin-left: 600px;
  margin-top: 0px;
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
</style>
