<template>
  <div>
    <Header></Header>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section>
        <b-tabs>
          <b-tab-item label="Table">
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
          </b-tab-item>

          <span id="Addeditdelete">
            <!--Add-->
            <v-layout id="layoutAdd">
              <v-flex xs2>
                <v-btn color="primary" dark class="add" @click="addDialog=true">Add</v-btn>
                <v-dialog max-width="490" v-model="addDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Add Restaurant
                      <v-form>
                        <v-container fluid>
                          <v-text-field label="RestaurantName" v-model="newRes.restaurantName"></v-text-field>
                          <v-text-field
                            label="RestaurantLocation"
                            v-model="newRes.restaurantLocation"
                          ></v-text-field>
                          <v-text-field label="TimeOpenClose" v-model="newRes.timeOpenClose"></v-text-field>
                          <v-text-field label="RestaurantPhone" v-model="newRes.restaurantPhone"></v-text-field>
                          <v-text-field label="TypeResId" v-model="newRes.typeResId"></v-text-field>
                          <v-text-field label="AccountId" v-model="newRes.accountId"></v-text-field>
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
                      <v-btn color="green darken-1" text @click="editDialog=true">Cancel</v-btn>
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
  name: "restaurantsuper",
  components: {
    Header,
    sidebarsuper
  },
  data() {
    return {
      //Add
      addDialog: false,
      newRes: [],

      //Edit
      editDialog: false,

      resData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "restaurantId",
          label: "restaurantId",
          width: "40",
          numeric: true
        },
        {
          field: "restaurantName",
          label: "restaurantName"
        },
        {
          field: "restaurantLocation",
          label: "restaurantLocation"
        },
        {
          field: "timeOpenClose",
          label: "timeOpenClose"
        },
        {
          field: "restaurantPhone",
          label: "restaurantPhone"
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
      console.log(this.newRes);
      this.addDialog = false;
      this.newRes = [];
    },
    addCancel() {
      this.addDialog = false;
      this.newRes = [];
    },
    editSave() {
      console.log(this.checkedRows);
      this.editDialog = false;
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
