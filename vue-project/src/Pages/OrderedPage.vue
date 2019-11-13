<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <div class="space-btn">
        <v-dialog v-model="dialog" max-width="290" data-app>
          <v-card>
            <v-card-title style="padding-bottom:0%;">
              <span class="nameDialog">What status do you want to change?</span>
            </v-card-title>
            <v-card-text style="padding-top:0px;">
              <v-radio-group v-model="radioGroup">
                <v-radio v-if="checkStatus(1)" label="Preparing" value="1"></v-radio>
                <v-radio v-if="checkStatus(2)" label="Cooking" value="2"></v-radio>
                <v-radio v-if="checkStatus(3)" label="Serving" value="3"></v-radio>
                <v-radio label="Cancel" value="5"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#7d7a73" flat @click="cancelDialog">CANCEL</v-btn>
              <v-btn color="#305378" flat @click="saveChangeStatus">SAVE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
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
          <!-- <v-layout row wrap align-center>
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
          </v-layout>-->
        </v-card-title>

        <!-- TIME -->
        <v-tabs v-model="activeTab" color="#B7CDC2" slider-color="#EAE6DA" class="tabStyle">
          <v-tab ripple>Ordered by time</v-tab>
          <v-tab ripple>Ordered same menu</v-tab>

          <v-tab-item>
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
                <b-table-column label="Table No." width="100">{{props.row.tableNumber}}</b-table-column>
                <b-table-column label="Menu Name" width="250">{{ props.row.menuName }}</b-table-column>
                <b-table-column
                  label="Amount"
                  width="200"
                >&nbsp;&nbsp;&nbsp;&nbsp;{{ props.row.amount }}</b-table-column>
                <b-table-column label="Time" width="200">{{ props.row.time }}</b-table-column>
                <b-table-column label="Status" width="100">{{ props.row.statusName }}</b-table-column>
                <b-table-column label="Change Status" width="200">
                  <v-btn small color="#B7CDC2" @click="changeStatusOrder(props.row)">
                    <v-icon>repeat</v-icon>Change Status
                  </v-btn>
                </b-table-column>
              </template>
            </b-table>

            <!-- <div class="space-btn">
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-text class="title">
                    What status do you want to change?
                    <v-radio-group v-model="radioGroup">
                      <v-radio v-if="checkStatus(1)" label="Preparing" value="1"></v-radio>
                      <v-radio v-if="checkStatus(2)" label="Cooking" value="2"></v-radio>
                      <v-radio v-if="checkStatus(3)" label="Serving" value="3"></v-radio>
                      <v-radio label="Cancel" value="5"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="cancelDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="saveChangeStatus">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>-->
          </v-tab-item>
          <!-- </b-tab-item> -->

          <!-- same menu -->
          <!-- <b-tab-item label="Ordered same menu"> -->

          <v-tab-item>
            <div>
              <b-table
                :data="orderSameMenu"
                :paginated="isPaginated"
                :per-page="perPage"
                ref="table"
                detailed
                hoverable
                custom-detail-row
                :default-sort="['time', 'asc']"
                detail-key="menuName"
                :show-detail-icon="showDetailIcon"
                :opened-detailed="['menuName']"
              >
                <template slot-scope="props">
                  <b-table-column
                    field="menuName"
                    :visible="columnsVisible['menuName'].display"
                    :label="columnsVisible['menuName'].title"
                    width="300"
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
                    width="200"
                  >{{ props.row.amount }}</b-table-column>

                  <b-table-column
                    field="time"
                    :visible="columnsVisible['time'].display"
                    :label="columnsVisible['time'].title"
                    width="200"
                  >{{ props.row.time }}</b-table-column>

                  <b-table-column
                    field="statusName"
                    :visible="columnsVisible['statusName'].display"
                    :label="columnsVisible['statusName'].title"
                    width="200"
                  >{{ props.row.statusName }}</b-table-column>

                  <b-table-column>
                    <v-btn small color="#B7CDC2" @click="changeStatusSameMenu(props.row)">
                      <v-icon>repeat</v-icon>Change Status
                    </v-btn>
                  </b-table-column>
                </template>

                <template slot="detail" slot-scope="props">
                  <tr>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td width="300" style="font-weight: 600;">Menu Name</td>
                    <td width="200" style="font-weight: 600;">Amount</td>
                    <td width="200" style="font-weight: 600;">Time</td>
                    <td width="200" style="font-weight: 600;">TableNumber</td>
                    <td width="200" style="font-weight: 600;">StatusName</td>
                  </tr>
                  <tr v-for="(order) in props.row.items" :key="order.orderId">
                    <td v-if="showDetailIcon"></td>
                    <td v-show="columnsVisible['menuName'].display">{{ order.menuName }}</td>
                    <td v-show="columnsVisible['amount'].display">{{ order.amount }}</td>
                    <td v-show="columnsVisible['time'].display">{{ order.time }}</td>
                    <td v-show="columnsVisible['time'].display">{{ order.tableNumber }}</td>
                    <td v-show="columnsVisible['statusName'].display">{{ order.statusName }}</td>
                  </tr>
                </template>
              </b-table>
            </div>
          </v-tab-item>
          <!-- </b-tab-item> -->
          <!-- </b-tabs> -->
        </v-tabs>
      </section>
    </div>
  </div>
</template>
          

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import dayjs from "dayjs";
import { host } from "./data";

export default {
  name: "OrderedPage",
  components: {
    sidebar
  },
  data() {
    return {
      orderSameMenu: [],
      //ordered by menu
      data: [
        {
          detailOrders: []
        }
      ],
      columnsVisible: {
        menuName: { title: "Menu Name", display: true },
        amount: { title: "Amount", display: true },
        statusName: { title: "Status", display: true },
        time: { title: "Time", display: true }
      },
      showDetailIcon: true,

      panel: [false, true, true],

      nameOfStatus: "All Status",
      statusData: [],
      activeTab: 0,
      order: "",
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
      selectOrderId: "",
      selectedStatusId: "",
      orders: [],
      checkNumberForChange: 0
    };
  },
  methods: {
    //search
    allStatus() {
      this.keyword = "";
    },
    changeStatus(statusName) {
      this.nameOfStatus = statusName;
      this.keyword = statusName;
    },

    //change status in order
    changeStatusOrder(order) {
      this.checkNumberForChange = 0;
      this.selectOrderId = order.orderId;
      this.selectedStatusId = order.statusId;
      this.order = order;
      this.dialog = true;
    },
    checkStatus(status) {
      if (this.selectedStatusId >= status || this.orders.statusId >= status) {
        return false;
      } else {
        return true;
      }
    },
    saveChangeStatus() {
      if (this.checkNumberForChange === 0) {
        axios
          .put(
            host + "changestatus/" + this.selectOrderId + "/" + this.radioGroup
          )
          .then(response => {
            if (this.radioGroup === "5") {
              axios
                .post(host + "inserttransaction", {
                  menuName: this.order.menuName,
                  transPrice: this.order.menuPrice,
                  totalPrice: this.order.menuPrice * this.order.amount,
                  amount: this.order.amount,
                  statusName: "cancel",
                  categoryName: this.order.categoryName,
                  billId: this.order.billId,
                  restaurantId: this.restaurantId
                })
                .then(response => {
                  this.cancelDialog();
                });
            } else {
              this.cancelDialog();
            }
          });
      } else {
        for (let index = 0; index < this.orders.items.length; index++) {
          console.log(this.radioGroup);
          if (this.radioGroup === "5") {
            console.log(this.radioGroup === "5");
            
            axios
              .post(host + "inserttransaction", {
                menuName: this.orders.items[index].menuName,
                transPrice: this.orders.items[index].menuPrice,
                totalPrice:
                  this.orders.items[index].menuPrice *
                  this.orders.items[index].amount,
                amount: this.orders.items[index].amount,
                statusName: "cancel",
                categoryName: this.orders.items[index].categoryName,
                billId: this.orders.items[index].billId,
                restaurantId: this.restaurantId
              })
              .then(response => {
              });
          }
          axios
            .put(
              host +
                "changestatus/" +
                this.orders.items[index].orderId +
                "/" +
                this.radioGroup
            )
            .then(response => {
              if (this.radioGroup === "5") {
                axios
                  .post(host + "inserttransaction", {
                    menuName: this.orders.items[index].menuName,
                    transPrice: this.orders.items[index].menuPrice,
                    totalPrice:
                      this.orders.items[index].menuPrice *
                      this.orders.items[index].amount,
                    amount: this.orders.items[index].amount,
                    statusName: "cancle",
                    categoryName: this.orders.items[index].categoryName,
                    billId: this.orders.items[index].billId,
                    restaurantId: this.restaurantId
                  })
                  .then();
              }
            });
        }
        this.cancelDialog();
      }
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    changeStatusSameMenu(orders) {
      this.dialog = true;
      this.orders = orders;
      this.checkNumberForChange = 1;
    },

    getOrderData() {
      axios
        .get(host + "getOrderedByStatusPrepareAndCooking/" + this.restaurantId)
        .then(response => {
          this.ordered = response.data;
          for (let index = 0; index < this.ordered.length; index++) {
            this.ordered[index].time = dayjs(
              this.ordered[index].created_at
            ).format("HH:mm:ss");
          }
        });
    },
    cancelDialog() {
      this.getOrderSameMenu();
      this.getOrderData();
      this.dialog = false;
      this.radioGroup = 1;
      this.selectedStatusId = "";
      this.orders = "";
    },
    getOrderSameMenu() {
      axios.get(host + "getordersameMenu/" + 1).then(response => {
        this.orderSameMenu = response.data;
        for (let index = 0; index < this.orderSameMenu.length; index++) {
          this.orderSameMenu[index].time = dayjs(
            this.orderSameMenu[index].time
          ).format("HH:mm:ss");
          for (let i = 0; i < this.orderSameMenu[index].items.length; i++) {
            this.orderSameMenu[index].items[i].time = dayjs(
              this.orderSameMenu[index].items[i].created_at
            ).format("HH:mm:ss");
          }
        }
      });
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
    this.getOrderData();
    this.getOrderSameMenu();
    axios.get(host + "getallstatus").then(response => {
      this.statusData = response.data;
    });
  }
};
</script>

<style scoped>
.bg {
  background-color: #f7f6ee;
  border-radius: 20px;
  padding: 1%;
}
#bigbox {
  background-color: #84a295;
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
  padding-top: 3%;
  margin: -7%;
}
.search {
  margin-left: 57%;
  position: absolute;
  margin-top: -1%;
}
.text {
  padding-left: 60em;
  padding-top: 3%;
  margin: -7%;
}
.tabStyle {
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 15px;
}
.nameDialog {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 1.5em;
}
</style>
