<template>
  <div id="app">
    <NavBar :status="loggedStatus" v-on:loggedin="changeStatus"></NavBar>
    <router-view v-on:loggedin="changeStatus"></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data () {
    return {
      loggedStatus: false
    }
  },
  methods: {
    changeStatus: function() {
      console.log('in parent')
      if(this.loggedStatus) {
        this.loggedStatus = false
      } else {
        this.loggedStatus = true
      }
    }
  },
watch: {
  loggedStatus: function() {
    console.log(this.loggedStatus)
  }
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
  background-color: lightgoldenrodyellow
}

</style>
