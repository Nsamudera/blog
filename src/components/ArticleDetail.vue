<template>
  <div class="content">
      <div class="article_details">
        <h2>{{articleDetail.name}}</h2>
        <h5 style="font-size:14px">{{articleDetail.author.name}} | {{articleDetail.createdDate}}</h5>
        <p align="center">{{articleDetail.body}}</p>
      </div>
      <div class="pageSeparator"></div>
      <!--Comment Section-->
      <div>
        <br>
        <button v-if="!commentShow" type="button" class="btn btn-primary" v-on:click="toggleComment()"> View Comments</button>
        <button v-else-if="commentShow" type="button" class="btn btn-primary" v-on:click="toggleComment()"> Hide Comments</button>
        <Comments v-if="commentShow" v-bind:comments="articleDetail.comments" v-bind:authorId="userId"></Comments>
      </div>
  </div>
</template>

<script>
import Comments from "@/components/CommentDetail.vue";

export default {
  name: "detail",
  components: {
    Comments
  },
  props: ["articleDetail", "userId"],
  data () {
    return {
      article: null,
      commentShow: false,
    }
  },
  methods: {
    toggleComment: function() {
      if (this.commentShow) {
        this.commentShow = false;
      } else {
        this.commentShow = true;
      }
    },
  },
};
</script>

<style>
.content {
  margin: 30px;
}
</style>
