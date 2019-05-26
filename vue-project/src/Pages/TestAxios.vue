<template>
  <div>
    <!-- <mdb-datatable :data="data" striped bordered/> -->
    <b-field>
      <b-input placeholder="Search..." type="search" v-model="keyword"></b-input>
    </b-field>
    <b-table
          :data="items"
          :selected.sync="selected"
          focusable
          class="elevation-1"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          :loading="loading"
        >
          <template slot-scope="props">
            <b-table-column label="Image" width="150" >
              <div class="img-resize" v-if="props.row.menuPathImage!=null">
                <img :src="props.row.menuPathImage">
              </div>
              <div class="img-resize" v-else>
                <img src="../assets/1.png">
              </div>
            </b-table-column>

            <b-table-column label="Menu Name" width="200">{{ props.row.menuName }}</b-table-column>

            <b-table-column label="Price" width="200">{{ props.row.menuPrice }}</b-table-column>

            <b-table-column label="Category" width="0">{{ props.row.categoryName }}</b-table-column>
          </template>
        </b-table>
    {{menu}}
  </div>
</template>
<script>
import axios from "axios";
import { mdbDatatable } from "mdbvue";

export default {
  name: "TestAxios",
  components: {
    mdbDatatable
  },
  data() {
    return {
      keyword: "",
      menu: []
    };
  },
  methods: {},
  computed: {
    items() {
      if(this.keyword!=""){
        return this.menu.filter(
            items =>
              items.menuName.toLowerCase().includes(this.keyword.toLowerCase()) ||
              items.categoryName.toLowerCase().includes(this.keyword.toLowerCase())
          )
      }else{
        return this.menu
      }
    }
  },
  created: function() {
    axios.get("http://13.228.170.25:8443/api/getallmenu/1").then(response => {
      this.menu = response.data;
      console.log(this.menu);
    });
  }
};
</script>    