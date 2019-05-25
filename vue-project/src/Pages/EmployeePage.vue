
<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="barcolor"></div>
    <div id="boxright">
      <div id="static">
        <span class="head">Employee:</span>
        <!-- <section id="dropdown">
          <b-dropdown aria-role="list">
            <button class="button is-dark" slot="trigger">
              <span>Select Category</span>
              <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">A La Carte</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet299</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet399</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet499</b-dropdown-item>
          </b-dropdown>
        </section> -->
      </div>
      <!-- <b-table :data="data" :columns="columns" >
      </b-table>-->
      <br>
      <b-table :data="menu" :columns="columns" :selected.sync="selected" focusable></b-table>
<!-- 
      <button class="button is-medium is-danger" @click="confirmCustom">Delete</button> -->

      <!-- <div class="list" v-for="menu in menus" :key="menu.id">
        <div class="list2">
          <img class="Edit2" src="../assets/out.png" width="50px" height="50px">
        </div>
        <div class="list1">
          <img class="Edit" src="../assets/edit.png" width="50px" height="50px">
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
export default {
  name: "MenuPage",
  components: {
    Header,
    sidebar
  },
  data() {
    const menu = [];
    // this.test();
    // this.test()
    // console.log(data)
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
    // test() {
    //   axios.get(`http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/querymenu`).then(response => {
    //     this.menu = response.data;
    //     console.log(response.data);
    //     // return response.data
    //   });
    // },
//     confirmCustom() {
//       console.log(this.selected);
//       this.$dialog.confirm({
//         title: "Privacy Politics",
//         message: "จะลบจริงอ่อ",
//         cancelText: "Disagree",
//         confirmText: "Agree",
//         type: "is-success",
//         onConfirm: () => this.$toast.open("delete success")
//       });
//     }
//   },
//   created: function() {
//     axios.get(`http://ec2-54-251-178-30.ap-southeast-1.compute.amazonaws.com:3000/api/querymenu`).then(response => {
//       this.menu = response.data;
//       this.selected = response.data[0];
//       console.log(response.data);
//       // return response.data
//     });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  height: 100vh;
  margin-top: 0px;
  margin-left: 180px;
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
address {
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
}
</style>
