<template>
  <div v-if="authorized">
    <Error v-if="error_status" v-bind:error="error_msg"/>
    <div class="pageContent row">
      <SideBar class="col-2" v-bind:article="articles" v-on:sendArticleId="sendArticleId"></SideBar>
      <div class="col-8" style="display:flex; justify-content:space-evenly">
        <router-view :articleDetail="articleDetail" :userId="userId"></router-view>
        <!-- <ArticleList v-for="article in articles" v-bind:name="article.name" v-bind:body="article.body" v-bind:date="article.createdDate" v-bind:id="article._id" :key="article.id"> </ArticleList> -->
      </div>
      <Chat class="col-2" :userName="userName" :userId="userId"></Chat>
    </div>
  </div>

</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import Error from '@/components/Error.vue';
import Chat from '@/components/Chat.vue'


export default {
  name: "articles",
  components: {
    SideBar,
    NavBar,
    Error,
    Chat
  },
  data() {
    return {
      authorized: false,
      articles: [],
      error_status: false,
      error_msg: "",
      articleDetail: "",
      userId: "",
      userName: ""
    };
  },
  methods: {
    sendArticleId: function(article) {
      this.articleDetail = article
    },
    getArticle: function() {
      axios({
        method: "get",
        url: "http://xavier-blog-server.thenile.online:3000/blog/articles"
        })
        .then(response => {
          this.error_status = false;
          this.articles = response.data.data;
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
        this.userId = response.data.data._id
        this.userName = response.data.data.name
        this.authorized = true;
      })
      .catch(err => {
        console.log(err.response.data);
        this.$router.push('/login')
      });
  },
  created: function() {
    this.getArticle();
  }
};
</script>

<style scoped>

.pageContent {
  margin-left: 180px
}
</style>