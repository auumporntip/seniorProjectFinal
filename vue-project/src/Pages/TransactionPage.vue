
<template>

  <div>
   <Header></Header>
   <sidebar></sidebar>
   <div id="boxright">
     <div id="big">
   <div id="all">
    <h1> All of the menu ordered: </h1>
    <div id="date"> 
    <b-field>
        <b-datepicker
            placeholder="Click to select date"
            icon="calendar-today"><br>
        </b-datepicker>
    </b-field>
</div><br><br>
</div>
          </div>
          <br>
  <b-table :data="menu" :columns="columns" :selected.sync="selected" focusable></b-table>
     </div>
  </div>
  
</template>

<script>
import Header from '@/components/Header'
import sidebar from '@/components/sidebar'
export default {
  name: 'TransactionPage', 
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
          field: "menuId",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "menuName",
          label: "Menu"
        },
        {
          field: "menuPrice",
          label: "Price"
        },
        {
          field: "restaurantId",
          label: "res"
        },
        {
          field: "categoryId",
          label: "cat"
        }
      ]
    };
  },
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
    padding-left: 11em;
}
h1 {
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 20px;
  float:left;
  padding-left: 40px;
  padding-top: 10px;
}
#date{
  width: 350px;
  height: 100px;
  position: absolute;
  margin-left: 320px;
  float: left;
  margin-top: 5px;
}

#info{
  background-color: #D2B48C;
    width: 1500px;
    height: 100px;
    margin-left: 5px;
    margin-bottom: 10px;
   
}
#allbox{
  margin-top: 60px;
}
#boxright{
     background-color: #f0cab1;
  width: 1170px;
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;  

}
#big{
    padding-top: 5px;
}
</style>
