<template>
  <div id="app">
    <h1>Test This is Test.vie Wirk</h1>
     <h1 id="test"> Test This is Test.vie Wirk</h1>
     <HelloWorld></HelloWorld>
     
  </div>
</template>

<script>
import HelloWorld from './HelloWorld'
export default {
  name: 'Test',
  components: {
      HelloWorld
  }
}
</script>

<style> 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#test{
    color: salmon;
}
</style>
