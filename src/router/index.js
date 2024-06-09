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
const MyProfile = () => import("@/views/MyProfileView.vue");
const Detail = () => import("@/views/DetailView.vue");
const AddPhoto = () => import("@/views/AddPhotoView.vue");
const Profile = () => import("@/views/othersProfileView.vue");
const ResetPass = () => import("@/components/ResetPass.vue");
// const Rotate = () => import("@/components/Rotate.vue");
// const Resize = () => import("@/components/Resize.vue");
// const Reformat = () => import("@/components/Reformat.vue");
// const Grayscale = () => import("@/components/Grayscale.vue");
// const Flip = () => import("@/components/Flip.vue");
// const Negate = () => import("@/components/Negate.vue");
// const Tint = () => import("@/components/Tint.vue");
// const Croper = () => import("@/components/Croper.vue");
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
    // {
    //   path: "/editor",
    //   name: "editor",
    //   component: Editor,
    // },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/myprofile",
      name: "myprofile",
      component: MyProfile,
    },
    {
      path: "/add",
      name: "add",
      component: AddPhoto,
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
      path: "/detail/:id",
      name: "detail",
      component: Detail,
      props: true,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/resetPass",
      name: "ResetPass",
      component: ResetPass,
    },
    {
      path: "/editor/:name",
      name: "Editor",
      component: Editor,
      props: true,
    },
    {
      path: "/profile/:name",
      name: "profile",
      component: Profile,
      props: true,
    },
    // {
    //   path: "/rotate",
    //   name: "rotate",
    //   component: Rotate,
    // },
    // {
    //   path: "/reformat",
    //   name: "reformat",
    //   component: Reformat,
    // },
    // {
    //   path: "/grayscale",
    //   name: "grayscale",
    //   component: Grayscale,
    // },
    // {
    //   path: "/crop",
    //   name: "crop",
    //   component: Croper,
    // },
    // {
    //   path: "/flip",
    //   name: "flip",
    //   component: Flip,
    // },
    // {
    //   path: "/negate",
    //   name: "negate",
    //   component: Negate,
    // },
    // {
    //   path: "/tint",
    //   name: "tint",
    //   component: Tint,
    // },
    // {
    //   path: "/resize",
    //   name: "resize",
    //   component: Resize,
    // },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundView",
      component: NotFoundView,
    },
  ],
});

export default router;
