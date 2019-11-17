<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">
          NOTIFICATION
          <v-text-field
            class="search"
            v-model="keyword"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <!-- <b-tabs v-model="activeTab" size="1000px" class="block" type="is-toggle"> -->
        <!-- <b-tab-item label="Checkbill"> -->
        <v-tabs v-model="activeTab" color="#B7CDC2" slider-color="#EAE6DA" class="tabStyle">
          <v-tab ripple>
            Check Bill 
            <v-badge color="red" v-if="itemsCheckBill.length!=0">
              <template v-slot:badge>
                <span>!</span>
              </template>
            </v-badge>
          </v-tab>
          <v-tab ripple>
            Others
            <v-badge color="red" v-if="itemsOther.length !=0">
              <template v-slot:badge>
                <span>!</span>
              </template>
            </v-badge>
          </v-tab>
          <v-tab-item>
            <b-table
              :data="itemsCheckBill"
              :paginated="isPaginated"
              :per-page="perPage"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              <template slot-scope="props">
                <b-table-column
                  label="Noti Id"
                  width="100"
                >&nbsp;&nbsp;&nbsp;&nbsp;{{props.row.notiId}}</b-table-column>
                <b-table-column label="Notification Message" width="200">{{props.row.notiMessage}}</b-table-column>
                <b-table-column label="Table No" width="100">{{props.row.tableNumber}}</b-table-column>
                <b-table-column label="Price" width="100">{{props.row.totalPrice}}</b-table-column>
                <b-table-column label="Change Status" width="50">
                  <v-btn small outline color="green" @click="check(props.row.notiId,props.row)">
                    <v-icon>check</v-icon>DONE
                  </v-btn>
                </b-table-column>
              </template>
            </b-table>
          </v-tab-item>
          <!-- </b-tab-item> -->
          <!--other-->
          <!-- <b-tab-item label="Others"> -->
          <v-tab-item>
            <b-table
              :data="itemsOther"
              :paginated="isPaginated"
              :per-page="perPage"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              <template slot-scope="props">
                <b-table-column label="Id" width="200">&nbsp;&nbsp;&nbsp;&nbsp;{{props.row.notiId}}</b-table-column>
                <b-table-column label="Notification Message" width="200">{{props.row.notiMessage}}</b-table-column>
                <b-table-column label="Table No" width="100">{{props.row.tableNumber}}</b-table-column>
                <b-table-column label="status" width="50">
                  <v-btn small outline color="green" @click="checkOther(props.row.notiId)">
                    <v-icon>check</v-icon>DONE
                  </v-btn>
                </b-table-column>
              </template>
            </b-table>
          </v-tab-item>
        </v-tabs>
        <!-- </b-tab-item> -->
        <!-- </b-tabs> -->
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { host } from "./data";

export default {
  name: "NotificationPage",
  components: {
    sidebar
  },
  data() {
    return {
      //search
      keyword: "",

      nameOfStatus: "All Status",
      dialog: false,
      activeTab: 0,
      isPaginated: true,
      radioGroup: 1,
      perPage: 10,
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      checkboxPosition: "left",
      checkedRows: [],
      notiData: [],
      checkbillData: [],
      otherData: []
    };
  },
  methods: {
    check(notiId, bill) {
      this.changeStatus(notiId, bill);
    },
    checkOther(notiId) {
      this.changeStatus(notiId);
      Swal.fire("Good job!", "", "success");
    },
    changeStatus(notiId, bill) {
      axios.put(host + "changeStatusNotification/" + notiId).then(() => {
        axios
          .put(host + "updatebill", {
            billId: bill.billId,
            totalPrice: bill.totalPrice,
            eatTimeStart: bill.eatTimeStart,
            eatTimeEnd: bill.eatTimeEnd,
            numOfCust: bill.numOfCust,
            typeId: bill.typeId,
            tableNumber: bill.tableNumber,
            billStatus: 1
          })
          .then(response => {
            this.getCheckBillNotification();
            this.getOtherNotification();
            Swal.fire("Good job!", "Payment successful", "success");
          });
      });
    },
    getCheckBillNotification() {
      axios.get(host + "getcheckbillnotification").then(response => {
        this.checkbillData = response.data;
      });
    },
    getOtherNotification() {
      axios.get(host + "getothernotification").then(response => {
        this.otherData = response.data;
      });
    }
  },
  computed: {
    itemsCheckBill() {
      if (this.keyword != "") {
        return this.checkbillData.filter(items =>
          items.tableNumber.toLowerCase().includes(this.keyword.toLowerCase())
        );
      } else {
        return this.checkbillData;
      }
    },
    itemsOther() {
      if (this.keyword != "") {
        return this.otherData.filter(
          items =>
            items.tableNumber
              .toLowerCase()
              .includes(this.keyword.toLowerCase()) ||
            items.notiMessage.toLowerCase().includes(this.keyword.toLowerCase())
        );
      } else {
        return this.otherData;
      }
    }
  },
  created() {
    this.getCheckBillNotification();
    this.getOtherNotification();
    setInterval(() => {
      this.getCheckBillNotification();
      this.getOtherNotification();
    }, 5000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.tabStyle {
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 15px;
}
.search {
  margin-left: 57%;
  position: absolute;
  margin-top: -1%;
}
</style>
