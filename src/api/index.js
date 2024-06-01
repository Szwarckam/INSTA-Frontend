import axios from "axios";

const post = async (url, object, token = "") => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(url, object, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        // if (err.response) {
        //   console.error("Błąd serwera:", err.response.data);
        // } else if (err.request) {
        //   console.error("Brak odpowiedzi od serwera:", err.request);
        // } else {
        //   console.error("Błąd w konfiguracji żądania:", err.message);
        // }
        reject(err);
      }
    }, 1000);
  });
};

const get = async (url, token = "") => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }, 1000);
  });
};

const registerUser = (object) => post("http://localhost:3000/api/user/register", object);
const loginUser = (object) => post("http://localhost:3000/api/user/login", object);
const logoutUser = (token) => get("http://localhost:3000/api/logout", token);
const profileInfo = (token) => get("http://localhost:3000/api/profile", token);
export { registerUser, loginUser, logoutUser, profileInfo };
