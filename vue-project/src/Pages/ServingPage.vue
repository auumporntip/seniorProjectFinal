<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">
          Serving
          <v-text-field
            class="search"
            v-model="keyword"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <b-table
          class="table"
          :data="items"
          :paginated="isPaginated"
          :per-page="perPage"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          style="margin-top:1%;"
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
              <v-btn
                small
                color="#B7CDC2"
                @click="changeStatusOrder(props.row,props.row.statusId)"
              >
                <v-icon>repeat</v-icon>Change Status
              </v-btn>
            </b-table-column>
          </template>
        </b-table>
      </section>
    </div>
  </div>
</template>
          

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { host } from "./data"

export default {
  name: "ServingPage",
  components: {
    sidebar
  },
  data() {
    return {
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

      selectOrderId: "",
      selectedStatusId: ""
    };
  },
  methods: {
    //change status in order
    changeStatusOrder(order, statusId) {
      console.log(order);

      axios
        .put(
          host+"changestatus/" + order.orderId + "/" + 4
        )
        .then(response => {
          axios
            .post(host+"inserttransaction", {
              menuName: order.menuName,
              transPrice: order.menuPrice,
              totalPrice: order.menuPrice * order.amount,
              amount: order.amount,
              statusName: "finish",
              categoryName: order.categoryName,
              billId: order.billId,
              restaurantId: this.restaurantId
            })
            .then(response => {
              this.getOrderData();
              this.dialog = false;
              Swal.fire("Finish", "Serve menu on table", "success");
            });
        });
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },

    getOrderData() {
      axios
        .get(
          host+"getOrderedByStatusServing/" +
            this.restaurantId
        )
        .then(response => {
          this.ordered = response.data;
          for (let index = 0; index < this.ordered.length; index++) {
            this.ordered[index].time = dayjs(
              this.ordered[index].created_at
            ).format("HH:mm:ss");
          }
        });
    }
  },
  computed: {
    //search
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
    axios.get(host+"getallstatus").then(response => {
      this.statusData = response.data;
    });
  }
};
</script>

<style scoped>
.bg {
  background-color: #F7F6EE;
  border-radius: 20px;
  padding: 1%;
}
#bigbox {
  background-color: #84A295;
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
.table {
  margin-top: 5%;
}
</style>
