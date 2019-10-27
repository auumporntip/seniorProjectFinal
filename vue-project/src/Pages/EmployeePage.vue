
<template>
  <div>
    <sidebar></sidebar>
    <div id="bigbox">
      <section class="bg">
        <v-card-title class="headline font-weight-medium">EMPLOYEE</v-card-title>
        <br />
        <b-table :data="menu" :columns="columns" :selected.sync="selected" focusable></b-table>
      </section>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
export default {
  name: "MenuPage",
  components: {
    sidebar
  },
  data() {
    const menu = [];
    return {
      menu: menu,
      selected: {},
      columns: [
        {
          field: "EmployeeId",
          label: "EmpID",
          width: "40",
          numeric: true
        },
        {
          field: "EmpName",
          label: "Name"
        },
        {
          field: "EmpPosition",
          label: "Position"
        },
        {
          field: "restaurantId",
          label: "res"
        },
        {
          field: "Email",
          label: "Email"
        }
      ]
    };
  },
  methods: {
  }
};
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
/* .Editt {
  font-family:"Arial Black", Gadget, sans-serif;
  margin-left: 500px;
  font-size: 15px;
  position: absolute;
  margin-top:20px;
} */

.list2 {
  align-items: left;
  width: 100px;
  height: 100px;
  float: right;
  padding-top: 20px;
}
.list1 {
  width: 100px;
  height: 100px;
  float: right;
  padding-right: 5px;
  padding-top: 20px;
}

body {
  padding-left: 11em;
}

/* .headerMenu {
    background-color: salmon;
    weight: 60px;
    height: 60px;
} */
.form {
  position: absolute;
  padding-left: 200px;
  padding-top: -100px;
  margin-top: -20px;
}
#boxright {
  background-color: #f0cab1;
  width: 1170px;
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;
}
.category {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
  margin-top: 200px;
  padding-left: 10px;
}
.list {
  background-color: #d2b48c;
  width: 1230px;
  height: 100px;
  padding-right: 50px;
  margin-top: 15px;
}
/* #barcolor{
    background-color:#DCDCDC;
    width: 220px;
    height: 600px;
    margin-top: 0px;
    margin-left:-6px;
    position: fixed;
} */

/* .navbar{
    font-family:"Arial Black", Gadget, sans-serif;
    font-size: 30px;
    text-align: left;
}
 ul.navbar {
    position: absolute;
    top: 7em;
    left: 1em;
    width: 9em }
.navbar a:hover {
  background-color: red;
  
} */
/* address {
  margin-top: 1em;
  padding-top: 1em;
  border-top: thin dotted;
}
.head {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
  margin-top: 200px;
  padding-left: 40px;
  
}
#static {
  padding-top: 20px;
}*/
</style>
