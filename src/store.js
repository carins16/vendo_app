import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    authError: null,
    items: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setAuthError (state, payload) {
      state.authError = payload
    },
    setItems (state, payload) {
      state.items = payload
    }
  },
  actions: {
    userAuth ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(
        payload.email,
        payload.password
      ).then(response => {
          commit('setAuthError', null)
          commit('setUser', {
            id:     response.user.uid,
            email:  response.user.email
          })
          localStorage.setItem('user', JSON.stringify({ 
            id:     response.user.uid, 
            email:  response.user.email
          }))
        }
      ).catch(error => {
          commit('setAuthError', {
            errorCode:  error.code,
            message:    error.message
          })
        }
      )
    },
    userSignIn ({commit}, payload) {
      commit('setUser', {
        id:     payload.uid,
        email:  payload.email
      })
      localStorage.setItem('user', JSON.stringify({ 
        id:     payload.uid,
        email:  payload.email
      }))
    },
    userSignOut ({commit}) {
      firebase.auth().signOut().then(() => {
        commit('setUser', null)
        commit('setItems', null)
        localStorage.removeItem('user')
      }).catch(error => {
        console.log(error)
      })
    },
    fetchItems ({commit}) {
      firebase.database().ref('items').on('value', snapshot => {
        // snapshot.forEach(childSnapshot => {
        //   console.log(childSnapshot.val())
        // })
        commit('setItems', snapshot.val())
      })
    },
    updateItems ({commit}, payload) {

      firebase.database().ref('items/' + payload.key).update({
        name:   payload.name,
        price:  payload.price,
        qty:    payload.qty
      }, error => {
        if (error) {
          console.log(error)
        } else {
          console.log("Update successful.")
        }
      })
    }
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getAuthError: state => {
      return state.authError
    },
    getItems: state => {
      return state.items
    }
  }
})
