import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/chat-list'
    },
    {
      path: '/chat-list',
      name: 'chat-list',
      component: () => import('@/views/chat-list/ChatListView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/chat/ChatView.vue')
    },
    {
      path: '/friend',
      name: 'friend',
      component: () => import('../views/friend/FriendView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/search/SearchView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile/ProfileView.vue')
    }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.path === '/login') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
