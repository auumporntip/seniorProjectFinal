<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">
          TYPE OF SERVICE
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
          <!-- add new type -->

          <!-- type -->
          <v-container fluid>
            <v-layout wrap>
              <v-flex xs3>
                <v-card class="card">
                  <v-img
                    :src="require('../assets/add.png')"
                    aspect-ratio="1.5"
                    @click="newTypeDialog=true"
                  ></v-img>
                  <v-btn
                    class="subheading font-weight-medium"
                    block
                    id="text"
                    @click="newTypeDialog=true"
                  >ADD TYPE OF SERVICE</v-btn>
                  <v-dialog max-width="600px" persistent v-model="newTypeDialog" data-app>
                    <v-card>
                      <v-card-title style="padding-bottom:0%;">
                        <span class="nameDialog">Add new type of service</span>
                      </v-card-title>
                      <v-card-text>
                        <v-form ref="form">
                          <v-container grid-list-md style="padding-top:0%;">
                            <v-layout wrap>
                              <div v-if="image == null">
                                <v-img
                                  :src="require('../assets/add.png')"
                                  aspect-ratio="1.5"
                                  class="imageSize"
                                  style="margin-left:5%; margin-top:1%;"
                                ></v-img>
                              </div>
                              <div v-else>
                                <v-img
                                  :src="image"
                                  aspect-ratio="1.5"
                                  class="imageSize"
                                  style="margin-left:5%; margin-top:1%;"
                                ></v-img>
                              </div>
                              <b-field class="file">
                                <b-upload
                                  v-model="image"
                                  v-on:input="fileChange"
                                  class="uploadBtn"
                                  accept="image/*"
                                >
                                  <a class="button is-info" outlined>
                                    <b-icon icon="upload"></b-icon>
                                    <span>Click to upload image</span>
                                  </a>
                                </b-upload>
                              </b-field>
                              <v-layout column style="margin-left:45%; margin-top:-45%;">
                                <v-text-field
                                  label="Name"
                                  v-model="newType.typeName"
                                  :rules="nameRules"
                                ></v-text-field>
                                <v-radio-group v-model="row" row>
                                  <v-radio label="A-LA-CARTE" value="alacarte"></v-radio>
                                  <v-radio label="BUFFET" value="buffet"></v-radio>
                                </v-radio-group>
                                <div v-if="row === 'buffet'">
                                  <v-layout row>
                                    <v-flex xs6 order-md1 order-xs2>
                                      <v-text-field
                                        label="Time Limit"
                                        type="number"
                                        suffix="Hr."
                                        placeholder="1"
                                        v-model="hour"
                                        :rules="hourRules"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs6 order-md3 order-xs3>
                                      <v-text-field
                                        label
                                        type="number"
                                        suffix="Min."
                                        placeholder="30"
                                        v-model="minute"
                                        :rules="minuteRules"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-text-field
                                    label="Price"
                                    type="number"
                                    v-model="newType.typePrice"
                                    :rules="priceRules"
                                  ></v-text-field>
                                </div>
                              </v-layout>
                            </v-layout>
                          </v-container>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="#7d7a73" @click="newTypeCancel">CANCEL</v-btn>
                        <v-btn flat color="#305378" @click="newTypeSave">SAVE</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-flex>

              <v-flex xs3 v-for="type in items" :key="type.typeId">
                <v-card class="card">
                  <v-img
                    v-if="type.typePathImage != null"
                    :src="type.typePathImage"
                    aspect-ratio="1.5"
                    @click="editTypeDialog=true"
                  ></v-img>
                  <v-img
                    v-else
                    :src="require('../assets/nophoto.png')"
                    aspect-ratio="1.5"
                    @click="editTypeDialog=true"
                  ></v-img>
                  <v-btn
                    class="subheading font-weight-medium"
                    block
                    id="text"
                    @click="clickType(type)"
                  >{{type.typeName}}</v-btn>
                </v-card>
                <v-icon class="iconClose" @click="deleteButton(type.typeId)">cancel</v-icon>
              </v-flex>
              <v-dialog v-model="deleteDialog" max-width="290" data-app persistent>
                <v-card>
                  <v-card-title class="title">DELETE CONFIRMATION</v-card-title>
                  <v-card-text class="confirmDialog">
                    <v-icon color="red">warning</v-icon>You sure you want to delete this type of service?
                    You can't undo this action
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="deleteDialog = false">NO</v-btn>
                    <v-btn color="red darken-1" flat @click="clickYesDeleteDialog()">YES</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- edit -->
              <v-dialog max-width="600px" persistent v-model="editTypeDialog" data-app>
                <v-card>
                  <v-card-title style="padding-bottom:0%;">
                    <span class="nameDialog">Edit type of service</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form">
                      <v-container grid-list-md style="padding-top:0%;">
                        <v-layout wrap>
                          <div v-if="image != null">
                            <v-img :src="image" class="imageSize"></v-img>
                          </div>
                          <div v-else-if="typeOfServiceForDialog.typePathImage==null">
                            <v-img :src="require('../assets/add.png')" class="imageSize"></v-img>
                          </div>
                          <div v-else>
                            <v-img :src="typeOfServiceForDialog.typePathImage" class="imageSize"></v-img>
                          </div>
                          <b-field class="file">
                            <b-upload
                              v-model="image"
                              v-on:input="fileChange"
                              accept="image/*"
                              class="uploadBtn"
                            >
                              <a class="button is-info" outlined>
                                <b-icon icon="upload"></b-icon>
                                <span>Click to upload image</span>
                              </a>
                            </b-upload>
                          </b-field>
                          <v-layout column style="margin-left:45%; margin-top:-45%;">
                            <v-flex xs6>
                              <v-text-field
                                label="Name"
                                v-model="typeOfServiceForDialog.typeName"
                                :rules="editNameRules"
                              ></v-text-field>
                              <v-radio-group v-model="row" row>
                                <v-radio label="A-LA-CARTE" value="alacarte"></v-radio>
                                <v-radio label="BUFFET" value="buffet"></v-radio>
                              </v-radio-group>
                              <div v-if="row === 'buffet'">
                                <v-layout row>
                                  <v-flex xs6 order-md1 order-xs2>
                                    <v-text-field
                                      label="Time Limit"
                                      type="number"
                                      suffix="Hr."
                                      placeholder="1"
                                      v-model="typeOfServiceForDialog.hour"
                                      :rules="editHourRules"
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs6 order-md3 order-xs3>
                                    <v-text-field
                                      label="Time Limit"
                                      type="number"
                                      suffix="Min."
                                      placeholder="30"
                                      v-model="typeOfServiceForDialog.minute"
                                      :rules="editMinuteRules"
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                                <v-text-field
                                  label="Price"
                                  type="number"
                                  v-model="typeOfServiceForDialog.typePrice"
                                  :rules="priceRules"
                                ></v-text-field>
                              </div>
                              <!-- dialog add menu -->
                              <a class="button is-info" id="buttonAdd" @click="showMenu">
                                <b-icon icon="plus"></b-icon>
                                <span>Add menu for this type of service</span>
                              </a>
                              <v-dialog width="700" v-model="menuDialog" data-app>
                                <v-card>
                                  <v-card-text class="nameDialog">
                                    Choose menu for this type of service
                                    <v-form>
                                      <v-container>
                                        <b-table
                                          :data="menuData"
                                          :columns="columns"
                                          :checked-rows.sync="checkedRows"
                                          :is-row-checkable="(row) => row.id !== 3"
                                          checkable
                                          :checkbox-position="checkboxPosition"
                                          :paginated="isPaginated"
                                          :per-page="perPage"
                                          :icon-prev="prevIcon"
                                          :icon-next="nextIcon"
                                          class="textTable"
                                        >
                                          <template slot="bottom-left">
                                            <b>Total checked</b>
                                            : {{ checkedRows.length }}
                                          </template>
                                        </b-table>
                                      </v-container>
                                    </v-form>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="#7d7a73" @click="cancelAddMenu">CANCEL</v-btn>
                                    <v-btn flat color="#305378" @click="addMenu">ADD</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-flex>
                          </v-layout>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="#7d7a73" @click="editTypeCancel">CANCEL</v-btn>
                    <v-btn flat color="#305378" @click="editTypeSave">SAVE</v-btn>
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
import { host } from "./data";

export default {
  name: "TypeOfServicePage",
  components: {
    sidebar
  },
  data() {
    return {
      typeId: "",
      deleteDialog: false,
      newType: {
        typePrice: 0
      },
      typeData: [],

      nameRules: [
        v => !!v || "Name is required",
        v => (v && this.checkName()) || "This name has already"
      ],
      hourRules: [
        v => (!!v && this.minute >= 0 && this.hour >= 0) || "Time is required"
      ],
      minuteRules: [
        v => (!!v && this.hour >= 0 && this.minute >= 0) || "Time is required",

        v => this.minute < 60 || "Minute เกิน 60 นาทีไม่ได้"
      ],
      priceRules: [
        v => !!v || "Price is required",
        v => v > 0 || "Price must more than zero",
        v => v < 5000 || "Price must less than 5000"
      ],

      editNameRules: [
        v => !!v || "Name is required",
        v => (v && this.editCheckName()) || "This name has already"
      ],
      editHourRules: [
        v =>
          (!!v && this.typeOfServiceForDialog.hour >= 0) || "Time is required"
      ],
      editMinuteRules: [
        v =>
          (!!v && this.typeOfServiceForDialog.minute >= 0) ||
          "Time is required",
        v =>
          this.typeOfServiceForDialog.minute < 60 || "Minute เกิน 60 นาทีไม่ได้"
      ],

      //search
      keyword: "",

      //add new type
      image: null,
      newTypeDialog: false,
      minute: 0,
      hour: 0,
      row: null,

      //uploadFile
      imageForUpload: null,
      pathImage: null,

      //edit type
      editTypeDialog: false,
      selectedType: {},
      editType: [],
      typeOfServiceForDialog: {},
      editTypeName: "",

      //loop
      type: [],
      types: {
        typePrice: 0
      },

      //add menu dialog
      checkBoxData: [],
      menuDialog: false,
      menuData: [],
      checkboxPosition: "left",
      checkedRows: [],
      isPaginated: true,
      perPage: 10,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      columns: [
        {
          field: "menuId",
          label: "Id",
          numeric: true
        },
        {
          field: "menuName",
          label: "Name"
        },
        {
          field: "menuPrice",
          label: "Price"
        }
      ]
    };
  },
  methods: {
    fileChange() {
      this.imageForUpload = this.image;
      this.createImage(this.image);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = e => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    newTypeSave() {
      if (this.$refs.form.validate()) {
        if (this.imageForUpload != null) {
          var formData = new FormData();
          formData.append("file", this.imageForUpload);
          axios.post(host + "uploadFB", formData).then(response => {
            this.pathImage = response.data.url;
            console.log(response.data.url);
            axios
              .post(host + "inserttypeOfService", {
                typeName: this.newType.typeName,
                typeTime: this.hour + "." + this.minute,
                typePrice: this.newType.typePrice,
                typePathImage: this.pathImage,
                service: this.row,
                restaurantId: 1
              })
              .then(response => {
                this.newTypeCancel();
                this.refreshPage();
                this.$refs.form.resetValidation();
              });
          });
        } else {
          console.log(
            this.newType.typeName +
              "typeTime" +
              this.hour +
              "." +
              this.minute +
              "typePrice" +
              this.newType.typePrice +
              "typePathImage" +
              this.imageForUpload +
              "service" +
              this.row +
              "restaurantId" +
              1
          );
          axios
            .post(host + "inserttypeOfService", {
              typeName: this.newType.typeName,
              typeTime: this.hour + "." + this.minute,
              typePrice: this.newType.typePrice,
              typePathImage: this.imageForUpload,
              service: this.row,
              restaurantId: 1
            })
            .then(response => {
              console.log(response.data);
              this.newTypeCancel();
              this.refreshPage();
              this.$refs.form.resetValidation();
            });
        }
      }
    },
    newTypeCancel() {
      this.newType = [];
      this.image = null;
      this.newTypeDialog = false;
      this.imageForUpload = null;
      this.pathImage = null;
      this.minute = null;
      this.hour = null;
      this.row = null;
      this.$refs.form.rules;
      this.$refs.form.resetValidation();
    },
    editTypeCancel() {
      console.log(this.checkedRows.length);
      axios.get(host + "getalltypeofservice").then(response => {
        this.typeData = response.data;
        this.selectedMenu = {};
        this.image = null;
        this.imageForUpload = null;
        this.editTypeDialog = false;
      });
    },
    editTypeSave() {
      this.typeOfServiceForDialog.typeTime =
        this.typeOfServiceForDialog.hour +
        "." +
        this.typeOfServiceForDialog.minute;
      this.typeOfServiceForDialog.service = this.row;
      if (this.row == "alacarte") {
        this.typeOfServiceForDialog.typeTime = 0;
        this.typeOfServiceForDialog.typePrice = 0;
      }
      if (this.$refs.form.validate()) {
        if (this.image == null) {
          axios
            .put(host + "updatetypeofservice/", this.typeOfServiceForDialog)
            .then(() => {
              this.editTypeCancel();
            });
        } else {
          var formData = new FormData();
          formData.append("file", this.imageForUpload);
          axios.post(host + "uploadFB", formData).then(response => {
            this.typeOfServiceForDialog.typePathImage = response.data.url;

            console.log(this.typeOfServiceForDialog.typePathImage);
            console.log(this.typeOfServiceForDialog);
            axios
              .put(host + "updatetypeofservice/", this.typeOfServiceForDialog)
              .then(() => {
                this.editTypeCancel();
              });
          });
        }
      }
    },
    showMenu() {
      this.menuDialog = true;
      axios
        .get(
          host +
            "getmenubytypeofserviceid/" +
            this.typeOfServiceForDialog.typeId
        )
        .then(response => {
          this.checkBoxData = response.data;
          axios.get(host + "getallMenu").then(response => {
            this.menuData = response.data;
            for (let index = 0; index < this.checkBoxData.length; index++) {
              var i = this.menuData.findIndex(
                menu => menu.menuId === this.checkBoxData[index].menuId
              );
              this.checkedRows.push(this.menuData[i]);
            }
          });
        });
    },
    cancelAddMenu() {
      this.checkedRows = [];
      this.menuDialog = false;
    },
    async addMenu() {
      const promiseArr = [];
      for (let index = 0; index < this.checkBoxData.length; index++) {
        promiseArr.push(
          axios.delete(
            host + "deletemenuservice/" + this.checkBoxData[index].menuServiceId
          )
        );
      }
      await Promise.all(promiseArr);
      for (let index = 0; index < this.checkedRows.length; index++) {
        axios
          .post(host + "insertMenuService/", {
            typeId: this.typeOfServiceForDialog.typeId,
            menuId: this.checkedRows[index].menuId
          })
          .then(() => {});
      }
      this.checkedRows = [];
      this.menuDialog = false;
    },
    refreshPage() {
      axios.get(host + "getalltypeofservice").then(response => {
        this.typeData = response.data;
      });
    },
    clickType(type) {
      this.editTypeName = type.typeName;
      this.typeOfServiceForDialog = type;
      var index = this.typeOfServiceForDialog.typeTime.indexOf(".");
      this.typeOfServiceForDialog.hour = this.typeOfServiceForDialog.typeTime.substring(
        0,
        index
      );
      this.typeOfServiceForDialog.minute = this.typeOfServiceForDialog.typeTime.substring(
        index + 1
      );
      console.log(this.typeOfServiceForDialog.hour);
      if (this.typeOfServiceForDialog.service == "alacarte") {
        console.log(this.typeOfServiceForDialog.service);
        this.row = "alacarte";
        this.editTypeDialog = true;
      } else {
        console.log(this.typeOfServiceForDialog.service);
        this.row = "buffet";
        this.editTypeDialog = true;
      }
    },
    deleteButton(typeId) {
      this.typeId = typeId;
      this.deleteDialog = true;
    },
    clickYesDeleteDialog() {
      axios
        .delete(host + "deletetypeOfService/" + this.typeId)
        .then(response => {
          if (response.data === false) {
            this.$toast.open("cannot delete");

            this.deleteDialog = false;
            this.refreshPage();
          } else {
            this.$toast.open("delete success");

            this.deleteDialog = false;
            this.refreshPage();
          }
        });
    },
    checkName() {
      for (let index = 0; index < this.typeData.length; index++) {
        if (
          this.newType.typeName.toLowerCase() ===
          this.typeData[index].typeName.toLowerCase()
        ) {
          return false;
        }
      }
      return true;
    },
    editCheckName() {
      if (
        this.typeOfServiceForDialog.typeName.toLowerCase() ===
        this.editTypeName.toLowerCase()
      ) {
        return true;
      } else {
        for (let index = 0; index < this.typeData.length; index++) {
          if (
            this.typeOfServiceForDialog.typeId === this.typeData[index].typeId
          ) {
            continue;
          }
          if (
            this.typeOfServiceForDialog.typeName.toLowerCase() ===
            this.typeData[index].typeName.toLowerCase()
          ) {
            return false;
          }
        }
        return true;
      }
    }
  },
  computed: {
    items() {
      if (this.keyword != "") {
        return this.typeData.filter(items =>
          items.typeName.toLowerCase().includes(this.keyword.toLowerCase())
        );
      } else {
        return this.typeData;
      }
    }
  },
  created() {
    axios.get(host + "getalltypeofservice").then(response => {
      this.typeData = response.data;
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
.textTable {
  font-size: 15px;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
.imageSize {
  width: 220px;
  height: 180px;
}
#buttonAdd {
  margin-top: 3%;
  margin-left: -1%;
  border: none;
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
.search {
  margin-left: 57%;
  position: absolute;
  margin-top: -1%;
}
.uploadBtn {
  padding-top: 110%;
  margin-left: -105%;
}
.nameDialog {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 2em;
}
</style>