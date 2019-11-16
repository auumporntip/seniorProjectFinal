<template>
  <v-bottom-nav :value="true" color="#84A295" fixed>
    <v-btn color="white" flat value="callEmp" href="/MoCallEmp">
      <span class="white--text">Call Employee</span>
      <v-icon color="white">call</v-icon>
    </v-btn>

    <v-btn v-if="this.$store.getters.namePages === 'Status' || this.$store.getters.namePages === 'Receipt'" color="white" flat value="status" href="/Momenu">
      <span class="white--text">Menu</span>
      <v-icon color="white">list</v-icon>
    </v-btn>

    <v-btn v-else color="white" flat value="status" href="/MoStatus">
      <span class="white--text">Status</span>
      <v-icon color="white">list</v-icon>
    </v-btn>

    <v-btn color="white" flat value="receipt" href="/MoReceipt">
      <span class="white--text">Receipt</span>
      <v-icon color="white">receipt</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
import {host} from '../pages/data'

export default {
  name: "NavBar",
  components: {}
};
</script>
