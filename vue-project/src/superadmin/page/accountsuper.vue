<template>
  <div>
    <Header></Header>
    <sidebarsuper></sidebarsuper>
    <div id="bigbox">
      <section>
        <b-tabs>
          <b-tab-item label="Table">
            <b-table
              :data="accountData"
              :columns="columns"
              :checked-rows.sync="checkedRows"
              :is-row-checkable="(row) => row.id !== 3"
              checkable
              :checkbox-position="checkboxPosition"
            >
              <template slot="bottom-left">
                <b>Total checked</b>
                : {{ checkedRows.length }}
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
import axios from "axios";

export default {
  name: "accountsuper",
  components: {
    Header,
    sidebarsuper
  },
  data() {
    return {
      accountData: [],
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "accountId",
          label: "accountId",
          width: "40",
          numeric: true
        },
        {
          field: "username",
          label: "username"
        },
        {
          field: "password",
          label: "password"
        },
        {
          field: "email",
          label: "email"
        },
        {
          field: "name",
          label: "Name"
        },
        {
          field: "surname",
          label: "surname"
        },
        {
          field: "phone",
          label: "phone"
        },
        {
          field: "created_at",
          label: "created_at"
        },
        {
          field: "update_at",
          label: "update_at"
        }
      ]
    };
  },
  created() {
    axios.get("http://localhost:3000/api/getallaccount").then(response => {
      this.accountData = response.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bigbox {
  background-color: #f0cab1;
  width: 1170px;
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;
}
</style>
