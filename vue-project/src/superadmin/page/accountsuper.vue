<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">ACCOUNT</v-card-title>
          <b-table
            :icon-pack="iconPack"
            :data="accountData"
            :columns="columns"
            :paginated="isPaginated"
            :per-page="perPage"
            :checked-rows.sync="checkedRows"
            :is-row-checkable="(row) => row.id !== 3"
            checkable
            :checkbox-position="checkboxPosition"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
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
                      Add Account
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="Username"
                            v-model="account.username"
                            required
                            :rules="userRules"
                          ></v-text-field>
                          <v-text-field
                            label="Password"
                            v-model="account.password"
                            required
                            :rules="passwordRules"
                          ></v-text-field>
                          <v-text-field label="Email" v-model="account.email" :rules="emailRules"></v-text-field>
                          <v-text-field
                            label="Name"
                            v-model="account.name"
                            :rules="accountNameRules"
                          ></v-text-field>
                          <v-text-field
                            label="Surname"
                            v-model="account.surname"
                            :rules="surnameRules"
                          ></v-text-field>
                          <v-text-field
                            label="Phone"
                            mask="### ### ####"
                            v-model="account.phone"
                            :rules="phoneRules"
                          ></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="addDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addClick">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Edit-->
            <v-layout id="layoutEdit">
              <v-flex xs2>
                <v-btn color="primary" dark class="add" @click="editDialog=true">Edit</v-btn>
                <v-dialog v-model="editDialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Edit Account
                      <v-form v-for="account in checkedRows" :key="account.accountId">
                        <v-container>
                          <v-text-field label="AccountId" v-model="account.accountId" disabled></v-text-field>
                          <v-text-field
                            label="Username"
                            v-model="account.userName"
                            :rules="userRules"
                          ></v-text-field>
                          <v-text-field
                            label="Password"
                            v-model="account.password"
                            :rules="passwordRules"
                          ></v-text-field>
                          <v-text-field label="Email" v-model="account.email" :rules="emailRules"></v-text-field>
                          <v-text-field
                            label="Name"
                            v-model="account.name"
                            :rules="accountNameRules"
                          ></v-text-field>
                          <v-text-field
                            label="Surname"
                            v-model="account.surname"
                            :rules="surnameRules"
                          ></v-text-field>
                          <v-text-field
                            label="Phone"
                            mask="### ### ####"
                            v-model="account.phone"
                            :rules="phoneRules"
                          ></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" @click="editDialog = false" text>Cancel</v-btn>
                      <v-btn color="green darken-1" @click="editClick">Save</v-btn>
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
  name: "accountsuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      addDialog: false,
      account: [],
      userRules: [v => !!v || "Username is required"],
      passwordRules: [v => !!v || "Password is required"],
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "Invalid Email address"
      ],
      accountNameRules: [v => !!v || "Name is required"],
      surnameRules: [v => !!v || "Surname is required"],
      phoneRules: [v => !!v || "Phone number is required"],

      //Edit
      editDialog: false,

      //Delete

      accountData: [],
      isPaginated: true,
      perPage: 15,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      isPaginated: true,
      iconPack: "fas",
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "accountId",
          label: "Id",
          width: "40",
          numeric: true
        },
        {
          field: "userName",
          label: "Username"
        },
        {
          field: "password",
          label: "Password"
        },
        {
          field: "email",
          label: "Email"
        },
        {
          field: "name",
          label: "Name"
        },
        {
          field: "surname",
          label: "Surname"
        },
        {
          field: "phone",
          label: "Phone"
        }
      ]
    };
  },
  methods: {
    addClick() {
      if (this.$refs.form.validate()) {
        console.log(this.account);
        axios
          .post("http://localhost:3000/api/register", {
            username: this.account.username,
            password: this.account.password,
            email: this.account.email,
            name: this.account.name,
            surname: this.account.surname,
            phone: this.account.phone
          })
          .then(response => {
            this.refreshAccount();
            this.account = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    editClick() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updateAccount/",
            this.checkedRows[index]
          )
          .then(() => {
            this.refreshAccount();
          });
      }
      this.checkedRows = [];
      this.editDialog = false;
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
                  "http://localhost:3000/api/deleteaccount/" +
                    this.checkedRows[index].accountId
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
        this.accountData = response.data;
      });
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallaccount").then(response => {
      this.accountData = response.data;
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