<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">TYPE OF SERVICE</v-card-title>
          <b-table
            :data="typeOfSerData"
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
                <v-dialog max-width="490" v-model="AddDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Add TypeOfService
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="TypeName"
                            v-model="newTypeOfSer.typeName"
                            type="text"
                            :rules="TypeNameRules"
                          ></v-text-field>
                          <v-text-field
                            label="TypeTime"
                            v-model="newTypeOfSer.typeTime"
                            type="text"
                          ></v-text-field>
                          <v-text-field
                            label="TypePrice"
                            v-model="newTypeOfSer.typePrice"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="TypePriceRules"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantId"
                            v-model="newTypeOfSer.restaurantId"
                            type="number"
                            :rules="ResIdRules"
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
                      Edit TypeOfService
                      <v-form v-for="Edit in checkedRows" :key="Edit.typeId">
                        <v-container>
                          <v-text-field label="TypeId" disabled v-model="Edit.typeId"></v-text-field>
                          <v-text-field
                            label="TypeName"
                            v-model="Edit.typeName"
                            type="text"
                            :rules="TypeNameRules2"
                          ></v-text-field>
                          <v-text-field label="TypeTime" v-model="Edit.typeTime"></v-text-field>
                          <v-text-field
                            label="TypePrice"
                            v-model="Edit.typePrice"
                            type="number"
                            min="0.1"
                            step="0.1"
                            :rules="TypePriceRules2"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantId"
                            v-model="Edit.restaurantId"
                            type="number"
                            :rules="ResIdRules2"
                          ></v-text-field>
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
  name: "typeofservicesuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      AddDialog: false,
      newTypeOfSer: [],
      TypeNameRules: [v => !!v || "Name is required"],
      TypePriceRules: [v => !!v || "Price is required"],
      ResIdRules: [v => !!v || "Price is required"],
      //Edit
      EditDialog: false,
      TypeNameRules2: [v => !!v || "Name is required"],
      TypePriceRules2: [v => !!v || "Price is required"],
      ResIdRules2: [v => !!v || "Price is required"],
      //Delete
      typeOfSerData: [],
      isPaginated: true,
      perPage: 10,
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "typeId",
          label: "typeId",
          width: "40",
          numeric: true
        },
        {
          field: "typeName",
          label: "typeName"
        },
        {
          field: "typeTime",
          label: "typeTime"
        },
        {
          field: "typePrice",
          label: "typePrice"
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
    addCancel() {
      this.AddDialog = false;
      this.$refs.form.resetValidation();
      this.newTypeOfSer = [];
    },
    addSave() {
      if (this.$refs.form.validate()) {
        console.log(this.newTypeOfSer);
        axios
          .post("http://localhost:3000/api/insertTypeofservice", {
            typeName: this.newTypeOfSer.typeName,
            typeTime: this.newTypeOfSer.typeTime,
            typePrice: this.newTypeOfSer.typePrice,
            restaurantId: this.newTypeOfSer.restaurantId
          })
          .then(response => {
            this.retype();
            this.newTypeOfSer = [];
            this.$refs.form.resetValidation();
          });
        this.AddDialog = false;
      }
    },
    EditSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updatetypeofservice/",
            this.checkedRows[index]
          )
          .then(() => {
            this.retype();
          });
      }
      this.checkedRows = [];
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
                  "http://localhost:3000/api/deletetypeofservice/" +
                    this.checkedRows[index].accountId
                )
                .then(() => {
                  this.retype();
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
    retype() {
      axios
        .get("http://localhost:3000/api/getalltypeofservice")
        .then(response => {
          this.typeOfSerData = response.data;
        });
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/getalltypeofservice")
      .then(response => {
        this.typeOfSerData = response.data;
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
