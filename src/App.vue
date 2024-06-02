<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Header from "@/components/Header.vue";
import Spinner from "@/components/Spinner.vue";
import Toast from "primevue/toast";
export default {
  components: {
    HelloWorld,
    Header,
    Spinner,
    Toast,
  },
  computed: {
    isVisible() {
      return this.$store.getters.GET_VISIBLE;
    },
  },
  created() {
    const cookies = document.cookie.split(";");
    let token = null;
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        token = value;
      }
    });

    if (token) {
      this.$store.commit("SET_TOKEN", token);
    }
  },
  methods: {
    show_Error() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "Message Content", life: 3000 });
    },
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<template>
  <Toast />
  <Header />
  <RouterView />
  <Spinner :visible="isVisible" />
</template>

<style scoped>
html {
  font-size: 14px;
}

body {
  font-family: var(--font-family);
  font-weight: normal;
  background: var(--surface-ground);
  color: var(--text-color);
  padding: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

p {
  line-height: 1.75;
}
</style>
