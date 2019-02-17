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
            id: response.user.uid
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
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid
      })
    },
    signOut ({commit}) {
      firebase.auth().signOut().then(function() {
        commit('setUser', null)
      }).catch(function(error) {
        console.log(error)
      });
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
