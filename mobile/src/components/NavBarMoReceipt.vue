<template>
    <v-bottom-nav :value="true" color="#cd9575" fixed>
        <v-btn color="white" flat value="callEmp" href="/Mo">
          <span class="white--text">Call Employee</span>
          <v-icon color="white">call</v-icon>
        </v-btn>

        <v-btn color="white" flat value="menu" href="/MoMenu">
          <span class="white--text">Menu Page</span>
          <v-icon color="white">list</v-icon>
        </v-btn>

        <v-btn color="white" flat value="receipt" href="/MoStatus">
          <span class="white--text">Status Page</span>
          <v-icon color="white">status</v-icon>
        </v-btn>
      </v-bottom-nav>
</template>

<script>
export default {
  name: "NavBarMoReceipt",
  components: {
    
  }
};
</script>
