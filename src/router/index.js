import { createRouter, createWebHistory } from "vue-router";

//static load
//@ oznacza katalog /src

import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";

//lazy load - renderuje się tylko gdy jest potrzebny a nie z góry

const NotFoundView = () => import("@/views/NotFoundView.vue");
const Editor = () => import("@/views/EditorView.vue");
const Login = () => import("@/views/LoginView.vue");
const Register = () => import("@/views/RegisterView.vue");
const Settings = () => import("@/views/SettingsView.vue");
const Auth = () => import("@/views/AuthView.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/editor",
      name: "editor",
      component: Editor,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundView",
      component: NotFoundView,
    },
  ],
});

export default router;
