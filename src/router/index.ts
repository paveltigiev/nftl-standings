import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import StandingsView from '../views/StandingsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'StandingsView',
    component: StandingsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
