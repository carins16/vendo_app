import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    authError: null,
    items: null,
    updates: null,
    purchaseHistory: null
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
    },
    setUpdates (state, payload) {
      state.updates = payload
    },
    setPurchaseHistory (state, payload) {
      state.purchaseHistory = payload
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
        commit('setItems', snapshot.val())
      })
    },
    fetchPurchaseHistory ({commit}) {
      firebase.database().ref('purchase_history').on('value', snapshot => {

        var purchaseHistory = []
        
        snapshot.forEach(childSnapshot => {
          
          purchaseHistory.push({
            key: childSnapshot.key,
            id: childSnapshot.val().id,
            name: childSnapshot.val().name,
            price: childSnapshot.val().price,
            date: childSnapshot.val().date,
          })
          // purchaseHistory[childSnapshot.key] = childSnapshot.val()
        })

        purchaseHistory.reverse()

        commit('setPurchaseHistory', purchaseHistory)
      })
    },
    updateItems ({commit}, payload) {

      firebase.database().ref('items/' + payload.key).set({
        name:   payload.name,
        price:  payload.price,
        qty:    payload.qty
      }, error => {
        if (error) {
          console.log(error)
        } else {
          commit('setUpdates', { 
            status: true, 
            msg: 'Product ' + payload.key + ' successfully updated.'
          })
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
    },
    getUpdates: state => {
      return state.updates
    },
    getPurchaseHistory: state => {
      return state.purchaseHistory
    }
  }
})
