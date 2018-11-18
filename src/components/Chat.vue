<template>
    <div class="chatBorder">
        <p><b>Welcome:</b> {{userName}} <p>
        <textarea name="" id="" rows="3" placeholder="Type your message here" v-on:keyup.enter="sendMessage"></textarea>        

        <hr>
        <div>
          <h3>Chat Box:</h3>
        </div>
        <div class="messages">
        <div class="message" v-for="(message, index) in messages" :key="index">
          <div>
            <font-awesome-icon v-if="message.userId == userId" icon="user-tag" style="color:blue"/>
            <font-awesome-icon v-else icon="user-circle"/> 
            &nbsp;
            <strong>{{message.username}}</strong>
          </div>
          <div class="date">{{chatDate()}}</div>

          <p>{{message.text}}</p>
        </div>
     </div>        
    </div>

</template>


<script>
import fire from '../fire'

export default {
  name: "chat",
  props: ["userName", "userId"],
  data() {
    return {
      messages: []
    };
  },
  methods: {
    sendMessage: function(e) {
      e.preventDefault();
      if (e.target.value) {
        const message = {
          username: this.userName,
          text: e.target.value,
          userId: this.userId
        };
        //Push message to firebase reference
        fire.database().ref('messages').push(message);
        e.target.value = "";
      }
    },
    chatDate: function() {
      let newDate =  new Date();
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let date = newDate.getDate();
      return month+ "/" + date + "/" + year;
    }
  },
  mounted() {
    this.username = this.userName
    let self = this;
    const itemsRef = fire.database().ref("messages");
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text,
          userId: data[key].userId
        });
      });
      self.messages = messages;
    });
  }
};
</script>

<style>
.messages {
  word-wrap: break-word;
  overflow-y: scroll;
  height: 400px;
  width:200px;
}
.message {
  margin: 10px;
  border: 1px solid slategray;
  border-radius: 10px;
  text-align:left; 
  padding-left: 10px
}
.chatBorder{
  padding-right: 220px;
  border: 5px solid lightblue;
  border-radius: 15px;
  background-color: lightgoldenrodyellow
}
.date {
  font-size: 12px;
  color: slategray
}

</style>
