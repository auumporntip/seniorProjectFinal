<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">
          ORDERED
          <v-text-field
            class="search"
            v-model="keyword"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-layout row wrap align-center>
            <v-subheader class="text">Status</v-subheader>
            <b-dropdown id="button">
              <v-btn flat slot="trigger">
                {{nameOfStatus}}
                <v-icon>keyboard_arrow_down</v-icon>
              </v-btn>

              <b-dropdown-item @click="allStatus">All Status</b-dropdown-item>
              <b-dropdown-item
                v-for="option in statusData"
                :value="option"
                :key="option.statusId"
                @click="changeStatus(option.statusName)"
              >{{option.statusName}}</b-dropdown-item>
            </b-dropdown>
          </v-layout>
        </v-card-title>
        <!-- <b-input placeholder="Search..." type="search" icon="magnify"></b-input> -->
        <b-table
          :data="items"
          :columns="columns"
          :paginated="isPaginated"
          :per-page="perPage"
          :checked-rows.sync="checkedRows"
          :is-row-checkable="(row) => row.id !== 3"
          checkable
          :checkbox-position="checkboxPosition"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
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
      </section>
    </div>
  </div>
</template>
          

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "OrderedPage",
  components: {
    sidebar
  },
  data() {
    return {
      nameOfStatus:"All Status",
      statusData: [],

      keyword: "",
      restaurantId: 1,
      ordered: [],
      dialog: false,
      isPaginated: true,
      radioGroup: 1,
      perPage: 10,
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "tableNumber",
          label: "Table No."
        },
        {
          field: "menuName",
          label: "Menu Name"
        },
        {
          field: "amount",
          label: "Amount"
        },
        {
          field: "time",
          label: "Time",
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
    allStatus(){
      this.keyword = ''
    },
    changeStatus(statusName){
      this.nameOfStatus= statusName
      this.keyword = statusName
    },
    test() {
      this.dialog = true;
    },
    async clickSave() {
      console.log(this.radioGroup);
      const promiseArr = [];
      for (let index = 0; index < this.checkedRows.length; index++) {
        promiseArr.push(
          axios.put(
            "http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:3000/api/changestatus/" +
              this.checkedRows[index].orderId +
              "/" +
              this.radioGroup
          )
        );
      }
      await Promise.all(promiseArr);

      for (let index = 0; index < this.checkedRows.length; index++) {
        if (this.radioGroup === "3") {
          axios.post("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:3000/api/inserttransaction", {
            menuName: this.checkedRows[index].menuName,
            transPrice: this.checkedRows[index].menuPrice,
            totalPrice:
              this.checkedRows[index].amount *
              this.checkedRows[index].menuPrice,
            amount: this.checkedRows[index].amount,
            statusName: "finsh",
            billId: this.checkedRows[index].billId
          });
        }
      }

      axios
        .get(
          "http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:3000/api/getorderbyrestaurantid/" +
            this.restaurantId
        )
        .then(response => {
          this.ordered = response.data;
        });
      this.checkedRows = [];
      this.dialog = false;
    }
  },
  computed: {
    items() {
      if (this.keyword != "") {
        return this.ordered.filter(
          items =>
            items.menuName.toLowerCase().includes(this.keyword.toLowerCase()) ||
            items.tableNumber == this.keyword.toLowerCase() ||
            items.statusName.toLowerCase().includes(this.keyword.toLowerCase())
        );
      } else {
        return this.ordered;
      }
    }
  },
  created: function() {
    axios
      .get(
        "http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:3000/api/getorderbyrestaurantid/" + this.restaurantId
      )
      .then(response => {
        this.ordered = response.data;
        for (let index = 0; index < this.ordered.length; index++) {
          this.ordered[index].time = dayjs(
            this.ordered[index].created_at
          ).format("HH:mm:ss");
        }
      });
    axios.get("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:3000/api/getallstatus").then(response => {
      this.statusData = response.data;
    });
  }
};
</script>

<style scoped>
.bg {
  background-color: #f0cab1;
  border-radius: 20px;
  padding: 1%;
}
#bigbox {
  background-color: #eeeeee;
  height: 800px;
  padding: 2%;
  margin-top: -800px;
  margin-left: 20%;
  background-attachment: fixed;
}
.space-btn {
  margin-left: 85%;
}
#button {
  margin-left: 86%;
  margin-top: -2.5%;
}
.search {
  margin-left: 57%;
  position: absolute;
  margin-top: 0%;
}
.text {
  margin-left: 75%;
  padding-top: 14%;
}
</style>
