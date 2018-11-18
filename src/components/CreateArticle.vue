<template>
  <div class="content">
     <Error v-if="error_status" v-bind:error="error_msg"/>
     <h1>Publish Article</h1>
     <div id="articleCreation">
      <form>
        <div class="form-group">
          <label for="title">Article Title:</label>
          <input type="text" v-model="article_title" class="form-control" id="title" placeholder="Article Title">
        </div>
        <div class="form-group">
          <label for="body">Article Content:</label>
          <textarea class="form-control" v-model="article_content" rows="10" id="body"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="publish()">Create Article</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from '@/components/Error.vue';

export default {
  name: "create_article",
  props: ["user_data"],
  components: {
    Error
  },
  data() {
    return {
      error_status: false,
      error_msg: "",
      article_content: "",
      article_title: ""
    };
  },
  methods: {
    publish: function() {
      let token = localStorage.getItem("token");
      let title = this.article_title;
      let body = this.article_content;
      console.log(title, body);
      console.log(this.user_data._id);
      axios({
        method: "post",
        url: "http://xavier-blog-server.thenile.online:3000/blog/articles/user/create",
        headers: { token: token },
        data: {
          name: title,
          body: body,
          authorId: this.user_data._id
        }
      })
      .then(response => {
          console.log(response.data.data);
          this.error_status = false;
          this.articles = response.data.data;
          this.$router.push('/dashboard')

      })
      .catch(err => {
        console.log(err);
        this.error_msg = err.response.data.message;
        this.error_status = true;
      });
    }
  }
};
</script>

<style>
.content {
  margin: 10px;
}
#articleCreation {
  width: 80%;
  border: 1px solid lightseagreen;
  margin: 0 auto;
  padding: 10px;
}

</style>
