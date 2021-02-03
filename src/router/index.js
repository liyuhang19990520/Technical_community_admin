import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: () => import('@/views/modules/login/login.vue') },
    { path: '/home', component: ()=>import('@/views/main.vue')}
  ]
})

export default router