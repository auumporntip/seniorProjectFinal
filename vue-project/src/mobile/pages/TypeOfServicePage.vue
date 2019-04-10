<template>
  <div>
    <bar></bar>
  <Billno></Billno>
  <div class="field is-grouped">
  <p class="control">
    <a class="button is-link">
      Save changes
    </a>
  </p>
  <p class="control">
    <a class="button">
      Cancel
    </a>
  </p>
  <p class="control">
    <a class="button is-danger">
      Delete post
    </a>
  </p>
</div>
  </div>
</template>

<script>
import Bar from "../components/bar";
import Billno from "../components/billno";
export default {
  name: 'TypeOfServicePage',
  components : {
    Bar,Billno
  }
};
</script>

<style scoped>
</style>