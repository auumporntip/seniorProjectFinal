
<template>

  <div>
   <Header></Header>
   <sidebar></sidebar>
   <div id="boxright">
     <div id = "big">
   <div id="all">
    <h1> Notification !!</h1><br>
    </div><br>
<!-- <div class="notibox">
<div class="noti">
  <div class="noti2"> 
    <img class="Edit2" src="../assets/notification (2).png" width="50px" height="50px">
   </div> 
</div>

<div class="noti">
  <div class="noti2"> 
    <img class="Edit2" src="../assets/notification (2).png" width="50px" height="50px">
   </div> 
</div>

<div class="noti">
  <div class="noti2"> 
    <img class="Edit2" src="../assets/notification (2).png" width="50px" height="50px">
   </div> 
</div>

<div class="noti">
  <div class="noti2"> 
    <img class="Edit2" src="../assets/notification (2).png" width="50px" height="50px">
   </div> 
</div> -->
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
  name: 'NotificationPage', 
  components: {
    Header,
    sidebar
  },data() {
    const menu = [];
    // this.test();
    // this.test()
    // console.log(data)
    return {
      menu: menu,
      selected: {},
      columns: [
        {
          field: "notiId",
          label: "ID",
          width: "30",
          numeric: true
        },
        {
          field: "tableNo",
          label: "tableNo"
        },
        {
          field: "notiMessage",
          label: "Message"
        }
        
      ]
    };
  }
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
  padding-left: 40px;
  padding-top: 10px;
  float:left;
}

.noti{
    background-color: #D2B48C;
    width: 1200px;
    height: 100px;
    margin-left: 5px;
    margin-top: 15px;
}
.notibox{
     
    margin-top: 55px;
}
.noti2{
    width:100px;
    height:100px;
    float: left;
    padding-left: 55px;
    padding-top:20px;

}
#boxright{
     background-color: #f0cab1;
  width: 1170px;
  height: 100vh;
  margin-top: 0px;
  margin-left: 180px;
    
}
#big{
    padding-top: 5px;
}
</style>
