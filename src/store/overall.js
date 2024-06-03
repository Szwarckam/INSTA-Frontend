import { photosList, leaveLike } from "@/api";

const overall = {
  //state
  state() {
    return {
      visible: false,
      photos: [],
      photoToEdit: null,
    };
  },

  //mutations czyli setters
  mutations: {
    SET_VISIBLE(state, visible) {
      state.visible = visible;
    },
    SET_PHOTOS(state, photos) {
      state.photos = photos;
    },
    SET_PHOTO_TO_EDIT(state, photoToEdit) {
      state.photoToEdit = photoToEdit;
    },
  },

  //getters
  getters: {
    GET_VISIBLE(state) {
      return state.visible;
    },
    GET_PHOTOS(state) {
      return state.photos;
    },
    GET_PHOTO_TO_EDIT(state) {
      return state.photoToEdit;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    async GET_PHOTOS_LIST({ commit }) {
      console.log("Pobieranie zdjęć");
      commit("SET_VISIBLE", true);
      try {
        const response = await photosList();
        console.log("response.data", response);
        commit("SET_VISIBLE", false);

        commit("SET_PHOTOS", response.files);
        return response;
      } catch (err) {
        if (err.response) {
          console.error("Błąd serwera:", err.response.data);
          commit("SET_VISIBLE", false);
          return err.response.data;
        }
      }
      return false;
    },
    async POST_LEAVE_LIKE({ commit }, data) {
      console.log("Zostawianie like'a");
      commit("SET_VISIBLE", true);
      console.log(data);
      try {
        const response = await leaveLike(data);
        console.log("response.data", response);
        commit("SET_VISIBLE", false);
        console.log(response.files);
        commit("SET_PHOTOS", response.files);
        return response;
      } catch (err) {
        if (err.response) {
          console.error("Błąd serwera:", err.response.data);
          commit("SET_VISIBLE", false);
          return err.response.data;
        }
      }
      return false;
    },
  },
};

export default overall;
