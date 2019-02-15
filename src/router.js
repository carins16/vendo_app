import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Inventory from '@/views/Inventory'
import PurchaseHistory from '@/views/Purchase_history'
import Settings from '@/views/Settings'
import SignIn from '@/views/Sign_in'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    { path: '/sign_in',           name: 'sign_in',            component: SignIn },
    { path: '/',                  name: 'dashboard',          component: Dashboard },
    { path: '/inventory',         name: 'inventory',          component: Inventory },
    { path: '/purchase_history',  name: 'purchase_history',   component: PurchaseHistory },
    { path: '/settings',          name: 'settings',           component: Settings }
  ]
})
