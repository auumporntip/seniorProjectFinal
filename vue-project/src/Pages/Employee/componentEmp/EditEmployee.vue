<template>
  <div>
    <v-layout>
      <v-flex xs2>
        <!-- <v-btn color="black" outline v-on="on" @click="checkSelected()"> -->
        <v-icon @click="editButton">edit</v-icon>
        <!-- </v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Menu</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-text-field label="Name"></v-text-field>
                      <v-text-field label="Username"></v-text-field>
                      <v-text-field label="Email"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-select label="Select Position"></v-select>
                      <v-text-field label="Password"></v-text-field>
                      <v-text-field label="Phone"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="confirmAdd">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../../../store/store";

export default {
  name: "EditEmployee",
  data() {
    return {
      dialog: false,
      employee:''
    };
  },
  methods: {
    editButton() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    confirmEdit() {
      this.dialog = false;
    }
  },
  computed: {},
  created() {
    this.employee = this.$store.getters.employee
    console.log(this.employee);
    
  },
};
</script>
<style scoped>
div.error--text {
  color: rgba(255, 34, 34, 0.86) !important;
}
.uploadBtn {
  padding-top: 5%;
  padding-left: 25%;
}
.name {
  padding-left: 25%;
}
.imageSize {
  margin-left: 4%;
}
</style>
