import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/home/HomeView.vue')
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
        }
    ]
})

// 路由拦截
router.beforeEach((to, from, next) =>{
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
});
export default router
