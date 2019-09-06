<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">EMPLOYEE</v-card-title>
          <b-table
            :data="empData"
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
                      Add Employee
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="Username"
                            v-model="newEmp.empUsername"
                            :rules="usernameRules"
                          ></v-text-field>
                          <v-text-field
                            label="Password"
                            v-model="newEmp.empPassword"
                            :rules="passwordRules"
                          ></v-text-field>
                          <v-text-field label="Name" v-model="newEmp.empName" :rules="nameRules"></v-text-field>
                          <v-text-field
                            label="Mobile Phone"
                            mask="### ### ####"
                            v-model="newEmp.empPhone"
                            :rules="phoneRules"
                          ></v-text-field>
                          <v-text-field label="Email" v-model="newEmp.empEmail" :rules="emailRules"></v-text-field>
                          <v-text-field
                            label="Position Id"
                            type="number"
                            v-model="newEmp.positionId"
                            :rules="poIdRules"
                          ></v-text-field>
                          <v-text-field
                            label="Restaurant Id"
                            type="number"
                            v-model="newEmp.restaurantId"
                            :rules="resIdRules"
                          ></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="empCancel">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="empSave">Save</v-btn>
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
                      Edit Employee
                      <v-form v-for="emp in checkedRows" :key="emp.employeeId">
                        <v-container>
                          <v-text-field label="EmployeeId" disabled v-model="emp.employeeId"></v-text-field>
                          <v-text-field label="EmpUsername" v-model="emp.empUsername"></v-text-field>
                          <v-text-field label="EmpPassword" v-model="emp.empPassword"></v-text-field>
                          <v-text-field label="EmpName" v-model="emp.empName"></v-text-field>
                          <v-text-field label="EmpPhone" v-model="emp.empPhone"></v-text-field>
                          <v-text-field label="EmpEmail" v-model="emp.empEmail"></v-text-field>
                          <v-text-field label="PositionId" v-model="emp.positionId"></v-text-field>
                          <v-text-field label="RestaurantId" v-model="emp.restaurantId"></v-text-field>
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
            <v-layout id="layoutDelete">
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
  name: "empsuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      addDialog: false,
      newEmp: [],
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 15) || "Max 15 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Min 8 characters"
      ],
      nameRules: [v => !!v || "Name is required"],
      phoneRules: [v => !!v || "Phone Number is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "Invalid Email address"
      ],
      poIdRules: [v => !!v || "Position Id is required"],
      resIdRules: [v => !!v || "Restaurant Id is required"],

      //Edit
      editDialog: false,

      empData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "employeeId",
          label: "Id",
          width: "40",
          numeric: true
        },
        {
          field: "empUsername",
          label: "Username"
        },
        {
          field: "empPassword",
          label: "Password"
        },
        {
          field: "empName",
          label: "Name"
        },
        {
          field: "empPhone",
          label: "Phone"
        },
        {
          field: "empEmail",
          label: "Email"
        },
        {
          field: "positionId",
          label: "positionId"
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
    empCancel() {
      this.addDialog = false;
      this.newEmp = [];
    },
    empSave() {
      if (this.$refs.form.validate()) {
        console.log(this.newEmp);
        axios
          .post("http://localhost:3000/api/insertBill", {
            employeeId: this.newEmp.employeeId,
            empUsername: this.newEmp.empUsername,
            empPassword: this.newEmp.empPassword,
            empName: this.newEmp.empName,
            empPhone: this.newEmp.empPhone,
            empEmail: this.newEmp.empEmail,
            positionId: this.newEmp.positionId,
            restaurantId: this.newEmp.restaurantId
          })
          .then(response => {
            this.reEmployee();
            this.newEmp = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    editSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updateEmployee/",
            this.checkedRows[index]
          )
          .then(() => {
            this.reEmployee();
          });
      }
      this.editDialog = false;
    },
    reEmployee() {
      axios.get("http://localhost:3000/api/getallemployee").then(response => {
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
                  "http://localhost:3000/api/deleteEmployee/" +
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
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallemployee").then(response => {
      this.empData = response.data;
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