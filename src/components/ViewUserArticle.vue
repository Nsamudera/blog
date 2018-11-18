<template>
  <div class="content">
      <div class="article_details">
        <h2>{{article_title}}</h2>
        <p align="center">{{article_content}}</p>
      </div>
      <div class="pageSeparator"></div>
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
