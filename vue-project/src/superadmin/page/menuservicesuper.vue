<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">MENU SERVICE</v-card-title>
          <b-table
            :data="menuSerData"
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
                <v-btn color="primary" dark class="add" @click="addDialod=true">Add</v-btn>
                <v-dialog max-width="490" v-model="addDialog">
                  <v-card>
                    <v-card-text class="headline">
                      Add Menuservice
                      <v-form>
                        <v-container fluid>
                          <v-text-field label="TypeId" v-model="newMs.typeId"></v-text-field>
                          <v-text-field label="MenuId" v-model="newMs.menuId"></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="addDialog=true">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Edit-->
            <v-layout id="layoutEdit">
              <v-flex xs2>
                <v-btn color="primary" dark class="add">Edit</v-btn>
                <v-dialog max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Edit Menuservice
                      <v-form>
                        <v-container>
                          <v-text-field label="menuServiceId"></v-text-field>
                          <v-text-field label="TypeId"></v-text-field>
                          <v-text-field label="MenuId"></v-text-field>
                          <v-text-field label="Created_at"></v-text-field>
                          <v-text-field label="Update_at"></v-text-field>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text>Cancel</v-btn>
                      <v-btn color="green darken-1" text>Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Delete-->
            <v-layout>
              <v-flex xs2>
                <v-btn color="primary" dark class="clear">Delete</v-btn>
                <v-dialog max-width="490"></v-dialog>
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
  name: "menuservicesuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      newMs: [],
      addDialog: false,

      menuSerData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "menuServiceId",
          label: "menuServiceId",
          width: "40",
          numeric: true
        },
        {
          field: "typeId",
          label: "typeId"
        },
        {
          field: "menuId",
          label: "menuId"
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
      console.log(this.newMs);
      this.addDialog = false;
      this.newMs = "";
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallmenuservice").then(response => {
      this.menuSerData = response.data;
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
