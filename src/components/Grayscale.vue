<template>
  <!-- <Button
    severity="help"
    outlined
    icon="pi pi-arrow-circle-left"
    @click="this.$router.push('/editor')"
    v-tooltip.top="'Go back'"
    class="goBackBtn2"
  /> -->
  <div class="card flex justify-content-center karta" style="position: relative">
    <div class="flex flex-column align-items-center">
      <img
        :src="`http://localhost:3000/api/getimage/${getEditPhoto}`"
        id="grayscalePhoto"
        alt="image"
        class="grayscale-image"
        style="margin-block: 20px"
        :style="filterStyle"
      />
      <div class="card flex justify-content-center">
        <Checkbox v-model="grayscale" inputId="grayscale" name="grayscale" value="grayscale" :binary="true" />
        <label for="grayscale" class="ml-2"> Grayscale </label>
      </div>
      <!-- <Slider v-model="filter" class="w-14rem" :min="0" :max="360" /> -->
      <Button label="Submit" @click="updateGrayscale()" class="mt-4 btn" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grayscale: false,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async updateGrayscale() {
      if (this.grayscale) {
        const result = await this.$store.dispatch("PATCH_FILTERS", {
          id: this.$store.getters.GET_PHOTO_TO_EDIT,
          filter: "grayscale",
        });
        console.log(result);
        if (result) {
          console.log(result.file.id);
          this.showToast("success", "Success");
          this.$router.push({ name: "detail", params: { id: result.file.id } });
        }
      } else {
        this.showToast("error", "Mark grayscale");
      }
    },
  },
  computed: {
    filterStyle() {
      if (this.grayscale) {
        return { filter: "grayscale(100%)" };
      }
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
#grayscalePhoto {
  width: 600px;
  height: 400px;
}
#range {
  accent-color: rgb(206, 147, 216);
}
.grayscale-image {
  margin-block: 150px;
}
</style>
