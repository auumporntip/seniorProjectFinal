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
           <b-table-column label="Username">{{ props.row.empUsername }}</b-table-column>
            <b-table-column label="Name">{{ props.row.empName }}</b-table-column>
             <b-table-column label="Phone">{{ props.row.empPhone }}</b-table-column>
              <b-table-column label="Email">{{ props.row.empEmail }}</b-table-column>
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
 
export default { 
  name: "EmpTable", 
  components: { 
    EditEmployee, 
    DeleteEmployee 
  }, 
  data() { 
    return { 
      empData:[], 
      isPaginated: true, 
      isPaginationSimple: false, 
      currentPage: 1, 
      perPage: 10, 
      selectedEmp: {},
    //    columns: [ 
    //     { 
    //       field:"employeeId", 
    //       label: "employee Id", 
 
    //     }, 
    //     { 
    //       field: "empUsername", 
    //       label: "Username", 
    //     }, 
    //     { 
    //       field: "empName", 
    //       label: "Name", 
    //     }, 
    //     { 
    //       field: "empPhone", 
    //       label: "Phone", 
    //     }, 
    //     { 
    //       field: "empEmail", 
    //       label: "Email", 
    //     } 
    //   ]  
      
    }; 
  }, 
  methods: { 
     
  }, 
  created() { 
    axios.get("http://localhost:3000/api/getallemployee/").then(response => { 
      this.empData = response.data; 
    }); 
  } 
}; 
</script>     
<style > 
/* .head { 
  margin-left: 20px; 
} */ 
 
/* #button { 
  margin-left: 10px; 
} */ 
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