import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: 'search'
  }, {
    path: "/search",
    component: () => import("../views/search/index.vue"),
    name: "search"
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
