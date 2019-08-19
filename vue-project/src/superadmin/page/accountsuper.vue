<template>
  <div>
    <Header></Header>
    <sidebarsuper></sidebarsuper>
    <div id= "bigbox">
      <section>
        <b-tabs>
            <b-tab-item label="Table">
                <b-table
                    :data="account"
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
                  Add Account
                  <v-form>
                    <v-container fluid>
                      <v-row>
                        
                  <v-col cols="12"><v-text-field label="AccountId" required></v-text-field></v-col>
                  <v-col cols="12" sm="6"><v-text-field label="Username" required></v-text-field></v-col>
                  <v-col cols="12" sm="6"><v-text-field label="Password" required></v-text-field></v-col>
                  <v-col ><v-text-field label="Email"></v-text-field></v-col>
                  <v-col ><v-text-field label="Name"></v-text-field></v-col>
                  <v-col ><v-text-field label="Surname"></v-text-field></v-col>
                  <v-col ><v-text-field label="Phone"></v-text-field></v-col>
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
                  Edit Account
                  <v-form>
                    <v-container>
                      <v-row>
                        
                  <v-col ><v-text-field label="AccountId"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Username"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Password"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Email"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Name"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Surname"></v-text-field></v-col>
                  <v-col cols="12" sm="6" md="3"><v-text-field label="Phone"></v-text-field></v-col>
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
            <v-dialog v-model="dialog" max-width="490">
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
  name: "accountsuper",
  components: {
    Header,
    sidebarsuper
  },
  data() {
            return {
                account: [],
                dialog:false,
                dialog2:false,
                checkboxPosition: 'left',
                checkedRows: [],
                columns: [
                    {
                        field: 'accountId',
                        label: 'accountId',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'username',
                        label: 'username',
                    },
                    {
                        field: 'password',
                        label: 'password',
                    },
                    {
                        field: 'email',
                        label: 'email',
              
                    },
                    {
                        field: 'name',
                        label: 'Name',
                    },
                    {
                        field: 'surname',
                        label: 'surname',
                    },{
                        field: 'phone',
                        label: 'phone',
                    },{
                        field: 'created_at',
                        label: 'created_at',
                    },{
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
            axios.get("http://localhost:3000/api/getallaccount").then(response=>{
                this.account=response.data;
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
