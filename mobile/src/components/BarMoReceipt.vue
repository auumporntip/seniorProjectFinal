<template>
  <v-toolbar dark color="#cd9575">
    <v-btn flat icon color="white">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title class="headline-text white--text">{{namePage}}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: "BarMoReceipt",
  data () {
        return {
            namePage: "The Receipt"
        }
    }
};
</script>