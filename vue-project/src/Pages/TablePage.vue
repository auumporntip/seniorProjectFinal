<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">Table</v-card-title>
        
          <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
        <v-layout justify-space-around>
          <!-- add new type -->

        </v-layout>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import QrcodeVue from "qrcode.vue";

export default {
  name: "Table",
  components: {
    sidebar,
    QrcodeVue
  },
  data() {
    return {
      value:'http://restaurant-management.netlify.com'
    }
  },
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
</style>