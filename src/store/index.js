import { createStore } from 'vuex'

const state = {
    navItems: [
        "Home",
        "Profile",
        "Search"
    ]
} // state

const getters = {
    GET_NAVITEMS(state) {
        return state.navItems
    }

} // getters

const actions = {} // actions

const mutations = {} //mutations

//export store

export default createStore({
    state, getters, actions, mutations
})