<template>
  <div class="home">
    <img alt="Vue logo" src="https://www.freeiconspng.com/uploads/blogger-logo-icon-png-22.png">
    <HomePage msg="Welcome to The Blog"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'home',
  components: {
    HomePage,
  }
}
</script>
