<script>
// import { ref } from "vue";
// import { useRouter } from 'vue-router'
// const router = useRouter();

export default {
  methods: {},
  data() {
    return {
      isHovering: false,
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/");
          },
        },
        {
          label: "About",
          icon: "pi pi-question-circle",
          command: () => {
            this.$router.push("/about");
          },
        },
        {
          label: "My Profile",
          icon: "pi pi-user-edit",
          command: () => {
            this.$router.push("/profile");
          },
        },
        {
          label: "Settings",
          icon: "pi  pi-cog",
          command: () => {
            this.$router.push("/settings");
          },
        },
        // {
        //   label: "My Account",
        //   icon: "pi pi-user ",
        //   items: [],
        // },
      ],
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.GET_TOKEN;
    },
  },
  mounted() {

    const token = this.getToken;
    console.log(token);
    if (token == "") {
      this.items.push({
        label: "Log In",
        icon: "pi pi-sign-in",
        command: () => {
          this.$router.push("/login");
        },
      });
    } else {
      this.items.push({
        label: "Log Out",
        icon: "pi pi-sign-out",
        command: () => {
          this.$router.push("/logout");
        },
      });
    }
  },
};
</script>

<template>
  <div class="card">
    <!-- <TabMenu :model="items" /> -->

    <TabMenu :model="items">
      <!-- <template #start> -->

      <!-- </template> -->

      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <Dropdown>
            <img alt="dropdown icon" src="/icons8-instagram-ink-32.png" style="backgroundcolor: var(--primary-color)" />
          </Dropdown>
        </router-link>
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ item.label }}</span>
        </a>
      </template>
    </TabMenu>
    <!-- <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span @mouseout="isHovering = false" :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>

      <template #end>
        <div class="flex align-items-center gap-2">
          <Avatar icon="pi pi-user" class="mr-2" size="large" shape="circle" />
        </div>
      </template>
    </Menubar> -->
  </div>
</template>
