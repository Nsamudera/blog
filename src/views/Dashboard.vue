<template>
  <div v-if="authorized">
     <!-- Breadcrumbs-->
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" style="font-weight:700">{{user}}</li> 
      <li class="breadcrumb-item active" style="font-weight:500">    
        <router-link to="/dashboard">
        <font-awesome-icon icon="wrench" />
        Maintain Published Articles
        </router-link>
      </li>
      <li class="breadcrumb-item active" style="font-weight:500">
        <router-link to="/dashboard/create">
        <font-awesome-icon icon="newspaper" />
        Publish An Article
        </router-link>
      </li>
      <li class="breadcrumb-item active" style="font-weight:500">
        <router-link to="/dashboard/comments">
        <font-awesome-icon icon="user-tag" />
        Review Your Comments
        </router-link>
      </li>
    </ol>
    <Error v-if="error_status" v-bind:error="error_msg"/>
    <router-view v-bind:user_data="user_data"> </router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Error from "@/components/Error.vue";

export default {
  name: 'dashboard',
  data() {
    return {
      authorized: false,
      error_status: false,
      error_msg: "",
      user: null,
      user_data: {}
    };
  },
   beforeCreate: function() {
    let token = localStorage.getItem("token");
    axios({
      method: "post",
      url: "http://xavier-blog-server.thenile.online:3000/decode",
      headers: { token: token }
    })
      .then(response => {
        console.log(response.data);
        this.user = response.data.message
        this.user_data = response.data.data
        this.authorized = true;
      })
      .catch(err => {
        console.log(err.response.data);
        this.$router.push('/login')
      });
  }
}
</script>
