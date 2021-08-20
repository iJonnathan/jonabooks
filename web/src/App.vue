<template>
  <div id="app">
    <Home/>
  </div>
</template>
<script>
// @ is an alias to /src
import Home from '@/views/Home.vue'
import M from 'materialize-css'
export default {
  name: 'App',
  components: {
    Home
  },
  mounted () {
    M.AutoInit()
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
