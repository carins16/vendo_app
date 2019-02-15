import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authError: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setAuthError (state, payload) {
      state.authError = payload
    }
  },
  actions: {
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(
        payload.email,
        payload.password
      ).then(
        response => {
          commit('setUser', {
            id: response.user.uid,
            email: payload.email
          })
        }
      ).catch(
        error => {
          commit('setAuthError', {
            code: error.code,
            message: error.message
          })
        }
      )
    }
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getAuthError: state => {
      return state.authError
    }
  }
})
