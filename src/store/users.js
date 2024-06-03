import {
  registerUser,
  loginUser,
  logoutUser,
  profileInfo,
  changePassword,
  changeUserData,
  // upladProfilePhoto,
} from "@/api";
import { email } from "@vee-validate/rules";

const users = {
  //state
  state() {
    return {
      token: "",
      name: "",
      lastName: "",
      email: "",
      bio: "",
    };
  },

  //mutations czyli setters
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_DATA(state, userData) {
      state.name = userData.name;
      state.lastName = userData.lastName;
      state.email = userData.email;
      state.bio = userData.bio;
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_LAST_NAME(state, lastName) {
      state.lastName = lastName;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_PASS(state, pass) {
      state.pass = pass;
    },
    SET_BIO(state, bio) {
      state.bio = bio;
    },
  },

  //getters
  getters: {
    GET_TOKEN(state) {
      console.log("Token", state.token);
      return state.token;
    },
    GET_NAME(state) {
      return state.name;
    },
    GET_LAST_NAME(state) {
      return state.lastName;
    },
    GET_EMAIL(state) {
      return state.email;
    },
    GET_BIO(state) {
      return state.bio;
    },
    GET_USER_DATA(state) {
      return {
        name: state.name,
        lastName: state.lastName,
        email: state.email,
        bio: state.bio,
      };
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    async POST_REGISTER_USER({ commit }, userData) {
      console.log("POST");
      console.log("Ustawienie visible:");
      commit("SET_VISIBLE", true);
      // commit("SHOW_ERROR", true);
      // showError();
      try {
        const response = await registerUser(userData);
        console.log("response.data", response);
        commit("SET_VISIBLE", false);
        console.log(response);
        return response;
      } catch (err) {
        if (err.response) {
          console.error("Błąd serwera:", err.response.data);
          // console.error("Komunikat o błędzie:", err.response.data.message);
          commit("SET_VISIBLE", false);
          return err.response.data;
        }
      }
    },
    async POST_PROFILE_INFO({ commit }, userData) {
      console.log("POST");
      console.log("Ustawienie visible:");
      commit("SET_VISIBLE", true);
      // commit("SHOW_ERROR", true);
      // showError();
      try {
        const response = await profileInfo(userData);
        console.log("response.data", response);
        commit("SET_USER_DATA", response.profileData);
        // console.log(this.$store.getters.GET_EMAIL);
        commit("SET_VISIBLE", false);

        console.log(response);
        return response;
      } catch (err) {
        if (err.response) {
          console.error("Błąd serwera:", err.response.data);
          // console.error("Komunikat o błędzie:", err.response.data.message);
          commit("SET_VISIBLE", false);
          return err.response.data;
        }
      }
    },
    async POST_UPLOAD_PROFILE_PHOTO({ commit }, userData) {
      console.log("Wysyłanie zdjęcia profilowego");
      commit("SET_VISIBLE", true);
      try {
        const response = await upladProfilePhoto(userData);
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
    },
    //POST_CHANGE_USER_DATA
    async POST_CHANGE_USER_DATA({ commit }, data) {
      console.log("Zmiana danych użytkownika");
      commit("SET_VISIBLE", true);
      // commit("SHOW_ERROR", true);
      // showError();
      try {
        // console.log("POST: ", token);
        const response = await changeUserData(data);
        console.log("response.data", response);
        commit("SET_USER_DATA", response.profileData);
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
    },
    async POST_CHANGE_PASS({ commit }, data) {
      console.log("Zmiana hasła");
      commit("SET_VISIBLE", true);
      // commit("SHOW_ERROR", true);
      // showError();
      try {
        // console.log("POST: ", token);
        const response = await changePassword(data);
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
    },
    async POST_LOGIN_USER({ commit }, userData) {
      console.log("POST");
      console.log("Logowanie:");
      commit("SET_VISIBLE", true);
      try {
        const response = await loginUser(userData);
        console.log("response.data", response);
        commit("SET_VISIBLE", false);
        // if (response.token) {
        commit("SET_TOKEN", response.token);
        commit("SET_EMAIL", userData.email);
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours
        document.cookie = `token=${response.token}; expires=${expiryDate.toUTCString()}; path=/`;
        // }
        // console.log(response.data);

        return response;
      } catch (err) {
        if (err.response) {
          console.error("Błąd serwera:", err.response.data);
          // console.error("Komunikat o błędzie:", err.response.data.message);
          commit("SET_VISIBLE", false);
          return err.response.data;
        }
      }
      return false;
    },
    async GET_LOGOUT_USER({ commit }, token) {
      console.log("POST");
      console.log("Wylogownie:");
      commit("SET_VISIBLE", true);
      try {
        const response = await logoutUser(token);
        console.log("response.data", response);
        commit("SET_VISIBLE", false);
        // if (response.token) {
        commit("SET_TOKEN", "");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // }
        // console.log(response.data);

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

export default users;
