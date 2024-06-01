import { createStore } from "vuex";
import overall from "./overall";
import users from "./users";

const modules = {
  users,
  overall,
  // kolejne moduły store
};

export default createStore({
  modules,
});
