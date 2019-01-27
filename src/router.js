import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Inventory from './views/Inventory.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/login',         name: 'login' },
    { path: '/admin/home',          name: 'home',         component: Home },
    { path: '/inventory',     name: 'inventory',    component: Inventory },
    { path: '/transactions',  name: 'transactions'},
    { path: '/accounts',      name: 'accounts'},
    { path: '/settings',      name: 'settings'}
  ]
})
