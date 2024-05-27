import { createStore } from "vuex";

const state = {
  token: "",
}; // state

const getters = {
  GET_TOKEN(state) {
    return state.token;
  },
}; // getters

const actions = {}; // actions

const mutations = {}; //mutations

//export store

export default createStore({
  state,
  getters,
  actions,
  mutations,
});
