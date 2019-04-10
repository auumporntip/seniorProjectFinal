<template>
  <v-layout id="layoutDel">
    <v-flex xs2>
          <v-btn color="primary" dark @click= "confirmCustom">Delete Menu</v-btn>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "axios";
export default {
  name: "Delete",
  methods: {
    confirmCustom() {
      console.log(this.selected);
      this.$dialog.confirm({
        title: "Privacy Politics",
        message: "จะลบจริงอ่อ",
        cancelText: "Disagree",
        confirmText: "Agree",
        type: "is-success",
      });
    }
  }
};
</script>
<style>
#layoutDel {
  margin-left: 600px;
  margin-top: 20px;
  position: absolute;
}
</style>