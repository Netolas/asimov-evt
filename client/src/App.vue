<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
}
body{
  background: #499bea;
  background: -moz-linear-gradient(top, #499bea 0%, #207ce5 100%);
  background: -webkit-linear-gradient(top, #499bea 0%,#207ce5 100%);
  background: linear-gradient(to bottom, #499bea 0%,#207ce5 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#499bea', endColorstr='#207ce5',GradientType=0 );
}
</style>
