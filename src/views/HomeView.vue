<template>
  <div class="card">
    <h1>Home</h1>
  </div>
</template>
<style></style>
<script>
export default {
  components: {
    // UploadProfile,
    // ChangeInfo,
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
  },
  computed: {},
  async created() {
    // console.log("Created");
    // const result = await this.$store.dispatch("PHOTOS_LIST");
    // console.log(result);
    // if (result.status >= 400 && result.status < 500) {
    //   // this.$router.push("/login");
    //   this.showToast("error", result.message);
    // } else if (result.status >= 200 && result.status < 300) {
    //   // this.$store.commit("SET_USER_DATA", result.profileData);
    //   // this.userBio = this.$store.getters.GET_BIO;
    //   // console.log(this.userBio);
    //   // setInterval(() => {
    //   //   // console.log(this.userBio);
    //   // }, 100);
    //   // this.showToast("success", result.message);
    //   // this.$router.push("/login");
    // }
  },
};
</script>
