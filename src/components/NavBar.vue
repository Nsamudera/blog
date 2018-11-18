<template>
    <div id="nav" class="row">
        <div class="col-8" style="text-align:left">
        <router-link to="/">Home</router-link> |
        <router-link to="/articles">Articles</router-link> |
        <router-link to="/dashboard">Dashboard</router-link> 
      </div>
      <div class="col-4">
        <router-link to="/register">Register</router-link> |
        <router-link v-if="!status" to="/login">Login</router-link>
        <h3 id="nav" v-else v-on:click="logout()"><b>Logout</b></h3>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['status'],
  data() {
    return {
      
    }
  },
  methods: {
    logout: function() {
      localStorage.removeItem('token');
      this.$emit('loggedin')
      console.log('logging out')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#nav {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #D9FCFD

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.banner {
  margin-bottom: 10px;
  height: 200px
}
h3#nav {
  color:#2c3e50; 
  font-size:16px; 
  display:inline;
  padding: 0px
}

h3#nav :hover {
  cursor: pointer;
  text-decoration: underline 
}

</style>
