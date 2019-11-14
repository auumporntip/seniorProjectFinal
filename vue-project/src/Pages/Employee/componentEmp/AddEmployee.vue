<template>
  <div>
    <v-layout>
      <v-flex xs2>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="black" outline dark v-on="on" @click="clickButton" class="addBtn">
              <v-icon left dark>add</v-icon>Add Employee
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Employee</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-text-field label="Name" :rules="nameRules" v-model="employee.empName"></v-text-field>
                      <v-text-field
                        label="Username"
                        :rules="usernameRules"
                        v-model="employee.empUsername"
                      ></v-text-field>
                      <v-text-field label="Email" :rules="emailRules" v-model="employee.empEmail"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-select
                        label="Select Position"
                        v-model="selectedPosition"
                        :items="position"
                        item-text="positionName"
                        item-value="positionId"
                        :rules="positionRules"
                      ></v-select>
                      <v-text-field
                        label="Password"
                        :rules="passwordRules"
                        type="password"
                        v-model="employee.empPassword"
                      ></v-text-field>
                      <v-text-field
                        label="Phone"
                        :rules="phoneRules"
                        mask="### ### ####"
                        v-model="employee.empPhone"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="confirmAdd">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template> 
 
<script>
import axios from "axios";
import { store } from "../../../store/store";
import { host } from "../../data";

export default {
  name: "AddEmployee",
  store,
  components: {},

  data() {
    return {
       empData:[], 
      dialog: false,
      position: [],
      selectedPosition: null,
      employeeId: 1,
      email: "",
      employee: {},
      nameRules: [v => !!v || "Name is required"],
      usernameRules: [
        v => !!v || "Username is required",
        v => this.checkName || "Username has already"
      ],
      passwordRules: [v => !!v || "Password is required"],
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "Email must be valid"
      ],
      phoneRules: [v => !!v || "Phone is required"],
      positionRules: [v => !!v || "Position is required"],

    
    };
  },
  computed: {
      checkName(){
        for(let index = 0; index < this.empData.length; index++){
          if(
            this.employee.empUsername.toLowerCase() ===
            this.empData[index].empUsername.toLowerCase()
          ){
            return false;
          }
        }
        return true;
      }
  },
  created() {
     axios.get(host+"getallemployee").then(response => { 
      this.empData = response.data; 
    }); 
    axios.get(host+"getallposition/").then(response => {
      this.position = response.data;
    });
     
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.employee.empName = [];
      this.employee.empUsername = [];
      this.employee.empPassword = [];
      this.employee.empPhone = [];
      this.employee.empEmail = [];
      this.selectedPosition = [];
    },
    confirmAdd() {
      if (this.$refs.form.validate()) {
        //  var a={log
        console.log(this.selectedPosition);

        axios
          .post(host+"insertemployee", {
            empName: this.employee.empName,
            empUsername: this.employee.empUsername,
            empPassword: this.employee.empPassword,
            empPhone: this.employee.empPhone,
            empEmail: this.employee.empEmail,
            positionId: this.selectedPosition,
            restaurantId: 1
        
          })
        
          .then(response => {
            axios
              .get(host+"getallemployee/")
              .then(response => {
                this.$store.commit("setEmployee",response.data);
                });
                this.empData = response.data;
                this.dialog = false;
                this.refreshPage();
                this.closeDialog();
                this.$refs.form.resetValidation();
              
          });
        //  }
        //  console.log(a);
      }
    },
    refreshPage(){
      axios
        .get(host+"getallemployee")
        .then(response => {
          this.empData = response.data;
        });
    },
    selected() {
      console.log(this.selectedPosition);
    },
    clickButton() {
      axios.get(host+"getallposition").then(response => {
        this.position = response.data;
      });
    }
  }
};
</script> 
 
<style scoped>
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
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
.addBtn {
  margin-top: 20%;
  margin-left: -135%;
}
</style> 
