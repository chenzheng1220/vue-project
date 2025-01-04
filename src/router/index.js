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
        keepAlive:true
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

let startTime = Date.now();
let currentTime = null;

router.beforeEach(async(to,from,next) => {
  if(to){
    currentTime = Date.now();
    let stayTime = ((currentTime - startTime) / 1000).toFixed(1);
    startTime = Date.now();
    const data = {
      ip:localStorage.getItem('ip'),
      event:'click',
      type:'导航',
      target:from.path,
      stayTime:stayTime + 's'
    }
    await fetch('/api/track',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });

  }
  next();
})
export default router
