<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="headline font-weight-medium">BILL</v-card-title>
          <span id="button">
            <b-table
              :data="billData"
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
            >
              <template slot="bottom-left">
                <b>Total checked</b>
                : {{ checkedRows.length }}
              </template>
            </b-table>
            <!--Add-->
            <v-layout row>
              <v-flex xs2>
                <v-btn color="black" outline dark @click="addDialog=true">
                  <v-icon left dark>add</v-icon>Add Bill
                </v-btn>
                <v-dialog v-model="addDialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Add Bill
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
                      <v-btn color="blue darken-1" flat @click="addCancel">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click="addSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>

              <!--edit-->

              <v-flex xs2>
                <v-btn color="black" outline dark @click="editDialog=true">
                  <v-icon left dark>edit</v-icon>Edit Bill
                </v-btn>
                <v-dialog max-width="490" v-model="editDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Edit Bill
                      <v-form v-for="bill in checkedRows" :key="bill.billId">
                        <v-container>
                          <v-text-field label="BillId" v-model="bill.billId" disabled></v-text-field>
                          <v-text-field label="TableNumber" v-model="bill.tableNumber"></v-text-field>
                          <v-text-field label="NumOfCust" v-model="bill.numOfCust"></v-text-field>
                          <!-- <v-text-field label="TotalPrice" v-model="bill.totalPrice"></v-text-field>
                          <v-text-field label="EatTimeStart" v-model="bill.eatTimeStart"></v-text-field>
                          <v-text-field label="EatTimeEnd" v-model="bill.eatTimeEnd"></v-text-field>-->
                          <v-text-field label="TypeId" v-model="bill.typeId"></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="editDialog=false">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click="editSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>

              <!--Delete-->

              <v-flex xs2>
                <v-btn color="black" outline dark  @click="clickDelete">
                  <v-icon left dark>delete</v-icon>Delete Bill
                </v-btn>
              </v-flex>
            </v-layout>
          </span>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "BillPage",
  components: {
    sidebar
  },
  data() {
    return {
      billData: [],
      // Add
      addDialog: false,
      bill: [],
      tableRules: [
        v => !!v || "Table Number is required",
        v =>
          (v && v.length <= 3) || "Table number must be less than 4 characters"
      ],
      amountRules: [
        v => !!v || "The number of customer is required",
        v =>
          (v && v.length <= 3) || "Table number must be less than 4 characters"
      ],
      totalPriceRules: [v => !!v || "Total price is required"],
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
        // {
        //   field: "eatTimeStart",
        //   label: "Time Start"
        // },
        // {
        //   field: "eatTimeEnd",
        //   label: "Time End",
        //   centered: true
        // },
        {
          field: "typeName",
          label: "Course"
        }
      ]
    };
  },
  methods: {
    addSave() {
      if (this.$refs.form.validate()) {
        console.log(this.bill);
        axios
          .post("http://localhost:3000/api/insertBill", {
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
        axios
          .put("http://localhost:3000/api/updateBill/", this.checkedRows[index])
          .then(() => {
            this.reBill();
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
                  "http://localhost:3000/api/deleteBill/" +
                    this.checkedRows[index].billId
                )
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
      axios
        .get("http://localhost:3000/api/getallbillbyrestaurantId/" + 1)
        .then(response => {
          this.billData = response.data;
        });
    }
  },
  created() {
    this.reBill()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background-color: #f0cab1;
  border-radius: 20px;
  padding: 1%;
}
#bigbox {
  background-color: #eeeeee;
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
</style>
