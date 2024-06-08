<template>
  <div>
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
        <span class="tint" :style="{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.6)` }"> </span>
        <img
          :src="`http://localhost:3000/api/getimage/${getEditPhoto}`"
          id="tintPhoto"
          alt="image"
          class="tint-image"
        />
        <div class="card flex justify-content-center mt-2">
          <Knob v-model="r" :min="0" :max="255" valueColor="Red" />
          <Knob v-model="g" :min="0" :max="255" valueColor="Green" />
          <Knob v-model="b" :min="0" :max="255" valueColor="BLue" />
        </div>
        <Button label="Submit" @click="updateTint()" class="mt-4 btn" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      r: 0,
      g: 0,
      b: 0,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async updateTint() {
      const result = await this.$store.dispatch("PATCH_FILTERS", {
        id: this.$store.getters.GET_PHOTO_TO_EDIT,
        filter: "tint",
        color: { r: parseInt(this.r), g: parseInt(this.g), b: parseInt(this.b) },
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
};
</script>

<style>
.tint {
  z-index: 20;
  width: 600px;
  height: 400px;
  display: inline-block;
  position: absolute;
  /* mix-blend-mode: multiply; */
}
.karta {
  width: 80vw;
  margin: 20px auto;
}
#tintPhoto {
  width: 600px;
  height: 400px;
  z-index: 0;
}
</style>
