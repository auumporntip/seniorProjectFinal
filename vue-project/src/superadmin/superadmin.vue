<template>
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
</template>

<script>
    export default {
        name: "Superadmin",

        data() {
            return {
                data: [],
                checkboxPosition: 'left',
                checkedRows: [],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'first_name',
                        label: 'First Name',
                    },
                    {
                        field: 'last_name',
                        label: 'Last Name',
                    },
                    {
                        field: 'date',
                        label: 'Date',
                        centered: true
                    },
                    {
                        field: 'gender',
                        label: 'Gender',
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
    }
</script>
