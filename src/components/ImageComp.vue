<template>
  <div class="card flex justify-content-center">
    <Image alt="Image" preview>
      <template #indicatoricon>
        <i class="pi pi-search"></i>
      </template>
      <template #image>
        <!-- <Image :src="`http://localhost:3000/api/getimage/${photo.id}`" width="300" height="300" alt="Image" preview /> -->
        <img :src="`http://localhost:3000/api/getimage/${getEditPhoto}`" width="800" height="500" alt="image" />
      </template>
      <template #preview="slotProps">
        <img
          :src="`http://localhost:3000/api/getimage/${getEditPhoto}`"
          alt="preview"
          :style="slotProps.style"
          @click="slotProps.onClick"
        />
      </template>
    </Image>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {},
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
  },
  computed: {
    getEditPhoto() {
      console.log(this.$store.getters.GET_PHOTO_TO_EDIT);
      if (!this.$store.getters.GET_PHOTO_TO_EDIT) {
        this.$router.push("/myprofile");
      }
      return this.$store.getters.GET_PHOTO_TO_EDIT;
    },
    // getBio() {
    //   this.bio = this.$store.getters.GET_BIO;
    // },
  },
};
</script>
<style></style>
