<template>
  <v-layout id="layout">
    <v-flex xs2>
    <v-dialog v-model= "dialog" persistent max-width="600px">
      <template v-slot:activator= "{ on }">
        <v-btn color="primary" dark v-on= "on">Edit Menu</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Menu</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs5 sm3>
                <img src="../assets/1.png" width="80px" height="80px">
              </v-flex>
              <v-flex xs7 sm6>
                <v-text-field label="Menu Name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Menu Price" required></v-text-field>
              </v-flex>
               <v-flex xs12>
                   <v-combobox
                     v-model="select"
                      :items="items"
                       
                     ></v-combobox>
                </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "axios";
  export default {
      name: 'Edit',
    data: () => ({
      dialog: false
    }),
  data(){
  return {
        select: 'Yakiniku',
        items: [
          'Yakiniku',
          'Sushi',
          'Sashimi',
          'ฺBeverage'
        ]
        }
      },
  }
</script>
<style>
#layout{
    margin-left: 400px;
    margin-top: 20px;
    position: absolute;
}
</style>