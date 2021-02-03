import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/main.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: () => import('@/views/modules/login/login.vue') },
    {
      path: '/home', component: Home, redirect: '/welcome', children: [
        { path: '/welcome', component: () => import('@/views/modules/show') },
        { path: '/comments', component: () => import('@/views/modules/comments/CommentList') },
        { path: '/notices', component: () => import('@/views/modules/notices/NoticesList') },
        { path: '/plate', component: () => import('@/views/modules/plate/PlateList') },
        { path: '/posts', component: () => import('@/views/modules/posts/PostsList') },
        { path: '/skillposts', component: () => import('@/views/modules/skillposts/SkillPostsList') },
        { path: '/user', component: () => import('@/views/modules/user/UserList') },
      ]
    },
  ]
})
//push
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

export default router