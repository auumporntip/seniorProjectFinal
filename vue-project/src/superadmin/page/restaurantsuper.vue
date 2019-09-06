<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">Restaurant</v-card-title>
          <b-table
            :data="resData"
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
                      Add Restaurant
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="RestaurantName"
                            v-model="newRes.restaurantName"
                            :rules="nameRules"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantDescription"
                            v-model="newRes.restaurantDescription"
                            :rules="descriptionRules"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantLocation"
                            v-model="newRes.restaurantLocation"
                            :rules="locationRules"
                          ></v-text-field>
                          <v-text-field
                            label="TimeOpenClose"
                            v-model="newRes.timeOpenClose"
                            :rules="timeRules"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantPhone"
                            v-model="newRes.restaurantPhone"
                            :rules="phoneRules"
                            mask="### ### ####"
                          ></v-text-field>
                          <v-text-field
                            label="TypeResId"
                            type="number"
                            v-model="newRes.typeResId"
                            :rules="typeResIdRules"
                          ></v-text-field>
                          <v-text-field
                            label="AccountId"
                            type="number"
                            v-model="newRes.accountId"
                            :rules="accountIdRules"
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
                <v-btn color="primary" dark class="add" @click="editDialog=true">Edit</v-btn>
                <v-dialog max-width="490" v-model="editDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Edit Restaurant
                      <v-form v-for="res in checkedRows" :key="res.restaurantId">
                        <v-container>
                          <v-text-field label="RestaurantId" disabled v-model="res.restaurantId"></v-text-field>
                          <v-text-field label="RestaurantName" v-model="res.restaurantName"></v-text-field>
                          <v-text-field
                            label="RestaurantDescription"
                            v-model="res.restaurantDescription"
                          ></v-text-field>
                          <v-text-field label="RestaurantLocation" v-model="res.restaurantLocation"></v-text-field>
                          <v-text-field label="TimeOpenClose" v-model="res.timeOpenClose"></v-text-field>
                          <v-text-field label="RestaurantPhone" v-model="res.restaurantPhone"></v-text-field>
                          <v-text-field label="TypeResId" v-model="res.typeResId"></v-text-field>
                          <v-text-field label="AccountId" v-model="res.accountId"></v-text-field>
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
  name: "restaurantsuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      addDialog: false,
      newRes: [],
      nameRules: [v => !!v || "Restaurant name is required"],
      descriptionRules: [v => !!v || "Restaurant description is required"],
      locationRules: [v => !!v || "Location is required"],
      timeRules: [v => !!v || "Time open and close is required"],
      phoneRules: [v => !!v || "Phone number is required"],
      typeResIdRules: [v => !!v || "Type of restaurant Id is required"],
      accountIdRules: [v => !!v || "account Id is required"],

      //Edit
      editDialog: false,

      resData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "restaurantId",
          label: "Id",
          width: "40",
          numeric: true
        },
        {
          field: "restaurantName",
          label: "Name"
        },
        {
          field: "restaurantDescription",
          label: "Description"
        },
        {
          field: "restaurantLocation",
          label: "Location"
        },
        {
          field: "timeOpenClose",
          label: "timeOpenClose"
        },
        {
          field: "restaurantPhone",
          label: "Phone"
        },
        {
          field: "typeResId",
          label: "typeResId"
        },
        {
          field: "accountId",
          label: "accountId"
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
        console.log(this.newRes);
        axios
          .post("http://localhost:3000/api/insertRestaurant", {
            restaurantId: this.newRes.restaurantId,
            restaurantName: this.newRes.restaurantName,
            restaurantDescription: this.newRes.restaurantDescription,
            restaurantLocation: this.newRes.restaurantLocation,
            timeOpenClose: this.newRes.timeOpenClose,
            restaurantPhone: this.newRes.restaurantPhone,
            typeResId: this.newRes.typeResId,
            accountId: this.newRes.accountId
          })
          .then(response => {
            this.reRestaurant();
            this.newRes = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    addCancel() {
      this.addDialog = false;
      this.newRes = [];
    },
    editSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios.put(
            "http://localhost:3000/api/updateRestaurant",
            this.checkedRows[index]
          )
          .then(() => {
            console.log(this.checkedRows);
            this.checkedRows = [];
            this.reRestaurant();
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
                  "http://localhost:3000/api/deleteRestaurant/" +
                    this.checkedRows[index].restaurantId
                )
                .then(() => {
                  this.reRestaurant();
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
    reRestaurant() {
      axios.get("http://localhost:3000/api/getallrestaurant").then(response => {
        this.resData = response.data;
      });
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallrestaurant").then(response => {
      this.resData = response.data;
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