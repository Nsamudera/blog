<template>
<div id="mySidenav" class="sidenav">
    <ul id="left">
        <li><router-link to="/articles">Articles</router-link></li>
        <ul>
            <li v-for="(list, index) in article" :key="index" @click="sendArticleIdtoParent(list)">
                <router-link :to="`/articles/${list._id}`" style="font-size:12px">{{list.name}}</router-link>
            </li>
        </ul>
    </ul>
</div>
</template>

<script>
export default {
  name: 'SideBar',
  props: ['article'],
  methods: {
      sendArticleIdtoParent: function (article) {
          this.$emit('sendArticleId', article)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidenav {
    padding-top: 10px;
    height: 100%;
    width: 180px;
    position: absolute;
    left: 0;
    transition: 0.5s;
    border-right: 2px solid lightgray
}
ul#left {
    list-style: none;
    padding-left: 10px;
    text-align: left;
    color: #2c3e50
}
.sidenav li{
    margin-bottom: 10px;
}
a {
  font-weight: bold;
  color: black;
  font-size: 18px;
}

</style>
