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
        id="rotatePhoto"
        alt="image"
        class="rotate-image"
        :style="filterStyle"
      />
      <!-- <SelectButton v-model="filter" :options="filterOptions" optionLabel="label" optionValue="value" class="mb-3" /> -->
      <input type="range" id="range" v-model="angle" class="w-14rem" :min="0" :max="360" />
      <!-- <Slider v-model="filter" class="w-14rem" :min="0" :max="360" /> -->
      <Button label="Submit" @click="updateRotate()" class="mt-4 btn" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      angle: 0,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async updateRotate() {
      const result = await this.$store.dispatch("PATCH_FILTERS", {
        id: this.$store.getters.GET_PHOTO_TO_EDIT,
        filter: "rotate",
        angle: this.angle,
      });
      console.log(result);
      if (result) {
        console.log(result.file.id);
        this.showToast("success", "Success");
        this.$router.push("/myprofile");
      }
    },
  },
  computed: {
    filterStyle() {
      return {
        transform: `rotate(${this.angle}deg)`,
      };
    },
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
.karta {
  width: 80vw;
  margin: 20px auto;
}
#rotatePhoto {
  width: 600px;
  height: 400px;
}
#range {
  accent-color: rgb(206, 147, 216);
}
.rotate-image {
  margin-block: 150px;
}
</style>
