<template>
  <div class="content">
     <Error v-if="error_status" v-bind:error="error_msg"/>
     <div class="container-fluid">
            <div class="row" style="justify-content: flex-start">
              <table id="table_task" class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th>Comment</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(comment, index) in userComments" :key="index">
                    <td>{{comment.comment}}</td>
                    <td>{{comment.createdDate}}</td>
                    <td>
                      <router-link :to="`/dashboard/comments/${comment._id}`"> Edit </router-link> | 
                      <a id="delete" @click="remove(comment._id)">Delete</a>
                      </td>
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
  name: "user_comments",
  components: {
    Error
  },
  props: ["user_data"],
  data() {
    return {
      userId: this.user_data._id,
      error_status: false,
      error_msg: "",
      userComments: []
    };
  },
  methods: {
    getComments: function() {
      let token = localStorage.getItem("token");
      axios({
        method: 'get',
        url: "http://xavier-blog-server.thenile.online:3000/blog/comments/",
        headers: { token: token },
      })
      .then(response => {
          let data = response.data.data
          data.forEach(element => {
            if(element.authorId._id === this.userId) {
              this.userComments.push(element)
            }
          });
          console.log(this.userComments)
          this.error_status = false;

      })
      .catch(err => {
        console.log(err);
        this.error_msg = err.response.data.message;
        this.error_status = true;
      });
    },
    remove: function (commentId) {
      let token = localStorage.getItem("token");
      axios({
        method: 'delete',
        url: "http://xavier-blog-server.thenile.online:3000/blog/comments/delete",
        headers: { token: token },
        data: {
          commentId: commentId
        }
      })
      .then(response => {
          console.log(response);
          this.userComments = []
          this.error_status = false;
          this.getComments()
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
  mounted: function () {
    this.getComments()
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
