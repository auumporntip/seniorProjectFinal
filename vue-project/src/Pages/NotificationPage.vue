
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
                <b-table-column label="Notification Id" width="100">{{props.row.notiId}}</b-table-column>
                <b-table-column label="Notification Message" width="200">{{props.row.notiMessage}}</b-table-column>
                <b-table-column label="status" width="50">
                  <v-icon @click="check()">check</v-icon>
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
                <b-table-column label="Notification Id" width="200">{{props.row.notiId}}</b-table-column>
                <b-table-column label="Notification Message" width="200">{{props.row.notiMessage}}</b-table-column>
                <b-table-column label="status" width="50">
                  <v-icon @click="check()">check</v-icon>
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
      // columns: [
      //   {
      //     field: "notiId",
      //     label: "Noti Id",
      //     width: "80",
      //     numeric: true
      //   },
      //   {
      //     field: "notiMessage",
      //     label: "Notification Message"
      //   },
      //   {
      //     field: "billId",
      //     label: "Bill Id"
      //   },
      //   {
      //     field: "",
      //     label: "a"
      //   }
      // ],
    };
  },
  methods: {
    check() {
      Swal.fire("Good job!", "Payment successful", "success");
    },
    test() {
      this.dialog = true;
    },
    async clickSave() {
      console.log(this.radioGroup);
      const promise = [];
      for (let index = 0; index < this.checkedRows.length; index++) {
        promise.push(
          axios.put(
            "http://localhost:3000/api/changestatus/" +
              this.checkedRows[index].notiId +
              "/" +
              this.radioGroup
          )
        );
      }
      await Promise.all(promise);

      for (let index = 0; index < this.checkedRows.length; index++) {
        if (this.radioGroup === "3") {
        }
      }
    }
  },
  created() {
    axios.get("http://localhost:3000/api/getallnotification").then(response => {
      this.notiData = response.data;
    });
    axios
      .get("http://localhost:3000/api/getcheckbillnotification")
      .then(response => {
        this.checkbillData = response.data;
      });
    axios
      .get("http://localhost:3000/api/getothernotification")
      .then(response => {
        this.otherData = response.data;
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
/* h1 {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 20px;
  padding-left: 40px;
  padding-top: 10px;
  float: left;
}

.noti {
  background-color: #d2b48c;
  width: 1200px;
  height: 100px;
  margin-left: 5px;
  margin-top: 15px;
}
.notibox {
  margin-top: 55px;
}
.noti2 {
  width: 100px;
  height: 100px;
  float: left;
  padding-left: 55px;
  padding-top: 20px;
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
