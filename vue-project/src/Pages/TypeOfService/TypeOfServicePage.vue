
<template>
  <div>
    <Header></Header>
    <sidebar></sidebar>
    <div id="barcolor"></div>
    <div id="boxright">
      <span id="typeofservice"> Type Of Service </span>
  
      <xp:table id="table" width="700" height="650" cellspacing="0" >
         <tr>
            <td><a href="/TypeOfServiceMenu"><img class="Row1col1" src="../../assets/yakiniku1.png" width="300px" height="350px"></a></td>
            <td><a href="/"><img class="Row1col2" src="../../assets/sushi11.png" width="300px" height="350px"></a> </td>
            <td><a href="/"><img class="Row1col3" src="../../assets/sashimi11.png" width="300px" height="350px"></a> </td>
            <!-- <td>Row 1, Column 2</td>
            <td>Row 1, Column 3</td> -->
         </tr>
         <tr>
           <td><a href="../AddCategory"><div class="Row2col1">
             <center><img class="Row2col11" src="../../assets/add.png" width="100px" height="250px"></center>
             </div></a>
          </td>
         </tr>
         <!-- <tr> แถวสองซ้ายสุด
            <td>Row 2, Column 1</td>
            <td>Row 2, Column 2</td>
         </tr> -->
      </xp:table>
      
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import sidebar from "@/components/sidebar";
import axios from "axios";
export default {
  name: "TypeOfServicePage",
  components: {
    Header,
    sidebar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boxright {
  background-color: #f0cab1;
  width: 1170px;
  height: 52em;
  margin-top: 0px;
  margin-left: 180px;
  background-attachment: fixed;  
}
#typeofservice{
  font-family: "Arial Black", Gadget, sans-serif;
  font-size: 18px;
   padding-left: 40px;
  padding-top: 10px;
  float:left;
}
.Row1col1{
  margin-left: 50px;
  margin-top: 50px;
  float: left;
}
.Row1col2{

  float: center;
  margin-left: 50px;
  margin-top: 50px;
}
.Row1col3{
  
  float: center;
  margin-left: 50px;
  margin-top: 50px;
}
.Row2col1{
  margin-left: 50px;
  margin-top: 60px;
  float: left;
  background-color: gray;
  width:300px;
  height:200px;
}
.Row2col11{
  margin-top: 50px;
}
</style>
