
<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">NOTIFICATION</v-card-title>

        <b-tabs v-model="activeTab" size="1000px" class="block" type="is-toggle">
          <b-tab-item label="Checkbill">
            <b-table
              :data="checkbillData"
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
                <b-table-column label="Change Status" width="50">
                  <v-btn small outline color="green" @click="check(props.row.notiId)">
                    <v-icon>check</v-icon>DONE
                  </v-btn>
                </b-table-column>
              </template>
            </b-table>
          </b-tab-item>
          <!--other-->
          <b-tab-item label="Others">
            <b-table
              :data="otherData"
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
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { host } from "./data"

export default {
  name: "NotificationPage",
  components: {
    sidebar
  },
  data() {
    return {
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
    check(notiId) {
      this.changeStatus(notiId);
      Swal.fire("Good job!", "Payment successful", "success");S
    },
    checkOther(notiId) {
      this.changeStatus(notiId);
      Swal.fire("Good job!", "", "success");
    },
    changeStatus(notiId) {
      axios
        .put(host+"changeStatusNotification/" + notiId)
        .then(() => {
          this.getCheckBillNotification();
          this.getOtherNotification();
        });
    },
    getCheckBillNotification() {
      axios
        .get(host+"getcheckbillnotification")
        .then(response => {
          this.checkbillData = response.data;
        });
    },
    getOtherNotification() {
      axios
        .get(host+"getothernotification")
        .then(response => {
          this.otherData = response.data;
        });
    }
  },
  created() {
    this.getCheckBillNotification();
    this.getOtherNotification();
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
