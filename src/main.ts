import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/reset.css"
import "./assets/css/global.css"
import bigData from "./components/bigData/index"

createApp(App).use(store).use(bigData).use(router).mount('#app');
