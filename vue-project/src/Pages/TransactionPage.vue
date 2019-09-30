<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <div class="bg">
        <v-card-title class="headline font-weight-medium">TRANSACTION</v-card-title>
        <!-- <h1>All of the menu ordered:</h1>
        <div id="date">
          <b-field>
            <b-datepicker placeholder="Click to select date" icon="calendar-today">
              <br />
            </b-datepicker>
          </b-field>
        </div>-->
        <b-table
          :data="transData"
          :columns="columns"
          :selected.sync="selected"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        ></b-table>
        <br />
        <br />
      </div>

      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sidebar from "@/components/sidebar";

export default {
  name: "TransactionPage",
  components: {
    sidebar
  },
  data() {
    const menu = [];
    return {
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 10,
      transData: [],
      menu: menu,
      selected: {},
      columns: [
        {
          field: "menuName",
          label: "Menu"
        },
        {
          field: "transPrice",
          label: "Price"
        },
        {
          field: "totalPrice",
          label: "totalPrice"
        },
        {
          field: "amount",
          label: "amount"
        },
        {
          field: "statusName",
          label: "statusName"
        },
        {
          field: "billId",
          label: "billId"
        }
      ]
    };
  },
  methods: {},
  created() {
    axios.get("https://restaurant.bazsup.ml/api/getalltransaction").then(response => {
      this.transData = response.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
/* body {
  padding-left: 11em;
} */
h1 {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 20px;
  float: left;
  padding-left: 40px;
  padding-top: 10px;
}
#date {
  width: 350px;
  height: 100px;
  position: absolute;
  margin-left: 320px;
  float: left;
  margin-top: 5px;
}

#info {
  background-color: #d2b48c;
  width: 1500px;
  height: 100px;
  margin-left: 5px;
  margin-bottom: 10px;
}
/* #allbox {
  margin-top: 60px;
}
#boxright {
  background-color: #f0cab1;
  width: 1170px;
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;
}
#big {
  padding-top: 5px;
} */
</style>
