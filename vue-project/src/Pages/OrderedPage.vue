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
            <v-subheader class="text" fixed>Status</v-subheader>
            <b-dropdown id="button" fixed>
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

        <!-- TIME -->
        <b-tabs v-model="activeTab" size="1000px" class="block" type="is-toggle">
          <b-tab-item label="Ordered by time">
            <b-table
              :data="items"
              :paginated="isPaginated"
              :per-page="perPage"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              <template slot-scope="props">
                <b-table-column
                  label="Table No."
                  width="100"
                >&nbsp;&nbsp;&nbsp;&nbsp;{{ props.row.tableNumber }}</b-table-column>
                <b-table-column label="Menu Name" width="250">{{ props.row.menuName }}</b-table-column>
                <b-table-column
                  label="Amount"
                  width="200"
                >&nbsp;&nbsp;&nbsp;&nbsp;{{ props.row.amount }}</b-table-column>
                <b-table-column label="Time" width="200">{{ props.row.time }}</b-table-column>
                <b-table-column label="Status" width="100">{{ props.row.statusName }}</b-table-column>
                <b-table-column label="Change Status" width="200">
                  <v-btn small outline color="indigo" @click.stop="test"><v-icon>repeat</v-icon>Change Status</v-btn>
                </b-table-column>
              </template>
            </b-table>

            <div class="space-btn">
              <!-- <v-btn color="primary" dark @click.stop="test">Change Status</v-btn> -->
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-text class="title">
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
                    <v-btn color="red darken-1" flat @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="clickSave">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </b-tab-item>

          <!-- menu -->
          <b-tab-item label="Ordered by menu">
            <div>
              <b-table
                :data="items"
                :paginated="isPaginated"
                :per-page="perPage"
                ref="table"
                detailed
                hoverable
                custom-detail-row
                :default-sort="['name', 'asc']"
                detail-key="name"
                @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
                :show-detail-icon="showDetailIcon"
              >
                <template slot-scope="props">
                  <b-table-column
                    field="menuName"
                    :visible="columnsVisible['menuName'].display"
                    :label="columnsVisible['menuName'].title"
                    width="300"
                    sortable
                  >
                    <template v-if="showDetailIcon">{{ props.row.menuName }}</template>
                    <template v-else>
                      <a @click="toggle(props.row)">{{ props.row.menuName }}</a>
                    </template>
                  </b-table-column>

                  <b-table-column
                    field="amount"
                    :visible="columnsVisible['amount'].display"
                    :label="columnsVisible['amount'].title"
                    sortable
                    centered
                  >{{ props.row.amount }}</b-table-column>

                  <b-table-column
                    field="statusName"
                    :visible="columnsVisible['statusName'].display"
                    :label="columnsVisible['statusName'].title"
                    sortable
                    centered
                  >{{ props.row.statusName }}</b-table-column>

                  <b-table-column>
                    <v-btn small outline color="indigo" @click.stop="test"><v-icon>repeat</v-icon>Change Status</v-btn>
                  </b-table-column>
                </template>

                <template slot="detail" slot-scope="props">
                  <tr v-for="(order, index) in props.row.detailOrders" :key="order.menuName">
                    <td v-if="showDetailIcon"></td>
                    <td
                      v-show="columnsVisible['menuName'].display"
                    >&nbsp;&nbsp;&nbsp;&nbsp;{{ order.menuName }}</td>
                    <td
                      v-show="columnsVisible['amount'].display"
                      class="has-text-centered"
                    >{{ order.amount }}</td>
                    <td
                      v-show="columnsVisible['statusName'].display"
                      class="has-text-centered"
                    >{{ order.statusName }}</td>
                  </tr>
                </template>
              </b-table>
            </div>
          </b-tab-item>
        </b-tabs>
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
      //ordered by menu
      data: [
        {
          detailOrders: []
        }
      ],
      columnsVisible: {
        menuName: { title: "Menu Name", display: true },
        amount: { title: "Amount", display: true },
        statusName: { title: "Status", display: true }
      },
      showDetailIcon: true,

      panel: [false, true, true],

      nameOfStatus: "All Status",
      statusData: [],
      activeTab: 0,

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
      checkedRows: []
    };
  },
  methods: {
    allStatus() {
      this.keyword = "";
    },
    changeStatus(statusName) {
      this.nameOfStatus = statusName;
      this.keyword = statusName;
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
            "http://localhost:3000/api/changestatus/" +
              this.checkedRows[index].orderId +
              "/" +
              this.radioGroup
          )
        );
      }
      await Promise.all(promiseArr);

      for (let index = 0; index < this.checkedRows.length; index++) {
        if (this.radioGroup === "3") {
          axios.post("http://localhost:3000/api/inserttransaction", {
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
          "http://localhost:3000/api/getorderbyrestaurantid/" +
            this.restaurantId
        )
        .then(response => {
          this.ordered = response.data;
        });
      this.checkedRows = [];
      this.dialog = false;
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
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
        "http://localhost:3000/api/getorderbyrestaurantid/" + this.restaurantId
      )
      .then(response => {
        this.ordered = response.data;
        for (let index = 0; index < this.ordered.length; index++) {
          this.ordered[index].time = dayjs(
            this.ordered[index].created_at
          ).format("HH:mm:ss");
        }
      });
    axios.get("http://localhost:3000/api/getallstatus").then(response => {
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
  padding-left: 5em;
  padding-top: 5%;
  margin: -7%;
}
.search {
  margin-left: 57%;
  position: absolute;
  margin-top: 0%;
}
.text {
  padding-left: 60em;
  padding-top: 5%;
  margin: -7%;
}
</style>
