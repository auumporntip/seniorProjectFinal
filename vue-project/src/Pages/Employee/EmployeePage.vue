 <template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <div class="bg">
        <v-card-title class="headline font-weight-medium">EMPLOYEE</v-card-title>
        <div id="button"></div>
        <v-btn color="black" outline class="addBtn" @click="addDialog=true">
          <v-icon left dark>add</v-icon>Add Employee
        </v-btn>
        <v-dialog persistent max-width="600px" v-model="addDialog">
          <v-card>
            <v-card-title>
              <span class="headline">Add Employee</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-text-field label="Name" v-model="newEmp.name" :rules="nameRules"></v-text-field>
                      <v-text-field
                        label="Username"
                        v-model="newEmp.userName"
                        :rules="usernameRules"
                      ></v-text-field>
                      <v-text-field label="Email" v-model="newEmp.email" :rules="emailRules"></v-text-field>
                      <v-select
                        label="Select Position"
                        v-model="selectedPosition"
                        :items="position"
                        item-text="positionName"
                        item-value="positionId"
                        :rules="positionRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field label="Surname" v-model="newEmp.surname" :rules="surnameRules"></v-text-field>
                      <v-text-field
                        label="Password"
                        v-model="newEmp.password"
                        :rules="passwordRules"
                      ></v-text-field>
                      <v-text-field
                        label="Phone"
                        mask="### ### ####"
                        v-model="newEmp.phone"
                        :rules="phoneRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeAddDialog">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="saveAddDialog">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- edit employee -->
        <b-table
          :data="empData"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          id="imageColumn"
        >
          <template slot-scope="props">
            <b-table-column label="Username" width="100">{{ props.row.userName }}</b-table-column>
            <b-table-column label="Password" width="100">{{ props.row.password }}</b-table-column>
            <b-table-column label="Name" width="100">{{ props.row.name }} {{props.row.surname}}</b-table-column>
            <b-table-column label="Phone" width="100">{{ props.row.phone }}</b-table-column>
            <b-table-column label="Email" width="100">{{ props.row.email }}</b-table-column>
            <b-table-column label="Edit" width="50">
              <!-- edit employee -->
              <v-icon @click="editDialog(props.row)">edit</v-icon>
            </b-table-column>
            <b-table-column label="Delete" width="50">
              <!-- delete employee -->
              <v-icon @click="confirmDelete(props.row.accountId)">delete</v-icon>
            </b-table-column>
          </template>
        </b-table>
        <!-- edit dialog -->

        <v-dialog v-model="editEmpDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Employee</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form1">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-text-field label="Name" :rules="editNameRules" v-model="editEmp.name"></v-text-field>
                      <v-text-field
                        label="Username"
                        :rules="editUsernameRules"
                        v-model="editEmp.userName"
                      ></v-text-field>
                      <v-text-field label="Email" :rules="editEmailRules" v-model="editEmp.email"></v-text-field>
                      <v-select
                        label="Select Position"
                        v-model="selectedPosition"
                        :items="position"
                        item-text="positionName"
                        item-value="positionId"
                        :rules="editPositionRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        label="Surname"
                        :rules="editSurnameRules"
                        v-model="editEmp.surname"
                      ></v-text-field>
                      <v-text-field
                        label="Password"
                        :rules="editPasswordRules"
                        v-model="editEmp.password"
                      ></v-text-field>
                      <v-text-field
                        label="Phone"
                        :rules="editPhoneRules"
                        mask="### ### ####"
                        v-model="editEmp.phone"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="editCloseDialog">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="confirmEdit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- delete dialog -->
        <v-dialog v-model="deleteDialog" max-width="290">
          <v-card>
            <v-card-title class="title" style="margin-bottom:0px;">DELETE CONFIRMATION</v-card-title>
            <v-card-text class="confirmDialog">
              <v-icon color="red">warning</v-icon>you sure you want to delete this employee?
              You can't undo this action
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="deleteDialog = false">NO</v-btn>
              <v-btn color="red darken-1" flat @click="clickYesDeleteDialog()">YES</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template> 
 
<script>
import sidebar from "@/components/sidebar";
import EmpTable from "./componentEmp/EmpTable";
import jwt from "jsonwebtoken";
import { store } from "../../store/store";
import axios from "axios";
export default {
  name: "EmployeePage",
  components: {
    sidebar,
    EmpTable
  },
  data() {
    return {
      // add dialog
      addDialog: false,
      position: [],
      selectedPosition: [],
      newEmp: [],
      empData: [],
      nameRules: [v => !!v || "Name is required"],
      usernameRules: [
        v => !!v || "Username is required",
        v => this.checkName || "Name has already"
      ],
      emailRules: [
        v => !!v || "email is required",
        v => /.+@.+/.test(v) || "Email must be valid"
      ],
      positionRules: [v => !!v || "Position is required"],
      surnameRules: [v => !!v || "Surname is required"],
      passwordRules: [v => !!v || "Password is required"],
      phoneRules: [v => !!v || "Phone is required"],

      // table
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 10,

      //edit dialog
      editEmp: [],
      editEmpDialog: false,
      positionId: "",
      editUsername:"",
      editNameRules: [v => !!v || "Name is required"],
      editSurnameRules: [v => !!v || "Surname is required"],
      editUsernameRules: [
        v => !!v || "Username is required",
        v => this.editCheckName || "username has already"
      ],
      editPasswordRules: [v => !!v || "Password is required"],
      editEmailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "Email must be valid"
      ],
      editPhoneRules: [v => !!v || "Phone is required"],
      editPositionRules: [v => !!v || "Position is required"],

      // delete dialog
      deleteDialog: false,
      accountId: "",
      emploteeId: ""
    };
  },
  methods: {
    saveAddDialog() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3000/api/insertAccount", {
            name: this.newEmp.name,
            userName: this.newEmp.userName,
            email: this.newEmp.email,
            positionId: this.selectedPosition,
            surname: this.newEmp.surname,
            password: this.newEmp.password,
            phone: this.newEmp.phone,
            restaurantId: 1
          })
          .then(response => {
            (this.addDialog = false), this.closeAddDialog();
            this.$refs.form.resetValidation();
          });
      }
    },
    closeAddDialog() {
      this.newEmp = [];
      this.selectedPosition = [];
      this.addDialog = false;
      this.refreshPage();
      this.$refs.form.resetValidation();
    },
    refreshPage() {
      if (this.$store.getters.account != "") {
        this.account = this.$store.getters.account;
        console.log(this.account, "App");
      } else {
        this.account = jwt.decode(localStorage.getItem("token"));
        console.log(this.account, "token");
      }
      axios
        .get(
          "http://localhost:3000/api/getaccountbyposition/" +
            this.account.restaurantId +
            "/" +
            this.account.positionId
        )
        .then(response => {
          this.empData = response.data;
        });
    },
    editDialog(editAccount) {
      this.selectedPosition = editAccount.positionId;
      this.editEmp = editAccount;
      this.editUsername = editAccount.userName;
      this.editEmpDialog = true;
    },
    confirmEdit() {
      if (this.$refs.form1.validate()) {
        axios
          .put("http://localhost:3000/api/updateAccount/", {
            accountId: this.editEmp.accountId,
            userName: this.editEmp.userName,
            password: this.editEmp.password,
            name: this.editEmp.name,
            surname: this.editEmp.surname,
            phone: this.editEmp.phone,
            email: this.editEmp.email,
            positionId: this.selectedPosition
          })
          .then(() => {
            this.editEmpDialog = false;
            this.editCloseDialog();
          });
      }
    },
    editCloseDialog() {
      this.editEmpDialog = false;
      this.editEmp = [];
      this.selectedPosition = [];
      this.$refs.form1.resetValidation();
      this.refreshPage();
    },
    confirmDelete(accountId) {
      this.accountId = accountId;
      this.deleteDialog = true;
    },
    clickYesDeleteDialog() {
      axios
        .delete("http://localhost:3000/api/deleteaccount/" + this.accountId)
        .then(() => {
          this.deleteDialog = false;
          this.refreshPage();
        });
    }
  },
  computed: {
    checkName() {
      for (let index = 0; index < this.empData.length; index++) {
        if (
          this.newAccount.userName.toLowerCase() ===
          this.empData[index].userName.toLowerCase()
        ) {
          return false;
        }
      }
      return true;
    },
    editCheckName() {
      if (this.editEmp.userName.toLowerCase() === this.editUsername.toLowerCase()) {
        return true;
      } else {
        for (let index = 0; index < this.empData.length; index++) {
          if (this.editEmp.accountId === this.empData[index].accountId) {
            continue;
          }
          if (
            this.editEmp.userName.toLowerCase() ===
            this.empData[index].userName.toLowerCase()
          ) {
            return false;
          }
        }
        return true;
      }
    }
  },
  created() {
    if (this.$store.getters.account != "") {
      this.account = this.$store.getters.account;
      console.log(this.account, "App");
    } else {
      this.account = jwt.decode(localStorage.getItem("token"));
      console.log(this.account, "token");
    }
    axios
      .get(
        "http://localhost:3000/api/getaccountbyposition/" +
          this.account.restaurantId +
          "/" +
          this.account.positionId
      )
      .then(response => {
        this.empData = response.data;
      });

    axios.get("http://localhost:3000/api/getallposition/").then(response => {
      this.position = response.data;
    });
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
.addBtn {
  margin-top: -8%;
  margin-left: 80%;
}
#imageColumn {
  margin-left: 1%;
  margin-right: 1%;
}
#button {
  margin-left: 86%;
  margin-top: -5%;
}
.text {
  margin-left: 75%;
  margin-top: 0%;
}
.uploadBtn {
  padding-top: 5%;
  padding-left: 25%;
}
.name {
  padding-left: 25%;
}
.imageSize {
  margin-left: 4%;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
.confirmDialog {
  padding-top: 0px;
}
.uploadBtn {
  padding-top: 5%;
  padding-left: 25%;
}
.name {
  padding-left: 25%;
}
.imageSize {
  margin-left: 4%;
}

</style> 
