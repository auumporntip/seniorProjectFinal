<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">
          BILL
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
          :columns="columns"
          :paginated="isPaginated"
          :per-page="perPage"
          :checked-rows.sync="checkedRows"
          :is-row-checkable="(row) => row.id !== 3"
          checkable
          :checkbox-position="checkboxPosition"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          style="padding-left:14px;padding-right:14px;"
        >
          <template slot="bottom-left">
            <b>Total checked</b>
            : {{ checkedRows.length }}
          </template>
        </b-table>
        <!--Add-->
        <v-layout row>
          <v-flex xs2>
            <v-btn color="#B7CDC2" @click="addDialog=true">
              <v-icon left dark>add</v-icon>Add Bill
            </v-btn>
            <v-dialog v-model="addDialog" max-width="490" data-app>
              <v-card>
                <v-card-title style="padding-bottom:0%;">
                  <span class="nameDialog">Add Menu</span>
                </v-card-title>
                <v-card-text style="padding-top:0px;">
                  <v-form ref="form">
                    <v-container fluid>
                      <v-text-field
                        label="Table no."
                        type="string"
                        v-model="bill.tableNumber"
                        :rules="tableRules"
                      ></v-text-field>
                      <v-text-field
                        label="Number of customer"
                        type="number"
                        v-model="bill.numOfCust"
                        :rules="amountRules"
                      ></v-text-field>
                      <v-text-field
                        label="Total Price"
                        type="number"
                        v-model="bill.totalPrice"
                        :rules="totalPriceRules"
                      ></v-text-field>
                      <v-text-field
                        label="Select time"
                        type="time"
                        value="00:00:00"
                        v-model="bill.eatTimeStart"
                        :rules="eatTimeStartRules"
                      ></v-text-field>
                      <v-text-field
                        label="Time End"
                        type="time"
                        value="00:00:00"
                        v-model="bill.eatTimeEnd"
                        :rules="endTimeStartRules"
                      ></v-text-field>
                      <v-text-field
                        label="Type Id"
                        type="number"
                        v-model="bill.typeId"
                        :rules="typeIdRules"
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

          <!--edit-->

          <v-flex xs2>
            <v-btn color="#B7CDC2" @click="editDialog=true">
              <v-icon left dark>edit</v-icon>Edit Bill
            </v-btn>
            <v-dialog max-width="490" v-model="editDialog" data-app>
              <v-card>
                <v-card-text class="headline">
                  Edit Bill
                  <v-form v-for="bill in checkedRows" :key="bill.billId">
                    <v-container>
                      <v-text-field label="BillId" v-model="bill.billId" disabled></v-text-field>
                      <v-text-field
                        label="TableNumber"
                        v-model="bill.tableNumber"
                        :rules="tableRules"
                      ></v-text-field>
                      <v-text-field label="NumOfCust" v-model="bill.numOfCust" :rules="amountRules"></v-text-field>
                      <v-select
                        label="Select Category"
                        v-model="bill.typeId"
                        :items="typeOfService"
                        item-text="typeName"
                        item-value="typeId"
                        :rules="categoryRules"
                      ></v-select>
                      <v-select
                        label="Select Category"
                        v-model="bill.billStatus"
                        :items="status"
                        item-text="status"
                        item-value="billStatus"
                        :rules="categoryRules"
                      ></v-select>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#7d7a73" flat @click="editDialog=false">CANCEL</v-btn>
                  <v-btn color="#305378" flat @click="editSave">SAVE</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>

          <!--Delete-->

          <v-flex xs2>
            <v-btn color="#B7CDC2" @click="clickDelete">
              <v-icon left dark>delete</v-icon>Delete Bill
            </v-btn>
          </v-flex>
        </v-layout>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import dayjs from "dayjs";
import { host } from "./data";

export default {
  name: "BillPage",
  components: {
    sidebar
  },
  data() {
    return {
      //search
      keyword: "",
      status: [
        {
          status: "Done",
          billStatus: 1
        },
        {
          status: "In use",
          billStatus: 0
        }
      ],
      billData: [],
      // Add
      addDialog: false,
      bill: [],
      tableRules: [
        v => !!v || "Table Number is required",
        v =>
          (v && v.length <= 3) || "Table number must be less than 4 characters",
        v => v > 0 || "Table number must more than zero"
      ],
      amountRules: [
        v => !!v || "The number of customer is required",
        v =>
          (v && v.length <= 3) || "Table number must be less than 4 characters",
        v => v > 0 || "The number of customer must more than zero",
        v => v < 20 || "The number of customer must less than 20"
      ],
      totalPriceRules: [
        v => !!v || "Total price is required",
        v => v > 0 || "Total price must more than zero",
        v => v < 50000 || "Total price must less than 50000"
      ],
      eatTimeStartRules: [v => !!v || "Eat time start is required"],
      endTimeStartRules: [v => !!v || "End time start is required"],
      typeIdRules: [v => !!v || "Type Id is required"],

      // Edit
      editDialog: false,
      radioGroup: 1,
      isPaginated: true,
      perPage: 5,
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "billId",
          label: "Id",
          width: "40",
          numeric: true
        },
        {
          field: "tableNumber",
          label: "Table No."
        },
        {
          field: "numOfCust",
          label: "Number of Customer"
        },
        {
          field: "totalPrice",
          label: "Total Price"
        },
        {
          field: "typeName",
          label: "Course"
        }
      ],
      typeOfService: []
    };
  },
  methods: {
    addSave() {
      if (this.$refs.form.validate()) {
        console.log(this.bill);
        axios
          .post(host + "insertBill", {
            billId: this.bill.billId,
            tableNumber: this.bill.tableNumber,
            numOfCust: this.bill.numOfCust,
            totalPrice: this.bill.totalPrice,
            eatTimeStart: this.bill.eatTimeStart,
            eatTimeEnd: this.bill.eatTimeEnd,
            typeId: this.bill.typeId
          })
          .then(response => {
            this.reBill();
            this.bill = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    addCancel() {
      this.addDialog = false;
      this.$refs.form.resetValidation();
      this.bill = [];
    },
    editSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios.put(host + "updateBill/", this.checkedRows[index]).then(() => {
          this.reBill();
          this.bill = [];
          this.$refs.form.resetValidation();
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
                .delete(host + "deleteBill/" + this.checkedRows[index].billId)
                .then(() => {
                  this.reBill();
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
    reBill() {
      axios.get(host + "getallbillbyrestaurantId/" + 1).then(response => {
        this.billData = response.data;
      });
      this.checkedRows = [];
    }
  },
  computed: {
    //search
    items() {
      if (this.keyword != "") {
        return this.billData.filter(
          items =>
            items.typeName.toLowerCase().includes(this.keyword.toLowerCase()) ||
            items.billId == this.keyword.toLowerCase() ||
            items.tableNumber == this.keyword.toLowerCase()
        );
      } else {
        return this.billData;
      }
    }
  },
  created() {
    axios.get(host + "getalltypeofservice").then(response => {
      this.typeOfService = response.data;
    });
    this.reBill();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background-color: #f7f6ee;
  border-radius: 20px;
  padding: 1%;
}
#bigbox {
  background-color: #84a295;
  height: 800px;
  padding: 2%;
  margin-top: -800px;
  margin-left: 20%;
  background-attachment: fixed;
}
/* #Addeditdelete {
  display: flex;
  margin-left: auto;
  margin-right: auto;
} */
#layoutEdit {
  margin: 0 50px 0 50px;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
.search {
  margin-left: 57%;
  position: absolute;
  margin-top: 0%;
}
.nameDialog {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 2em;
}
</style>
