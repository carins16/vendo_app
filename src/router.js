import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Inventory from '@/views/Inventory'
import PurchaseHistory from '@/views/Purchase_history'
import SignIn from '@/views/Sign_in'
import AuthGuard from './auth-guard'
import store from './store'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    { 
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        if (store.getters.getUser) {
          next('/')
        } else {
          next()
        }
        
      }
    },
    { 
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    { 
      path: '/inventory',
      name: 'inventory',
      component: Inventory,
      beforeEnter: AuthGuard
    },
    { 
      path: '/purchase_history',
      name: 'purchase_history',
      component: PurchaseHistory,
      beforeEnter: AuthGuard
    }
  ]
})
