<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">Table</v-card-title>
        <!-- <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue> -->
        <v-layout justify-space-around>
          <v-container fluid>
            <v-layout wrap>
              <v-flex xs3>
                <v-card class="card">
                  <v-img :src="require('../assets/add.png')" aspect-ratio="1.5"></v-img>
                  <v-btn
                    class="subheading font-weight-medium"
                    block
                    id="text"
                    @click="newTableDialog=true"
                  >ADD TABLE</v-btn>
                  <v-dialog max-width="350" v-model="newTableDialog">
                    <v-card>
                      <v-card-text class="title">
                        New table
                        <v-form ref="form">
                          <v-container>
                            <!-- <qrcode-vue
                                  :value="value"
                                  :size="size"
                                  level="H"
                                  class="sizeQrcode"
                            ></qrcode-vue>-->
                            <v-flex xs12>
                              <v-text-field
                                label="Table number"
                                prepend-icon="restaurant"
                                v-model="newTable.tableNumber"
                                :rules="tableNumber"
                              ></v-text-field>
                            </v-flex>
                          </v-container>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="red" @click="cancelNewTable">Cancel</v-btn>
                        <v-btn flat color="blue" @click="saveNewTable">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-flex>

              <!-- table -->
              <v-flex xs3 v-for="table in tableData" :key="table.tableId">
                <v-card class="card">
                  <v-img aspect-ratio="1.5">
                    <qrcode-vue :value="value" :size="size" level="L" class="sizeQrcode"></qrcode-vue>
                  </v-img>
                  <v-btn
                    class="subheading font-weight-medium"
                    block
                    id="text"
                    @click="editDialog(table)"
                  >Table {{table.tableNumber}}</v-btn>
                </v-card>
                <v-icon class="iconClose" @click="deleteButton(table.tableId)">cancel</v-icon>
              </v-flex>
              <v-dialog max-width="450" v-model="editTableDialog">
                <v-card>
                  <v-card-text class="title">
                    Table
                    <v-form>
                      <v-container>
                        <v-layout row>
                          <qrcode-vue :value="value " :size="size" level="H" class="sizeQrcode"></qrcode-vue>
                          <v-flex xs6 order-md3 order-xs3>
                            <v-text-field
                              label="Table number"
                              prepend-icon="restaurant"
                              v-model="editTable.tableNumber"
                              :rules="editTableNumber"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="red" @click="cancelEditTable">Cancel</v-btn>
                    <v-btn flat color="blue" @click="saveEditTable">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="deleteDialog" max-width="290">
                <v-card>
                  <v-card-title class="title">DELETE CONFIRMATION</v-card-title>
                  <v-card-text class="confirmDialog">
                    <v-icon color="red">warning</v-icon>
                    you sure you want to delete this type of service?
                    You can't undo this action
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="deleteDialog = false">NO</v-btn>
                    <v-btn color="red darken-1" flat @click="clickYesDeleteDialog()">YES</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-container>
        </v-layout>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import QrcodeVue from "qrcode.vue";

export default {
  name: "Table",
  components: {
    sidebar,
    QrcodeVue
  },
  data() {
    return {
      deleteDialog: false,
      tableId: "",

      value: "http://restaurant-management.netlify.com/",
      size: 100,

      tableData: [],
      editTable: [],
      //new table form
      newTableDialog: false,
      newTable: [],
      tableNumber: [
        v => !!v || "Table number is required",
        v => !isNaN(this.newTable.tableNumber) || "Please enter a valid number."
      ],

      //edit table form
      editTableDialog: false,
      editTableNumber: [
        v => !!v || "Table number is required",
        v =>
          !isNaN(this.editTable.tableNumber) || "Please enter a valid number."
      ]
    };
  },
  methods: {
    deleteButton(tableId) {
      console.log(tableId);

      this.tableId = tableId;
      this.deleteDialog = true;
    },
    editDialog(table) {
      this.editTable = table;
      this.editTableDialog = true;
    },
    cancelNewTable() {
      this.newTableDialog = false;
      this.newTable = [];
      this.$refs.form.resetValidation();
      this.refreshPage();
    },
    saveNewTable() {
      if (this.$refs.form.validate()) {
        console.log(this.newTable);
        console.log(this.value);
        axios
          .post("http://localhost:3000/api/inserttable", {
            tableNumber: this.newTable.tableNumber
          })
          .then(response => {
            this.newTable = [];
            this.$refs.form.resetValidation();
            this.newTableDialog = false;
            this.refreshPage();
          });
      }
    },
    cancelEditTable() {
      axios.get("http://localhost:3000/api/getalltable").then(response => {
        this.tableData = response.data;
        this.editTableDialog = false;
      });
    },
    saveEditTable() {
      console.log(11);

      axios
        .put("http://localhost:3000/api/updatetable/", {
          tableId: this.editTable.tableId,
          tableNumber: this.editTable.tableNumber
        })
        .then(() => {
          console.log(123);

          this.cancelEditTable();
        });
    },
    refreshPage() {
      axios.get("http://localhost:3000/api/getalltable").then(response => {
        this.tableData = response.data;
      });
    },
    clickYesDeleteDialog() {
      axios
        .delete("http://localhost:3000/api/deletetable/" + this.tableId)
        .then(() => {
          this.deleteDialog = false;
          this.refreshPage();
        });
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getalltable").then(response => {
      this.tableData = response.data;
    });
  }
};
</script>
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
.sizeQrcode {
  margin-top: 8%;
  margin-left: 5%;
}
.card {
  margin: 5%;
  border-radius: 20px;
  text-align: center;
}
#text {
  padding: 2%;
  background: #eeeeee;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.title {
  text-align: left;
  padding-top: 5%;
  padding-left: 5%;
  padding-bottom: 5%;
}
.iconClose {
  color: red;
  margin-left: 19.5%;
  margin-top: -19%;
  position: absolute;
}
.confirmDialog {
  padding-top: 0px;
}
.title {
  margin-bottom: 0%;
}
</style>