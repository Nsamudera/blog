<template>
  <div class="content">
      <Error v-if="error_status" v-bind:error="error_msg"/>
      <h1>Edit Comment</h1>
     <div id="commentEditor">
      <form>
        <div class="form-group">
          <label for="comment">Comment:</label>
          <input type="text" v-model="comment_content" :v-bind:value="this.comment_content" class="form-control" id="comment">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="editComment()">Edit Comment</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/Error.vue";

export default {
  name: "edit_comment",
  components: {
    Error
  },
  data() {
    return {
      error_status: false,
      error_msg: "",
      comment_content: ""
    };
  },
  methods: {
    getComment: function() {
      let token = localStorage.getItem("token");
      axios({
        method: "get",
        url: "http://xavier-blog-server.thenile.online:3000/blog/comments",
        headers: { token: token }
      })
        .then(response => {
          // console.log(response.data.data)
          let data = response.data.data;
          data.forEach(element => {
            if (element._id == this.$route.params.comment) {
              this.comment_content = element.comment;
            }
          });
          this.error_status = false;
        })
        .catch(err => {
          console.log(err);
          this.error_msg = err.response.data.message;
          this.error_status = true;
        });
    },
    editComment: function() {
      let token = localStorage.getItem("token");
      axios({
        method: "put",
        url: "http://xavier-blog-server.thenile.online:3000/blog/comments/edit",
        headers: { token: token },
        data: {
          commentId: this.$route.params.comment,
          comment: this.comment_content
        }
      })
      .then(response => {
          console.log(response.data);
          this.error_status = false;
          this.$router.push('/dashboard/comments')
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
        this.$router.push("/login");
      });
  },
  created: function() {
    this.getComment();
  }
};
</script>

<style>
.content {
  margin: 10px;
}
#commentEditor {
  width: 80%;
  border: 1px solid lightseagreen;
  margin: 0 auto;
  padding: 10px;
}
</style>
