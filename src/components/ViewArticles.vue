<template>
  <div>
      <h1>Articles Page</h1>
      <h2>Please pick an Article </h2>
  </div>

</template>

<script>

export default {
  name: "articles",
  data() {
    return {
      authorized: false,
      articles: [],
      error_status: false,
      error_msg: ""
    };
  },
  methods: {
  },
  beforeCreate: function() {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: "http://xavier-blog-server.thenile.online:3000/decode",
      headers: { token: token }
    })
      .then(response => {
        console.log(response);
        this.authorized = true;
      })
      .catch(err => {
        console.log(err.response.data);
        this.$router.push('/login')
      });
  }
};
</script>

<style scoped>


</style>