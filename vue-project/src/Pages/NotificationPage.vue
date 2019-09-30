
<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">NOTIFICATION</v-card-title>
        <b-table :data="notiData" :columns="columns"></b-table>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";

export default {
  name: "NotificationPage",
  components: {
    sidebar
  },
  data() {
    return {
      notiData: [],
      columns: [
        {
          field: "notiId",
          label: "Noti Id",
          width: "80",
          numeric: true
        },
        {
          field: "notiMessage",
          label: "Notification Message"
        },
        {
          field: "billId",
          label: "Bill Id"
        }
      ]
    };
  },
  created() {
    axios.get("http://ec2-54-169-124-227.ap-southeast-1.compute.amazonaws.com:5000/api/getallnotification").then(response => {
      this.notiData = response.data;
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
