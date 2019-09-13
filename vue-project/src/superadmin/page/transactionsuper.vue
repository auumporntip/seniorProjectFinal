<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">TRANSACTION</v-card-title>
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

          <span id="Addeditdelete">
            <!--Add-->
            <v-layout>
              <v-flex xs2>
                <v-btn color="primary" dark class="add" @click="AddDialog=true">Add</v-btn>
                <v-dialog v-model="AddDialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Add Transaction
                      <v-form ref="form"> 
                        <v-container fluid>
                          <v-text-field
                            label="menuName"
                            v-model="newTrans.menuName"
                            type="text"
                            :rules="nameRules"
                          ></v-text-field>
                          <v-text-field
                            label="transPrice"
                            v-model="newTrans.transPrice"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="priceRules"
                          ></v-text-field>
                          <v-text-field
                            label="totalPrice"
                            v-model="newTrans.totalPrice"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="totalRules"
                          ></v-text-field>
                          <v-text-field
                            label="amount"
                            v-model="newTrans.amount"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="amountRules"
                          ></v-text-field>
                          <v-text-field
                            label="statusName"
                            v-model="newTrans.statusName"
                            type="text"
                            min="0.1"
                            step="0.1"
                            :rules="statusRules"
                          ></v-text-field>
                          <v-text-field
                            label="billId"
                            v-model="newTrans.billId"
                            type="number"
                            :rules="billIdRules"
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
                      Edit Transaction
                      <v-form v-for="Edit in checkedRows" :key="Edit.transId">
                        <v-container>
                          <v-text-field label="transId" v-model="Edit.transId" disabled></v-text-field>
                          <v-text-field
                            label="menuName"
                            v-model="Edit.menuName"
                            type="text"
                            :rules="nameRules"
                          ></v-text-field>
                          <v-text-field
                            label="transPrice"
                            v-model="Edit.transPrice"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="priceRules"
                          ></v-text-field>
                          <v-text-field
                            label="totalPrice"
                            v-model="Edit.totalPrice"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="totalRules"
                          ></v-text-field>
                          <v-text-field
                            label="amount"
                            v-model="Edit.amount"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="amountRules"
                          ></v-text-field>
                          <v-text-field
                            label="statusName"
                            v-model="Edit.statusName"
                            type="text"
                            min="0.1"
                            step="0.1"
                            :rules="statusRules"
                          ></v-text-field>
                          <v-text-field
                            label="billId"
                            v-model="Edit.billId"
                            type="number"
                            :rules="billIdRules"
                          ></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="EditDialog=false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="edit">Save</v-btn>
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
  name: "transactionsuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      AddDialog: false,
      newTrans: [],
      nameRules: [v => !!v || "Name is required"],
      priceRules: [v => !!v || "Price is required"],
      totalRules: [v => !!v || "Total price is required"],
      amountRules: [v => !!v || "Amount is required"],
      statusRules: [v => !!v || "Amount is required"],
      billIdRules: [v => !!v || "BillId is required"],
      //Edit
      EditDialog: false,
      checkboxPosition: "left",
      checkedRows:[],
      nameRules: [v => !!v || "Name is required"],
      priceRules: [v => !!v || "Price is required"],
      totalRules: [v => !!v || "Total price is required"],
      amountRules: [v => !!v || "Amount is required"],
      statusRules: [v => !!v || "Amount is required"],
      billIdRules: [v => !!v || "BillId is required"],
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
          field: "menuName",
          label: "menuName"
        },
        {
          field: "transPrice",
          label: "Price"
        },
        {
          field: "totalPrice",
          label: "totalPrice"
        },
        {
          field: "amount",
          label: "amount"
        },
        {
          field: "statusName",
          label: "status"
        },
        {
          field: "billId",
          label: "billId"
        }
      ]
    };
  },
  methods: {
    addCancel() {
      this.AddDialog = false;
      this.$refs.form.resetValidation();
      this.newTrans = [];
    },
    addSave() {
      if(this.$refs.form.validate()){
      console.log(this.newTrans);
      axios
        .post("http://localhost:3000/api/insertTransaction", {
          menuName: this.newTrans.menuName,
          transPrice: this.newTrans.transPrice,
          totalPrice: this.newTrans.totalPrice,
          amount: this.newTrans.amount,
          billId: this.newTrans.billId
        })
        .then(response => {
          this.reTrans();
          this.newTrans = [];
          this.$refs.form.resetValidation();
        });
      this.AddDialog = false;
      }
    },
    edit() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updateTransaction/",
            this.checkedRows[index]
          )
          .then(() => {
            this.reTrans();
            this.checkedRows=[]
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
              console.log(this.checkedRows[index].transId)
              axios
                .delete(
                  "http://localhost:3000/api/deletetransaction/" +
                    this.checkedRows[index].transId
                )
                .then(() => {
                  this.reTrans();
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
    reTrans() {
      axios
        .get("http://localhost:3000/api/getalltransaction")
        .then(response => {
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
