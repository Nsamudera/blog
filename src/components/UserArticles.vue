<template>
  <div class="content">
     <Error v-if="error_status" v-bind:error="error_msg"/>
     <!-- <h1>{{user_data}}</h1> -->
     <div class="container-fluid">
            <div class="row" style="justify-content: flex-start">
              <table id="table_task" class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th>Title</th>
                    <th>Created Date</th>
                    <th>Lastest Update</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="article in articles" :key="article._id">
                    <td>{{article.name}}</td>
                    <td>{{article.createdDate}}</td>
                    <td>{{article.updatedDate}}</td>
                    <td>
                      <router-link :to="`/dashboard/view/${article._id}`" >View</router-link> |
                      <router-link :to="`/dashboard/edit/${article._id}`"> Edit </router-link> | 
                      <a id="delete" @click="remove(article._id)">Delete</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    
  </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/Error.vue";

export default {
  name: "user_article",
  components: {
    Error
  },
  props: ["user_data"],
  data() {
    return {
      articles: [],
      error_status: false,
      error_msg: "",
    };
  },
  methods: {
    getUserArticles: function() {
      let token = localStorage.getItem("token");
      axios({
        method: "get",
        url: "http://xavier-blog-server.thenile.online:3000/blog/articles/user",
        headers: { token: token }
      })
        .then(response => {
          console.log(response);
          this.articles = response.data.data
          this.error_status = false;
        })
        .catch(err => {
          console.log(err);
          this.error_msg = err.response.data.message;
          this.error_status = true;
        });
    },
    remove: function(articleId) {
      let token = localStorage.getItem("token");
      axios({
        method: "delete",
        url: "http://xavier-blog-server.thenile.online:3000/blog/articles/user/delete",
        headers: { token: token },
        data: {
          articleId: articleId
        }
      })
        .then(response => {
          console.log(response);
          this.articles = response.data.data
          this.error_status = false;
          this.getUserArticles()
        })
        .catch(err => {
          console.log(err);
          this.error_msg = err.response.data.message;
          this.error_status = true;
        });
      console.log(articleId)
    }
  },
  mounted: function() {
    this.getUserArticles();
  }
};
</script>

<style scoped>
.content {
  margin: 10px;
}
#delete {
  color: red
}
#delete:hover {
  cursor: pointer;
  text-decoration: underline
}
</style>
