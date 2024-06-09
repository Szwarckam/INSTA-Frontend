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
  async created() {
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
      const result = await this.$store.dispatch("POST_MY_PROFILE_INFO");
      console.log(result);
    }

    const result = await this.$store.dispatch("POST_MY_PROFILE_INFO");
    console.log(result);
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
  <Toast class="toast" />
  <ProgressBar
    v-show="isVisible"
    mode="indeterminate"
    style="height: 4px; width: 99vw; position: absolute"
  ></ProgressBar>
  <Header />

  <!-- <transition name="fade" mode="out-in"> -->
  <RouterView />
  <!-- </transition> -->
  <!-- <Spinner :visible="isVisible" /> -->
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
html {
  font-size: 14px;
}

.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.goBackBtn2 {
  margin-left: 200px;
  margin-top: 240px;
  display: block;
  width: 120px;
  height: 60px;
  position: absolute;
  left: 140px;
  top: 140px;
  z-index: 20;
}
p {
  line-height: 1.75;
}
</style>
