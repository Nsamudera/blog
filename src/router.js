import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // components: {
      //   default: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue'),
      // },
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue'),
      children: [ 
          {
            path: '',
            component: () => import(/* webpackChunkName: "about" */ './components/UserArticles.vue'),
          },
          {
            path: 'create',
            component: () => import(/* webpackChunkName: "about" */ './components/CreateArticle.vue'),
          },
          {
            path: 'view/:article',
            component: () => import(/* webpackChunkName: "about" */ './components/ViewUserArticle.vue'),
            props: true,
          },
          {
            path: 'edit/:article',
            component: () => import(/* webpackChunkName: "about" */ './components/EditArticle.vue'),
            props: true,
          },
          {
            path: 'comments',
            component: () => import(/* webpackChunkName: "about" */ './components/UserComments.vue'),
          },
          {
            path: 'comments/:comment',
            component: () => import(/* webpackChunkName: "about" */ './components/EditUserComments.vue'),
          }
        ]
    },
    {
      path: '/articles',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ViewArticles.vue'),
      children: [ 
        {
          path: '',
          component: () => import(/* webpackChunkName: "about" */ './components/ViewArticles.vue'),
        },
        {
          path: ':articleId',
          component: () => import(/* webpackChunkName: "about" */ './components/ArticleDetail.vue'),
        },
      ]
    },
    // {
    //   path: '/detail/:articleId',
    //   name: 'detail',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   props: true,
    //   component: () => import(/* webpackChunkName: "about" */ './views/ArticleDetail.vue'),
    // },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/LogIn.vue'),
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    }
  ]
})
