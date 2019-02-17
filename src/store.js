import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    loginError: null,
    items: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoginError (state, payload) {
      state.loginError = payload
    }
  },
  actions: {
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(
        payload.email,
        payload.password
      ).then(
        response => {
          commit('setLoginError', null)
          commit('setUser', {
            id:     response.user.uid,
            email:  response.user.email
          })
          localStorage.setItem('user', JSON.stringify({ 
              id:     response.user.uid, 
              email:  response.user.email
          }))
        }
      ).catch(
        error => {
          commit('setLoginError', {
            errorCode: error.code,
            message: error.message
          })
        }
      )
    },
    signOut ({commit}) {
      firebase.auth().signOut().then(function() {
        commit('setUser', null)
        localStorage.removeItem('user')
      }).catch(function(error) {
        console.log(error)
      });
    }
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getLoginError: state => {
      return state.loginError
    }
  }
})
