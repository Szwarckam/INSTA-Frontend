<template>
  <div class="photos-container">
    <MyUserInfo />
    <!-- <Galleria /> -->
    <MyAlbum />
  </div>
</template>
<style></style>
<script>
import MyAlbum from "@/components/MyAlbum.vue";
import MyUserInfo from "@/components/MyUserInfo.vue";
// import Galleria from "@/components/Galleria.vue";
export default {
  components: {
    MyAlbum,
    MyUserInfo,
    // Galleria,
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
    console.log("Created");
    const result2 = await this.$store.dispatch("POST_MY_PROFILE_INFO");
    console.log(result2);
    const result = await this.$store.dispatch("GET_PHOTOS_LIST");
    console.log(result);
  },
};
</script>
<style>
.photos-container {
  width: calc(100vw - 40px);
  margin: 20px;
}
</style>
