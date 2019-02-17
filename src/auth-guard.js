import store from './store'

export default (to, from, next) => {
    if (store.getters.getUser) {
        next()
    } else {
        next('/sign_in')
    }
}