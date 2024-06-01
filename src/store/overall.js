import { registerUser } from "@/api";
// import { overload } from "quill/core/quill";

const overall = {
  //state
  state() {
    return {
      visible: false,
    };
  },

  //mutations czyli setters
  mutations: {
    SET_VISIBLE(state, visible) {
      state.visible = visible;
    },
  },

  //getters
  getters: {
    GET_VISIBLE(state) {
      return state.visible;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {},
};

export default overall;
