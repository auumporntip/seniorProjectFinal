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

        <b-table
          class="table"
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
              <v-btn
                small
                outline
                color="indigo"
                @click="changeStatusOrder(props.row.orderId,props.row.statusId)"
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

export default {
  name: "ServingPage",
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
      checkedRows: [],
      selectOrderId: "",
      selectedStatusId: ""
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
    changeStatusOrder(orderId, statusId) {
      axios
        .put("http://localhost:3000/api/changestatus/" + orderId + "/" + 4)
        .then(response => {
          this.getOrderData();
          this.dialog = false;

          Swal.fire("Finish", "Serve menu on table", "success");
        });
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },

    getOrderData() {
      axios
        .get(
          "http://localhost:3000/api/getOrderedByStatusServing/" +
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
.table {
  margin-top: 5%;
}
</style>
