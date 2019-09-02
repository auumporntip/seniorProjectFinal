<template>
    <v-bottom-nav :value="true" color="#cd9575" fixed>
        <v-btn color="white" flat value="callEmp" href="/Mo">
          <span class="white--text">Call Employee</span>
          <v-icon color="white">call</v-icon>
        </v-btn>

        <v-btn color="white" flat value="status" href="/MoStatus">
          <span class="white--text">Status Page</span>
          <v-icon color="white">list</v-icon>
        </v-btn>

        <v-btn color="white" flat value="receipt" href="/MoReceipt">
          <span class="white--text">Receipt</span>
          <v-icon color="white">receipt</v-icon>
        </v-btn>
      </v-bottom-nav>
</template>

<script>
export default {
  name: "NavBar",
  components: {
    
  }
};
</script>
