import Vue from 'vue'
import VueRouter from 'vue-router'
import Loupan from '../views/Loupan.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Loupan,
    children: [
      {
        path: '',
        component: () => import('../components/Loupan/Search.vue')
      },
      {
        path: 'link-list',
        name: 'LinkList',
        component: () => import('../components/Loupan/UrlList.vue')
      },
      {
        path: 'sort',
        name: 'Sort',
        component: () => import('../components/Loupan/Sort.vue')
      }
    ]
  },
  {
    path: '/bankuai',
    name: 'Bankuai',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Bankuai.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
