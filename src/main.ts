import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/app.scss'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).mount('#app')