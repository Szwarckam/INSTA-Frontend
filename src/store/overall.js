import { photosList, leaveLike, tagsList, sendFilters, delPhoto } from "@/api";

const overall = {
  //state
  state() {
    return {
      visible: false,
      photos: [],
      photoToEdit: null,
      tags: [],
      findPhotosBy: [],
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
    SET_TAGS(state, tags) {
      state.tags = [];
      for (const tag of tags) {
        state.tags.push({ name: tag, code: tag });
      }
    },
    SET_FIND_PHOTOS_BY(state, tags) {
      state.findPhotosBy = [];
      for (const tag of tags) {
        state.findPhotosBy.push(tag.name);
      }
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
    GET_TAGS(state) {
      return state.tags;
    },
    GET_FIND_PHOTOS_BY(state) {
      return state.findPhotosBy;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    async PATCH_FILTERS({ commit }, data) {
      console.log("dODAWANIE FILTRÓW");
      commit("SET_VISIBLE", true);
      console.log(data);
      try {
        const response = await sendFilters(data);
        console.log("response.data", response);
        commit("SET_VISIBLE", false);
        console.log(response);

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
    async GET_PHOTOS_LIST({ commit }) {
      console.log("Pobieranie zdjęć");
      commit("SET_VISIBLE", true);
      try {
        const response = await photosList();
        console.log("response.data", response);
        commit("SET_VISIBLE", false);

        commit("SET_PHOTOS", response.files.reverse());
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
    async DEL_PHOTO({ commit }, id) {
      console.log("Usuwanie zdjecia");
      commit("SET_VISIBLE", true);
      try {
        const response = await delPhoto(id);
        console.log("response.data", response);
        // commit("SET_VISIBLE", false);

        return response;
      } catch (err) {
        if (err.response) {
          console.error("Błąd serwera:", err.response.data);
          // commit("SET_VISIBLE", false);
          return err.response.data;
        }
      }
      return false;
    },
    async GET_TAGS_LIST({ commit }) {
      console.log("Pobieranie tagów");
      commit("SET_VISIBLE", true);
      try {
        const response = await tagsList();
        console.log("response.data", response);
        commit("SET_VISIBLE", false);

        commit("SET_TAGS", response.tags);
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
        commit("SET_PHOTOS", response.files.reverse());
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
