<template>
  <div class="content">
      <Error v-if="error_status" v-bind:error="error_msg"/>
      <h1>Edit Article</h1>
    <!-- <h1>{{this.$route.params.article}}</h1> -->
     <div id="articleEditor">
         
      <form>
        <div class="form-group">
          <label for="title">Article Title:</label>
          <input type="text" v-model="article_title" :v-bind:value="this.article_title" class="form-control" id="title" placeholder="Article Title">
        </div>
        <div class="form-group">
          <label for="body">Article Content:</label>
          <textarea class="form-control" v-model="article_content" :v-bind:value="this.article_content" rows="10" id="body"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="editArticle()">Edit Article</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from '@/components/Error.vue';

export default {
  name: "edit_article",
  props: ["user_data"],
  components: {
    Error
  },
  data() {
    return {
      error_status: false,
      error_msg: "",
      article_content: "",
      article_title: "",
      article: null
    };
  },
  methods: {
      getArticle: function() {
      axios({
        method: "get",
        url: "http://xavier-blog-server.thenile.online:3000/blog/articles"
      })
      .then((response) => {
        // console.log(response.data.data)
        let data = response.data.data
        data.forEach(element => {
          if(element._id == this.$route.params.article){
            this.article = element
            this.article_title = element.name
            this.article_content = element.body
          }
        });
        console.log(this.article)
        this.error_status = false
      })
      .catch((err) => {
        console.log(err)
        this.error_msg = err.response.data.message
        this.error_status = true
      })
    },
    editArticle: function() {
      let token = localStorage.getItem("token");
      let title = this.article_title
      let content = this.article_content
    //   console.log(title, content, this.article._id)
      axios({
        method: "put",
        url: "http://xavier-blog-server.thenile.online:3000/blog/articles/user/edit",
        headers: { token: token },
        data: {
          name: title,
          body: content,
          articleId: this.article._id
        }
      })
      .then(response => {
          console.log(response.data);
          this.error_status = false;
          this.$router.push('/dashboard')
      })
      .catch(err => {
        console.log(err);
        this.error_msg = err.response.data.message;
        this.error_status = true;
      });
    }
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
  },
  created: function() {
    this.getArticle()
  },
};
</script>

<style>
.content {
  margin: 10px;
}
#articleEditor {
  width: 80%;
  border: 1px solid lightseagreen;
  margin: 0 auto;
  padding: 10px;
}

</style>
