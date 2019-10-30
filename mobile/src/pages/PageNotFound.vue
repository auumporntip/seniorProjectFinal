<template>
    <div>
        <h1>404 Page Not Found</h1>
    </div>
</template>
<script>
import {host} from './data'
export default {
  name: "PageNotFound",
  created() {
    console.log(host,'ts');
  },
}
</script>