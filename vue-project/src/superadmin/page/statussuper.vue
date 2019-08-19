<template>
  <div>
    <Header></Header>
    <sidebarsuper></sidebarsuper>
    <div id= "bigbox">
      <section>
        <b-tabs>
            <b-tab-item label="Table">
                <b-table
                    :data="data"
                    :columns="columns"
                    :checked-rows.sync="checkedRows"
                    :is-row-checkable="(row) => row.id"
                    checkable
                    :checkbox-position="checkboxPosition">

                    <template slot="bottom-left">
                        <b>Total checked</b>: {{ checkedRows.length }}
                    </template>
                </b-table>
            </b-tab-item>
                <span id = "Addeditdelete" >
              <!--Add-->
               <v-layout id="layoutAdd">
                <v-flex xs2>
           <v-btn color="primary" dark @click.stop="test" class="add">Add</v-btn>
            <v-dialog v-model="dialog" max-width="490">
              <v-card>
                <v-card-text class="headline">
                  Add Employee
                  <v-form>
                    <v-container fluid>
                      <v-row>
                        
                  <v-col ><v-text-field label="StatusId"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="StatusName"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Created_at"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Update_at"></v-text-field></v-col>
                 
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
                  Edit Employee
                  <v-form>
                    <v-container>
                      <v-row>
                        
                  <v-col ><v-text-field label="StatusId"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="StatusName"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Created_at"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Update_at"></v-text-field></v-col>
                 
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
              <v-layout id="layoutDelete">
                <v-flex xs2>
            <v-btn color="primary" dark v-on="on" class="clear">Delete</v-btn>
            <v-dialog v-model="dialog3" max-width="490">
            </v-dialog>
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
import Header from "@/components/Header";
import sidebarsuper from "@/superadmin/component/sidebarsuper";
 
export default {
  name: "statussuper",
  components: {
    Header,
    sidebarsuper
  },
  data() {
            return {
                data: [],
                dialog:false,
                dialog2:false,
                checkboxPosition: 'left',
                checkedRows: [],
                columns: [
                    {
                        field: 'statusId',
                        label: 'statusId',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'statusName',
                        label: 'statusName',
                    },
                    {
                        field: 'created_at',
                        label: 'created_at',
                    },
                    {
                        field: 'update_at',
                        label: 'update_at',
                    }
                ]
            }
        },
        methods: {
             test() {
            this.dialog = true;
            },
            test2(){
              this.dialog2=true;
            },
        },
        create: function(){
            axios.get("http://localhost:3000/api/gettransaction/1").then(response=>{
                this.data=response.data;
            })
        }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bigbox{
  background-color: #f0cab1;
  width: 1170px;
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;  
    
}
#Addeditdelete {
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  float: center;
}
#layoutDelete {
  margin-left: 600px;
  margin-top: 0px;

}
#layoutEdit {
  margin-left: 400px;
  margin-top: 0px;
  position: absolute;
}
#layoutAdd {
  margin-left: 200px;
  margin-top: 0px;
  position: absolute;
}
</style>
