// import "./assets/main.css";
import "primevue/resources/themes/md-dark-deeppurple/theme.css";
import "primeicons/primeicons.css";
// import router from "./router";
import { createApp } from "vue";
// import { createApp } from 'vue';
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import TabMenu from "primevue/tabmenu";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import InputText from "primevue/inputtext";

import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App);

app.use(router);
app.use(store);
app.component("Menubar", Menubar);
app.component("Avatar", Avatar);
app.component("InputText", InputText);
app.component("TabMenu", TabMenu);
// app.component('Badge', Badge);
app.directive("ripple", Ripple);
app.use(PrimeVue);
app.mount("#app");
