import { createApp } from 'vue'
import App from './App.vue'
import store from './store' // 引入

createApp(App).use(store).mount('#app') // 注入