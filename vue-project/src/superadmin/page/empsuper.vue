<template>
  <div>
    <Header></Header>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section>
        <b-tabs>
          <b-tab-item label="Table">
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
          </b-tab-item>
          <span id="Addeditdelete">
            <!--Add-->
            <v-layout id="layoutAdd">
              <v-flex xs2>
                <v-btn color="primary" dark class="add" @click="addDialog=true">Add</v-btn>
                <v-dialog max-width="490" v-model="addDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Add Employee
                      <v-form>
                        <v-container fluid>
                          <v-text-field label="EmpUsername" v-model="newEmp.empUsername"></v-text-field>
                          <v-text-field label="EmpPassword" v-model="newEmp.empPassword"></v-text-field>
                          <v-text-field label="EmpName" v-model="newEmp.empName"></v-text-field>
                          <v-text-field label="EmpPhone" v-model="newEmp.empPhone"></v-text-field>
                          <v-text-field label="EmpEmail" v-model="newEmp.empEmail"></v-text-field>
                          <v-text-field label="PositionId" v-model="newEmp.positionId"></v-text-field>
                          <v-text-field label="RestaurantId" v-model="newEmp.restaurantId"></v-text-field>
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
                <v-btn color="primary" dark class="clear">Delete</v-btn>
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
  name: "empsuper",
  components: {
    Header,
    sidebarsuper
  },
  data() {
    return {
      //Add
      addDialog: false,
      newEmp: [],

      //Edit
      editDialog: false,

      empData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "employeeId",
          label: "employeeId",
          width: "40",
          numeric: true
        },
        {
          field: "empUsername",
          label: "empUsername"
        },
        {
          field: "empPassword",
          label: "empPassword"
        },
        {
          field: "empName",
          label: "empName"
        },
        {
          field: "empPhone",
          label: "empPhone"
        },
        {
          field: "empEmail",
          label: "empEmail"
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
      console.log(this.newEmp);
      this.addDialog = false;
      this.newEmp = [];
    },
    editSave() {
      console.log(this.checkedRows);
      this.editDialog = false;
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