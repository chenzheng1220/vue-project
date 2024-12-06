import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      meta:{
        keepAlive:false
      },
      component: () => import('../views/index.vue')
    },
    {
      path: '/file',
      name: 'file',
      meta:{
        keepAlive:true
      },
      component: () => import('../views/file.vue')
    },
    {
      path: '/resource',
      name: 'resource',
      meta:{
        keepAlive:true
      },
      component: () => import('../views/resource.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta:{
        keepAlive:true
      },
      component: () => import('../views/about.vue')
    },
    {
      path:'/article',
      name:'article',
      meta:{
        keepAlive:false
      },
      component:() => import('../views/article.vue')
    }
  ]
})

export default router
