<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">POSITION</v-card-title>
          <b-table
            :data="positionData"
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
                <v-btn color="primary" dark @click.stop="test" class="add">Add</v-btn>
                <v-dialog v-model="dialog" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Add Position
                      <v-form>
                        <v-container fluid>
                          <v-row>
                            <v-col>
                              <v-text-field label="PositionId"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field label="PositionName"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field label="Created_at"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field label="Update_at"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="clickSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Edit-->
            <v-layout id="layoutEdit">
              <v-flex xs2>
                <v-btn color="primary" dark @click.stop="test2" class="add">Edit</v-btn>
                <v-dialog v-model="dialog2" max-width="490">
                  <v-card>
                    <v-card-text class="headline">
                      Edit Position
                      <v-form>
                        <v-container>
                          <v-row>
                            <v-col>
                              <v-text-field label="PositionId"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field label="PositionName"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field label="Created_at"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field label="Update_at"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="clickSave">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <!--Delete-->
            <v-layout>
              <v-flex xs2>
                <v-btn color="primary" dark v-on="on" class="clear">Delete</v-btn>
                <v-dialog v-model="dialog3" max-width="490"></v-dialog>
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
import sidebarsuper from "@/superadmin/component/sidebarsuper";
import axios from "axios";

export default {
  name: "positionsuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      positionData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "positionId",
          label: "positionId",
          width: "40",
          numeric: true
        },
        {
          field: "positionName",
          label: "positionName"
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
  methods: {},
  created() {
    axios.get("http://localhost:3000/api/getallposition").then(response => {
      this.positionData = response.data;
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
