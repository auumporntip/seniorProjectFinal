<template>
  <div>
    <b-table
      :data="empData"
      :columns="columns"
      :selected.sync="selectedEmp"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @select="selected"
      id="imageColumn"
    >
      <template slot-scope="props">
        <b-table-column label="Username">{{ props.row.userName }}</b-table-column>
        <b-table-column label="Password">{{ props.row.password }}</b-table-column>
        <b-table-column label="Name">{{ props.row.phone }} {{props.row.surname}}</b-table-column>
        <b-table-column label="Phone">{{ props.row.phone }}</b-table-column>
        <b-table-column label="Email">{{ props.row.email }}</b-table-column>
        <b-table-column label="Edit Employee">
          <EditEmployee></EditEmployee>
        </b-table-column>
        <b-table-column label="Delete Employee">
          <DeleteEmployee></DeleteEmployee>
        </b-table-column>
      </template>
    </b-table>
  </div>
  <!-- </div> -->
</template> 
<script>
import axios from "axios";
import { store } from "../../../store/store";
import EditEmployee from "../componentEmp/EditEmployee";
import DeleteEmployee from "../componentEmp/DeleteEmployee";
import jwt from "jsonwebtoken";

export default {
  name: "EmpTable",
  components: {
    EditEmployee,
    DeleteEmployee
  },
  data() {
    return {
      empData: [],
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 10,
      selectedEmp: {},

      account: ""
    };
  },
  methods: {
    selected() {
      setTimeout(() => {
        this.$store.commit("setEmployee", this.selectedEmp);
        console.log(this.$store.getters.employee);
      }, 1);
    }
  },
  created() {
    if (this.$store.getters.account != "") {
      this.account = this.$store.getters.account;
      console.log(this.account, "App");
    } else {
      this.account = jwt.decode(localStorage.getItem("token"));
      console.log(this.account, "token");
    }

    axios
      .get(
        "http://localhost:3000/api/getaccountbyposition/" +
          this.account.restaurantId +
          "/" +
          this.account.positionId
      )
      .then(response => {
        this.empData = response.data;
      });
  }
};
</script>     
<style >
#imageColumn {
  margin-left: 1%;
  margin-right: 1%;
}
#button {
  margin-left: 86%;
  margin-top: -5%;
}
.text {
  margin-left: 75%;
  margin-top: 0%;
}
</style>