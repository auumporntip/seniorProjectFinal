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
  name: "typeofservicesuper",
  components: {
    Header,
    sidebarsuper
  },
  data() {
            return {
                data: [],
                checkboxPosition: 'left',
                checkedRows: [],
                columns: [
                    {
                        field: 'typeId',
                        label: 'typeId',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'typeName',
                        label: 'typeName',
                    },
                    {
                        field: 'typeTime',
                        label: 'typeTime',
                    },
                    {
                        field: 'typePrice',
                        label: 'typePrice',
                    },
                    {
                        field: 'restaurantId',
                        label: 'restaurantId',
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
</style>
