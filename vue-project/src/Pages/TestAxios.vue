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
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "TestAxios",
  data() {
    return {
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,

      selected:{},
      keyword: "",
    };
  },
  methods: {},
  computed: {
    items() {
      if(this.keyword!=""){
        return this.$store.getters.menu.filter(
            items =>
              items.menuName.toLowerCase().includes(this.keyword.toLowerCase()) ||
              items.categoryName.toLowerCase().includes(this.keyword.toLowerCase())
          )
      }else{
        return this.$store.getters.menu
      }
    }
  },
  created: function() {
    axios.get("http://localhost:3000/api/getallmenu/1").then(response => {
      this.$store.commit('setMenu',response.data)
      console.log(this.$store.getters.menu)
      this.selected =response.data[0]
    });
  }
};
</script>    