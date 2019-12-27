<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">
          Table
          <v-text-field
            class="search"
            v-model="keyword"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
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
                  <v-dialog max-width="350" v-model="newTableDialog" data-app persistent>
                    <v-card>
                      <v-card-title style="padding-bottom:0%;">
                        <span class="nameDialog">New table</span>
                      </v-card-title>
                      <v-card-text>
                        <v-form ref="form">
                          <v-container grid-list-md style="padding-top:0%;">
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
                        <v-btn flat color="#7d7a73" @click="cancelNewTable">CANCEL</v-btn>
                        <v-btn flat color="#305378" @click="saveNewTable">SAVE</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-flex>

              <!-- table -->
              <v-flex xs3 v-for="table in items" :key="table.tableId">
                <v-card class="card">
                  <v-img aspect-ratio="1.5">
                    <qrcode-vue :value="host+table.tableNumber" :size="size" class="sizeQrcode"></qrcode-vue>
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
              <v-dialog max-width="350" v-model="editTableDialog" data-app persistent>
                <v-card>
                  <v-card-title style="padding-bottom:0%;">
                    <span class="nameDialog">Table</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form1">
                      <v-container>
                        <v-layout row>
                          <v-flex xs12 order-md3 order-xs3>
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
                    <v-btn flat color="#7d7a73" @click="cancelEditTable">CANCEL</v-btn>
                    <v-btn flat color="#305378" @click="saveEditTable">SAVE</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="deleteDialog" max-width="290" data-app>
                <v-card>
                  <v-card-title class="title">DELETE CONFIRMATION</v-card-title>
                  <v-card-text class="confirmDialog">
                    <v-icon color="red">warning</v-icon>you sure you want to delete this type of service?
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
import { host } from "./data";

export default {
  name: "Table",
  components: {
    sidebar,
    QrcodeVue
  },
  data() {
    return {
      //search
      keyword: "",
      t: "",
      deleteDialog: false,
      tableId: "",
      host: "http://localhost:8081/motype/",
      value: "",
      size: 100,
      tableData: [],
      editTable: [],
      //new table form
      newTableDialog: false,
      newTable: [],
      tableNumber: [
        v => !!v || "Table number is required",
        v => (v && this.checkName()) || "This table number has already"
      ],

      //edit table form
      editTableDialog: false,
      editTableNumber: [
         v => !!v || "Table number is required",
        v => (v && this.editCheckName()) || "This table number has already"
      ]
    };
  },
  methods: {
    editCheckName() {
      if (this.editTable.tableNumber.toLowerCase() === this.t.toLowerCase()) {
        return true;
      } else {
        for (let index = 0; index < this.tableData.length; index++) {
          if (this.editTable.tableId === this.tableData[index].tableId) {
            continue;
          }
          if (
            this.editTable.tableNumber.toLowerCase() ===
            this.tableData[index].tableNumber.toLowerCase()
          ) {
            return false;
          }
        }
        return true;
      }
    },
    checkName() {
      for (let index = 0; index < this.tableData.length; index++) {
        if (
          this.newTable.tableNumber.toLowerCase() ===
          this.tableData[index].tableNumber.toLowerCase()
        ) {
          return false;
        }
      }
      return true;
    },
    deleteButton(tableId) {
      console.log(tableId);

      this.tableId = tableId;
      this.deleteDialog = true;
    },
    editDialog(table) {
      this.t = table.tableNumber;
      this.editTable = table;
      this.value = this.host + table.tableNumber;
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
          .post(host + "inserttable", {
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
      axios.get(host + "getalltable").then(response => {
        this.tableData = response.data;
        this.editTableDialog = false;
        this.$refs.form1.resetValidation();
      });
    },
    saveEditTable() {
      if (this.$refs.form1.validate()) {
        axios
          .put(host + "updatetable/", {
            tableId: this.editTable.tableId,
            tableNumber: this.editTable.tableNumber
          })
          .then(() => {
            console.log(123);

            this.cancelEditTable();
          });
      }
    },
    refreshPage() {
      axios.get(host + "getalltable").then(response => {
        this.tableData = response.data;
      });
    },
    clickYesDeleteDialog() {
      axios.delete(host + "deletetable/" + this.tableId).then(() => {
        this.deleteDialog = false;
        this.refreshPage();
      });
    }
  },
  computed: {
    items() {
      if (this.keyword != "") {
        return this.tableData.filter(items =>
          items.tableNumber.toLowerCase().includes(this.keyword.toLowerCase())
        );
      } else {
        return this.tableData;
      }
    }
  },
  created() {
    axios.get(host + "getalltable").then(response => {
      this.tableData = response.data;
      console.log(this.tableData);
      
    });
  }
};
</script>
<style scoped>
.bg {
  background-color: #f7f6ee;
  border-radius: 20px;
  padding: 1%;
}
#bigbox {
  background-color: #84a295;
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
.iconClose {
  color: red;
  margin-left: 19.5%;
  margin-top: -19%;
  position: absolute;
}
.confirmDialog {
  padding-top: 0px;
}
.nameDialog {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 2em;
}
.search {
  margin-left: 57%;
  position: absolute;
  margin-top: -1%;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>