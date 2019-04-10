
<template>

  <div>
   <Header></Header>
   <sidebar></sidebar>
   <div id="boxright">
   <div id="static">
    
    <section id="dropdown">
        <span class="head"> Statistic: </span>
        <b-dropdown aria-role="list">
            <button class="button is-dark" slot="trigger">
                <span>Select Category of Food</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">A La Carte</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet299</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet399</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Buffet499</b-dropdown-item>
        </b-dropdown>
    </section>
    <v-item-group>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex
          v-for="n in 6"
          :key="n"
          xs12
          md4
        >
          <v-item>
            <v-card
              slot-scope=""
              :color="active ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div
                  v-if="active"
                  class="display-3 text-xs-center"
                >
                  Active
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
   </div>
        </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import sidebar from '@/components/sidebar'
export default {
  name: 'StaticPage', 
  components: {
    Header,
    sidebar
  }
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
    padding-left: 11em;
}


#boxright{
     background-color: #f0cab1;
  width: 1170px;
  height: 100vh;
  margin-top: 0px;
  margin-left: 180px;
    
}
    

h1{
    font-family: "Arial Black", Gadget, sans-serif;
  font-size: 20px;
  padding-left: 20px;
}
.form{
    position: absolute;
    padding-left: 120px;
    padding-top: -100px;
    margin-top: -20px;

}
#static{
    padding-top: 20px;
}
.head{
    font-family:"Arial Black", Gadget, sans-serif;
    font-size: 18px;
    margin-top: 200px;
    padding-left: 40px;
     padding-top: 10px;    
}
#smallbox{
    background-color: #D2B48C;
    width: 230px;
    height: 200px;
    float: left;
    margin-right: 20px;
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
}
</style>
