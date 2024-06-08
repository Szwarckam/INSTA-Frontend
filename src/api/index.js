import axios from "axios";
import store from "@/store";
const post = async (url, object) => {
  return new Promise(async (resolve, reject) => {
    console.log(store.getters.GET_TOKEN);
    setTimeout(async () => {
      try {
        const headers = store.getters.GET_TOKEN != "" ? { Authorization: ` ${store.getters.GET_TOKEN}` } : {};
        console.log(headers);
        const response = await axios.post(url, object, { headers });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        // Uncomment these lines for detailed error logging
        if (err.response) {
          console.error("Błąd serwera:", err.response.data);
        } else if (err.request) {
          console.error("Brak odpowiedzi od serwera:", err.request);
        } else {
          console.error("Błąd w konfiguracji żądania:", err.message);
        }
        reject(err);
      }
    }, 200);
  });
};

const get = async (url) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const headers = store.getters.GET_TOKEN ? { Authorization: ` ${store.getters.GET_TOKEN}` } : {};
        const response = await axios.get(url, { headers });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }, 200);
  });
};

const patch = async (url, object) => {
  return new Promise(async (resolve, reject) => {
    console.log(store.getters.GET_TOKEN);
    setTimeout(async () => {
      try {
        const headers = store.getters.GET_TOKEN != "" ? { Authorization: ` ${store.getters.GET_TOKEN}` } : {};
        const response = await axios.patch(url, object, { headers });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        // Uncomment these lines for detailed error logging
        if (err.response) {
          console.error("Błąd serwera:", err.response.data);
        } else if (err.request) {
          console.error("Brak odpowiedzi od serwera:", err.request);
        } else {
          console.error("Błąd w konfiguracji żądania:", err.message);
        }
        reject(err);
      }
    }, 200);
  });
};

const registerUser = (object) => post("http://localhost:3000/api/user/register", object);
const loginUser = (object) => post("http://localhost:3000/api/user/login", object);
const changePassword = (object) => post("http://localhost:3000/api/user/changepass", object);
// const upladProfilePhoto = (object) => post("http://localhost:3000/api/profile", object);
const changeUserData = (object) => patch("http://localhost:3000/api/profile", object);
const logoutUser = (token) => get("http://localhost:3000/api/logout", token);
const leaveLike = (object) => post("http://localhost:3000/api/photos/like", object);
const profileInfo = (email) => get(`http://localhost:3000/api/profile/${email}`);
const myProfileInfo = () => get(`http://localhost:3000/api/profile`);
const photosList = () => get("http://localhost:3000/api/photos");
const tagsList = () => get("http://localhost:3000/api/tags/raw");
const sendFilters = (data) => patch("http://localhost:3000/api/filters", data);
export {
  sendFilters,
  registerUser,
  tagsList,
  loginUser,
  logoutUser,
  profileInfo,
  changePassword,
  myProfileInfo,
  changeUserData,
  photosList,
  leaveLike,
};
