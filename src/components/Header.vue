<template>
  <div class="card">
    <Menubar :model="menuItems">
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route && item.label != 'Login' && item.label != 'Logout' && item.label != 'My profile'"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else-if="item.label === 'My profile' && isLogged" v-ripple :href="item.route" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <!-- <span>Debug: Login, isLogged: {{ isLogged }}</span> -->
        </a>
        <a
          v-else-if="item.label === 'Login' && !isLogged"
          @click="logoutUser"
          v-ripple
          :href="item.route"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <!-- <span>Debug: Logout, isLogged: {{ isLogged }}</span> -->
        </a>
        <a
          v-else-if="item.label === 'Logout' && isLogged"
          @click="logoutUser"
          v-ripple
          :href="item.route"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <!-- <span>Debug: Logout, isLogged: {{ isLogged }}</span> -->
        </a>
        <a
          v-else-if="item.label != 'Login' && item.label != 'Logout' && item.label != 'My profile'"
          v-ripple
          :href="item.route"
          :target="item.target"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logged: false,
      menuItems: [
        {
          label: "Home",
          icon: "pi pi-home",
          route: "/",
        },
        {
          label: "My profile",
          icon: "pi pi-user",
          items: [
            {
              label: "My album",
              icon: "pi pi-address-book",
              route: "/myprofile",
            },
            {
              label: "Settings",
              icon: "pi pi-spin pi-cog",
              route: "/settings",
            },
          ],
        },
        {
          label: "Login",
          icon: "pi pi-link",
          route: "/login",
        },
        {
          label: "Logout",
          icon: "pi pi-link",
        },
      ],
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async logoutUser() {
      console.log("Log out");
      const result = await this.$store.dispatch("GET_LOGOUT_USER", this.$store.getters.GET_TOKEN);
      console.log(result);
      if (result.status >= 400 && result.status < 500) {
        this.showToast("error", result.message);
      } else if (result.status >= 200 && result.status < 300) {
        this.showToast("success", result.message);
        this.$router.push("/");
      }
    },
  },
  computed: {
    isLogged() {
      return this.$store.getters.GET_TOKEN !== "";
    },
  },
};
</script>
