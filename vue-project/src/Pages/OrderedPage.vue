<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <section class="space">
      <b-tabs>
        <b-tab-item label="Ordered">
          <b-input placeholder="Search..."
                type="search"
                icon="magnify">
            </b-input>
          <b-table
            :data="ordered"
            :columns="columns"
            :paginated="isPaginated"
            :per-page="perPage"
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
          <div class="space-btn">
            <v-btn color="primary" dark @click.stop="test">Change Status</v-btn>
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-card-text class="headline">
                  What status do you want to change?
                  <v-radio-group v-model="radioGroup">
                    <v-radio label="Preparing" value="1"></v-radio>
                    <v-radio label="Cooking" value="2"></v-radio>
                    <v-radio label="Serving" value="3"></v-radio>
                    <v-radio label="Cancel" value="4"></v-radio>
                  </v-radio-group>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
                  <v-btn color="green darken-1" text @click="clickSave">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </b-tab-item>
      </b-tabs>

    </section>
  </div>
</template>
          

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";

export default {
  name: "OrderedPage",
  components: {
    Header,
    sidebar
  },
  data() {
    return {
      ordered: [],
      dialog: false,
      isPaginated: true,
      radioGroup: 1,
      perPage: 10,
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "transId",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "tableNumber",
          label: "Table No."
        },
        {
          field: "menuName",
          label: "Menu Name"
        },
        {
          field: "numOfTrans",
          label: "Amount"
        },
        {
          field: "transDate",
          label: "Date",
          centered: true
        },
        {
          field: "statusName",
          label: "Status"
        }
      ]
    };
  },
  methods: {
    test() {
      this.dialog = true;
    },
    async clickSave() {
      console.log(this.radioGroup);
      const promiseArr = [];
      for (let index = 0; index < this.checkedRows.length; index++) {
        promiseArr.push(
          axios.put(
            "http://localhost:3000/api/changestatus/" +
              this.checkedRows[index].transId +
              "/" +
              this.radioGroup
          )
        );
      }
      await Promise.all(promiseArr);

      axios.get("http://localhost:3000/api/gettransaction/1").then(response => {
        this.ordered = response.data;
      });
      this.checkedRows = [];
      this.dialog = false;
    }
  },
  created: function() {
    axios.get("http://localhost:3000/api/gettransaction/1").then(response => {
      this.ordered = response.data;
    });
  }
};
</script>

<style scoped>
.space {
  margin-left: 15%;
}
.space-btn {
  margin-left: 85%;
}
</style>
