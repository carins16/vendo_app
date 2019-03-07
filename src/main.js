import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from 'firebase';
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueTimeago from 'vue-timeago'

Vue.config.productionTip = false

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'ja': require('date-fns/locale/ja'),
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {

    firebase.initializeApp({
      apiKey: 'AIzaSyBFzG-uzkbCCZJyViRsrjDAm6fi3vJhxro',
      authDomain: 'vendo-app-fa30b.firebaseapp.com',
      databaseURL: 'https://vendo-app-fa30b.firebaseio.com',
      projectId: 'vendo-app-fa30b',
      storageBucket: 'vendo-app-fa30b.appspot.com',
      messagingSenderId: '1046399963141'
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('userSignIn', { uid: user.uid, email: user.email })
        this.$store.dispatch('fetchItems')
        this.$store.dispatch('fetchPurchaseHistory')
      } else {
        this.$store.dispatch('userSignOut')
      }
    })
  }
}).$mount('#app')
