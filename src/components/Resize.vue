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
      <img
        :src="`http://localhost:3000/api/getimage/${getEditPhoto}`"
        id="resizePhoto"
        alt="image"
        class="resize-image"
        :style="{ width: `${w}px`, height: `${h}px` }"
      />
      <InputNumber
        v-model="w"
        ref="inputW"
        inputId="minmax-buttons"
        class="mt-2"
        mode="decimal"
        showButtons
        :min="100"
        :max="maxWidth"
      />
      <InputNumber
        v-model="h"
        ref="inputH"
        inputId="minmax-buttons"
        class="mt-2"
        mode="decimal"
        showButtons
        :min="100"
        :max="maxHeight"
      />
      <Button label="Submit" @click="updateResize()" class="mt-4 btn" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      w: 600,
      h: 400,
      maxWidth: 0,
      maxHeight: 0,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async updateResize() {
      const result = await this.$store.dispatch("PATCH_FILTERS", {
        id: this.$store.getters.GET_PHOTO_TO_EDIT,
        filter: "resize",
        size: { w: parseInt(this.w), h: parseInt(this.h) },
      });
      console.log(result);
      if (result) {
        this.showToast("success", "Success");
        this.$router.push("/myprofile");
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
  mounted() {
    this.$nextTick(() => {
      this.maxWidth = window.innerWidth * 0.75;
      this.maxHeight = window.innerHeight * 0.75;
    });
  },
};
</script>

<style>
.karta {
  width: 80vw;
  margin: 20px auto;
}
#resizePhoto {
  width: 600px;
  height: 400px;
}
</style>
