<template>
  <div>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section class="bg">
        <b-tabs>
          <v-card-title class="title">NOTIFICATION</v-card-title>
          <b-table
            :data="notiData"
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
                      Add Notification
                      <v-form ref="form">
                        <v-container fluid>
                          <v-text-field
                            label="NotiMessage"
                            v-model="newNoti.notiMessage"
                            :rules="messageRules"
                          ></v-text-field>
                          <v-text-field
                            label="RestaurantId"
                            type="number"
                            v-model="newNoti.restaurantId"
                            :rules="resIdRules"
                          ></v-text-field>
                          <v-text-field label="BillId" v-model="newNoti.billId"></v-text-field>
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
                      Edit Notification
                      <v-form>
                        <v-container v-for="noti in checkedRows" :key="noti.notiId">
                          <v-text-field label="NotiId" disabled v-model="noti.notiId"></v-text-field>
                          <v-text-field label="NotiMessage" v-model="noti.notiMessage"></v-text-field>
                          <v-text-field label="RestaurantId" v-model="noti.restaurantId"></v-text-field>
                          <v-text-field label="BillId" v-model="noti.billId"></v-text-field>
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
  name: "notificationsuper",
  components: {
    sidebarsuper
  },
  data() {
    return {
      //Add
      addDialog: false,
      newNoti: [],
      messageRules: [v => !!v || "Notification Message is required"],
      resIdRules: [v => !!v || "Restaurant Id is required"],

      //Edit
      editDialog: false,

      notiData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "notiId",
          label: "Notification Id",
          width: "40",
          numeric: true
        },
        {
          field: "notiMessage",
          label: "Notification Message"
        },
        {
          field: "restaurantId",
          label: "Restaurant Id"
        },
        {
          field: "billId",
          label: "Bill Id"
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
        console.log(this.newNoti);
        axios
          .post("http://localhost:3000/api/insertNotification", {
            notiId: this.newNoti.notiId,
            notiMessage: this.newNoti.notiMessage,
            resId: this.newNoti.resId,
            billId: this.newNoti.billId
          })
          .then(response => {
            this.reNotification();
            this.newNoti = [];
            this.$refs.form.resetValidation();
          });
        this.addDialog = false;
      }
    },
    addCancel() {
      this.addDialog = false;
      this.newNoti = [];
    },
    editSave() {
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .put(
            "http://localhost:3000/api/updateNotification/",
            this.checkedRows[index]
          )
          .then(() => {
            this.reNotification();
          });
      }
      this.editDialog = false;
    },
    reNotification() {
      axios
        .get("http://localhost:3000/api/getallnotification")
        .then(response => {
          this.notiData = response.data;
        });
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
                  "http://localhost:3000/api/deleteMenu/" +
                    this.checkedRows[index].menuId +
                    "/" +
                    this.checkedRows[index].restaurantId
                )
                .then(() => {
                  this.reMenu();
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
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallnotification").then(response => {
      this.notiData = response.data;
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