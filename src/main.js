import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from 'firebase';
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

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

    firebase.database().ref('items').on('value', function(snapshot){
      console.log(snapshot.val())
    })
  }
}).$mount('#app')
