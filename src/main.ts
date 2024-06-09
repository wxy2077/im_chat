import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import Vant from 'vant';
import store from './stores'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use(Vant);

app.mount('#app')
