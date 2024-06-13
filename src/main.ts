import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import Vant from 'vant'
import store from './stores'
import { useWebSocketStore } from '@/stores/websocketStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use(Vant)

const websocketStore = useWebSocketStore()

const token = localStorage.getItem('token')
if (token) {
  websocketStore.connectWebSocket(import.meta.env.VITE_BASE_WS, token)
}

app.mount('#app')

// 在应用关闭时关闭 WebSocket 连接
window.addEventListener('beforeunload', () => {
  websocketStore.closeWebSocket()
})
