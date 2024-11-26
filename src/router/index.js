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
      component: () => import('../views/index.vue')
    },
    {
      path: '/file',
      name: 'file',
      component: () => import('../views/file.vue')
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import('../views/resource.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue')
    },
    {
      path:'/article',
      name:'article',
      component:() => import('../views/article.vue')
    }
  ]
})

export default router
