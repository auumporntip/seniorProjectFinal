<template>
  <v-layout id="layoutAdd">
    <v-flex xs2>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Add Menu</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add Menu</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs5 sm3>
                  <img src="../assets/1.png" width="80px" height="80px">
                </v-flex>
                <v-flex xs7 sm6>
                  <v-text-field label="Menu Name" v-model="menuName" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Menu Price" v-model="menuPrice" required></v-text-field>
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
            <v-btn color="blue darken-1" flat @click="confirmAdd">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "axios";
export default {
  name: "AddMenuButton",
  data: () => ({
    dialog: false,
    menuName: "",
    menuPrice: "",
    categoryId: "",
    pathImage : "",
    restaurantId: "1"
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
  methods: {
    confirmAdd() {
      axios.post("http://localhost:3000/api/insertmenu", {
        menuName: this.menuName,
        menuPrice: this.menuPrice,
        categoryId: this.categoryId,
        pathImage: this.pathImage,
        restaurantId: this.restaurantId
      });
      this.dialog = false;
      console.log(this.menuName + this.menuPrice + this.categoryId + this.restaurantId);
    }
  }
  
};
</script>
<style>
#layoutAdd {
  margin-left: 200px;
  margin-top: 20px;
  position: absolute;
}
</style>