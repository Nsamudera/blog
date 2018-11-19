<template>
    <div>
        <div id="addComment">
        Have Something to Say?
        <!-- {{authorId}} -->
        <Error v-if="error_status" v-bind:error="error_msg"/>
        <form>
            <div class="form-group">
                <textarea class="form-control" v-model="comment_content" rows="5" id="comment"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-sm" @click.prevent="addComment()">Add Comment</button>
        </form>
        </div>  
        <div class="content" v-for="comment in comments" :key="comment._id">
          <div class="owned" v-if="authorId == comment.authorId">
            <div class="top">
              <font-awesome-icon icon="user-tag" />
              {{comment.author}}
              {{comment.createdDate}}
            </div> 
            <div class="bottom">
              {{comment.comment}}
            </div>
            <div>
              <router-link :to="`/dashboard/comments/${comment._id}`">
                <button class="btn btn-sm">Edit</button> |
              </router-link>
              <button class="btn btn-sm">Delete</button>
            </div>
          </div>
          <div v-else>
            <div class="top">
              {{comment.author}}
              {{comment.createdDate}}
            </div>
            <div class="bottom">
              {{comment.comment}}
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/Error.vue";

export default {
  name: "comments",
  props: ["comments", "authorId"],
  components: {
    Error
  },
  data() {
    return {
      commentsList: [],
      comment_content: "",
      error_status: false,
      error_msg: ""
    };
  },
  methods: {
    addComment: function() {
      let token = localStorage.getItem("token");
      console.log(this.$route.params.articleId)
      axios({
        method: "post",
        url: "http://xavier-blog-server.thenile.online:3000/blog/comments/add",
        headers: { token: token },
        data: {
          articleId: this.$route.params.articleId,
          comment: this.comment_content
        }
      })
        .then(response => {
          this.commentsList.push(response.data.data)
          this.error_status = false;
        })
        .catch(err => {
          console.log(err);
          this.error_msg = err.response.data.message;
          this.error_status = true;
        });
    },
  }, 
  mounted: function(){
      this.commentsList = this.comments
  },
  watch: {
    comments: function(val) {
      console.log(val)
      this.commentsList = this.comments
    }
  }
};
</script>

<style scoped>
.content {
  margin: 10px;
  padding: 10px;
  height: 100px;
  border: 1px solid gray;
  text-align: left;
}
#bottom {
  border: 1px solid lightblue;
  height: 70%;
}
#addComment {
  padding: 10px;
  margin: 0;
}
#comment {
  width: 50%;
  margin: 0;
}
.form-group {
  display: flex;
  justify-content: center;
}
.owned {
  color: blue;
  background: bisque
}
</style>
