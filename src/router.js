import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Inventory from '@/views/Inventory'
import PurchaseHistory from '@/views/Purchase_history'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    { path: '/signin',            name: 'signin' },
    { path: '/',                  name: 'dashboard',          component: Dashboard },
    { path: '/inventory',         name: 'inventory',          component: Inventory },
    { path: '/purchase_history',  name: 'purchase_history',   component: PurchaseHistory},
    { path: '/settings',          name: 'settings',           component: Settings}
  ]
})
