<template>
  <Button
    severity="help"
    outlined
    icon="pi pi-arrow-circle-left"
    @click="this.$router.push('/editor')"
    v-tooltip.top="'Go back'"
    class="goBackBtn2"
  />
  <div class="card flex justify-content-center karta" style="position: relative">
    <div class="flex flex-column align-items-center">
      <cropper
        :src="`http://localhost:3000/api/getimage/${getEditPhoto}`"
        @change="change"
        class="croper"
        id="croperPhoto"
        alt="image"
        style="margin-block: 20px"
      />
      <!-- <div class="card flex justify-content-center"> -->
      <!-- <Slider v-model="filter" class="w-14rem" :min="0" :max="360" /> -->
      <Button label="Submit" @click="updateCroper()" class="mt-4 btn" />
    </div>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  components: {
    Cropper,
  },
  data() {
    return {
      w: 0,
      h: 0,
      t: 0,
      l: 0,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    change({ coordinates }) {
      console.log(coordinates);
      this.w = coordinates.width;
      this.h = coordinates.height;
      this.t = coordinates.top;
      this.l = coordinates.left;
    },
    async updateCroper() {
      console.log(this.w);
      if (this.w > 0 && this.h > 0) {
        const result = await this.$store.dispatch("PATCH_FILTERS", {
          id: this.$store.getters.GET_PHOTO_TO_EDIT,
          filter: "crop",
          size: { w: this.w, h: this.h, l: this.l, t: this.t },
        });
        console.log(result);
        if (result) {
          console.log(result.file.id);
          this.showToast("success", "Success");
          this.$router.push("/myprofile");
        }
      } else {
        this.showToast("error", "Change size");
      }
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
  },
};
</script>
<style>
.croper {
  width: 70vw;
  /* height: 80vh; */
}
</style>
