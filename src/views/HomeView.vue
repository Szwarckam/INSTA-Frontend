<template>
  <div class="photos-container">
    <Button
      :style="{ display: $store.getters.GET_TOKEN !== '' ? 'inline-block' : 'none' }"
      severity="help"
      icon="pi pi-plus-circle"
      @click="this.$router.push('/addPhoto')"
      class="btn-edit2"
      v-tooltip.left="'Add photo'"
    />
    <PhotosCards />
  </div>
</template>
<style></style>
<script>
import PhotosCards from "@/components/PhotosCards.vue";
export default {
  components: {
    PhotosCards,
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
.btn-edit2 {
  position: absolute;
  right: 40px;
}
</style>
