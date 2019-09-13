
<template>
  <div>
    <sidebar></sidebar>
    <div id="barcolor"></div>
    <div id="boxright">
      <span id="typeofservice"> Type Of Service </span>
  
      <xp:table id="table" width="700" height="650" cellspacing="0" >
         <tr>
           <!-- dialog แรก-->
            <td>
              <template>
                  <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="600px">
             <template v-slot:activator="{ on }">
                  <img class="Row1col1" src="assets/yakiniku1.png" width="300px" height="350px" v-on="on">
              </template>
      <v-card>
        <v-card-title>
          <span class="headline">YAKINIKU</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <section>
                <b-field>
                  <b-upload v-model="dropFiles" drag-drop>
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon icon="upload" size="is-large"></b-icon>
                        </p>
                        <p>Drop your files here or click to upload</p>
                    </div>
                </section>
            </b-upload>
        </b-field>
        <div class="tags">
            <span v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
            </span>
        </div>
    </section>

              <v-flex xs12 sm6 md4 class="name">
                <v-text-field label="Name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 class="time">
                <v-text-field label="Time" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 class="price">
                <v-text-field label="Price" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 class="chooseMenuBtn"><!-- dialog choose menu-->
              <template>
                <v-layout row justify-center>
                  <v-dialog v-model="dialog" scrollable max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn medium color="#B22222" dark v-on="on"><v-icon dark>book</v-icon>Choose menu to YAKINIKU</v-btn>
      </template>
      <v-card>
        <v-card-title>Menu</v-card-title>
        <v-card-text style="height: 400px;">
          <v-container fluid v-model="selected" column>
    <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
    <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
  </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout></template>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Add Menu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
</td>










            <td><a href="/"><img class="Row1col2" src="assets/sushi11.png" width="300px" height="350px"></a> </td>
            <td><a href="/"><img class="Row1col3" src="assets/sashimi11.png" width="300px" height="350px"></a> </td>
            <!-- <td>Row 1, Column 2</td>
            <td>Row 1, Column 3</td> -->
         </tr>
         <tr>
           <td><a href="../AddCategory"><div class="Row2col1">
             <center><img class="Row2col11" src="assets/add.png" width="100px" height="250px"></center>
             </div></a>
          </td>
         </tr>
         <!-- <tr> แถวสองซ้ายสุด
            <td>Row 2, Column 1</td>
            <td>Row 2, Column 2</td>
         </tr> -->
      </xp:table>
      
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
  data: () => ({
      dialog: false
    }),
    data() {
            return {
                dropFiles: []
            }
        },
        methods: {
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            }
        },
        data1() {
      return {
        selected: ['']
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boxright {
  background-color: #f0cab1;
  width: 1170px;
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;  
}
#typeofservice{
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
   padding-left: 40px;
  padding-top: 10px;
  float:left;
}
.Row1col1{
  margin-left: 50px;
  margin-top: 50px;
  float: left;
}
.Row1col2{

  float: center;
  margin-left: 50px;
  margin-top: 50px;
}
.Row1col3{
  
  float: center;
  margin-left: 50px;
  margin-top: 50px;
}
.Row2col1{
  margin-left: 50px;
  margin-top: 60px;
  float: left;
  background-color: gray;
  width:300px;
  height:200px;
}
.Row2col11{
  margin-top: 50px;
}

.name{
  margin-left: 60%;
  margin-top: -40%;
}

.time{
  margin-left: 60%;
  margin-top: -30%;
}

.price{
  margin-left: 60%;
  margin-top: -20%;
}

.chooseMenuBtn{
  margin-left: 7%;
}
</style>
