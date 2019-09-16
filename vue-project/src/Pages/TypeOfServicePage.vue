<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">TYPE OF SERVICE</v-card-title>
        <v-layout justify-space-around>
          <v-flex xs3>
            <v-card class="card">
              <v-img :src="require('../assets/add.png')" aspect-ratio="1.5"></v-img>
              <v-btn
                class="subheading font-weight-medium"
                block
                id="text"
                @click="newDialog=true"
              >ADD TYPE OF SERVICE</v-btn>
              <v-dialog max-width="350" v-model="newDialog">
                <v-card>
                  <v-card-text class="title">
                    New type of service
                    <v-form ref="form">
                      <v-container>
                        <v-text-field label="Name" v-model="newType.typeName" :rules="nameRules"></v-text-field>
                        <v-text-field label="Time" v-model="newType.typeTime" :rules="timeRules"></v-text-field>
                        <v-text-field
                          label="Price"
                          type="number"
                          v-model="newType.typePrice"
                          :rules="priceRules"
                        ></v-text-field>
                        <!-- <v-text-field
                          label="Restaurant ID"
                          v-model="newType.typeResId"
                          :rules="resIdRules"
                        ></v-text-field> -->
                        <b-field class="file">
                          <b-upload v-model="file">
                            <a class="button">
                              <b-icon icon="upload"></b-icon>
                              <span>Click to upload image</span>
                            </a>
                          </b-upload>
                        </b-field>
                        <div class="tags">
                          <span class="tag is-dark" v-if="file" color="blue lighten-2">{{file.name}}</span>
                        </div>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="red" @click="newDialog=false">Cancel</v-btn>
                    <v-btn flat color="darkgrey" @click="clickSaveNew">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card class="card">
              <v-img :src="require('../assets/yakiniku2.jpg')" aspect-ratio="1.5"></v-img>
              <v-btn
                class="subheading font-weight-medium"
                block
                id="text"
                @click="showMenu"
              >Premium Buffet</v-btn>
              <v-dialog max-width="490" v-model="menuDialog">
                <v-card>
                  <v-card-text class="title">
                    Choose menu for Premium Buffet
                    <v-form>
                      <v-container>
                        <b-table
                          :data="menuData"
                          :columns="columns"
                          :checked-rows.sync="checkedRows"
                          :is-row-checkable="(row) => row.id !== 3"
                          checkable
                          :checkbox-position="checkboxPosition"
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
                    <v-btn flat color="red" @click="menuDialog=false">Cancel</v-btn>
                    <v-btn flat color="darkgrey">Add</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-flex>

          <v-flex xs3>
            <v-card class="card">
              <v-img :src="require('../assets/sushi2.jpg')" aspect-ratio="1.5"></v-img>
              <v-btn class="subheading font-weight-medium" block id="text">Platinum Buffet</v-btn>
            </v-card>
          </v-flex>

          <v-flex xs3>
            <v-card class="card">
              <v-img :src="require('../assets/sashimi2.jpg')" aspect-ratio="1.5"></v-img>
              <v-btn class="subheading font-weight-medium" block id="text">A-La-Carte</v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
export default {
  name: "TypeOfServicePage",
  components: {
    sidebar
  },
  data() {
    return {
      typeData: [],
      newType: [],
      nameRules: [v => !!v || "Menu name is required"],
      timeRules: [v => !!v || "Time is required"],
      priceRules: [v => !!v || "Price is required"],
      resIdRules: [v => !!v || "Restaurant ID is required"],
      newDialog: false,
      file: null,
      menuDialog: false,
      menuData: [],
      checkboxPosition: "left",
      checkedRows: [],
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
    showMenu() {
      this.menuDialog = true;
      axios.get("http://localhost:3000/api/getallMenu").then(response => {
        this.menuData = response.data;
      });
    },
    clickSaveNew() {
      if (this.$refs.form.validate()) {
        console.log(this.newType);
        axios
          .post("http://localhost:3000/api/insertTypeOfService", {
            typeName: this.newType.typeName,
            typeTime: this.newType.typeTime,
            typePrice: this.newType.typePrice,
            restaurantId: this.newType.restaurantId
          })
          .then(response => {
            this.newType = [];
            this.$refs.form.resetValidation();
          });
        this.newDialog = false;
      }
    },
    created() {
      axios
        .get("http://localhost:3000/api/getallTypeOfService")
        .then(response => {
          this.typeData = response.data;
        });
    }
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
}
.textTable {
  font-size: 15px;
}
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
</style>