 
<template> 
  <div> 
    <sidebar></sidebar> 
    <div id="bigbox"> 
       <div class="bg"> 
        <v-card-title class="headline font-weight-medium">EMPLOYEE</v-card-title> 
        <div id="button"> 
          <AddEmployee></AddEmployee> 
        </div> 
        <EmpTable></EmpTable> 
      </div> 
    </div> 
  </div> 
</template> 
 
<script> 
import sidebar from "@/components/sidebar"; 
import AddEmployee from "./componentEmp/AddEmployee"; 
import EditEmployee from "./componentEmp/EditEmployee"; 
import DeleteEmployee from "./componentEmp/DeleteEmployee"; 
import EmpTable from "./componentEmp/EmpTable"; 
import axios from "axios"; 
export default { 
  name: "EmployeePage", 
  components: { 
    sidebar, 
    AddEmployee, 
    EmpTable, 
    DeleteEmployee, 
    EditEmployee, 
  }, 
  data() { 
    return { 
       
    }; 
  } 
  } 
   
 
</script> 
 
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped> 
 
.bg { 
  background-color: #f0cab1; 
  border-radius: 20px; 
  padding: 1%; 
} 
#bigbox { 
  background-color: #eeeeee; 
  height: 800px; 
  padding: 2%; 
  margin-top: -800px; 
  margin-left: 20%; 
  background-attachment: fixed; 
} 
 
 
 
</style> 
