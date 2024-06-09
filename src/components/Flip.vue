<template>
  <!-- <Button
    severity="help"
    outlined
    icon="pi pi-arrow-circle-left"
    @click="this.$router.push({ name: 'Editor', params: { name: 'image' } });"
    v-tooltip.top="'Go back'"
    class="goBackBtn2"
  /> -->
  <div class="card flex justify-content-center karta" style="position: relative">
    <div class="flex flex-column align-items-center">
      <img
        :src="`http://localhost:3000/api/getimage/${getEditPhoto}`"
        id="flipPhoto"
        alt="image"
        class="flip-image"
        style="margin-block: 20px"
        :style="filterStyle"
      />
      <div class="card flex justify-content-center">
        <Checkbox v-model="flip" inputId="flip" name="flip" value="true" :binary="true" />
        <label for="flip" class="ml-2"> Flip </label>
      </div>
      <!-- <Slider v-model="filter" class="w-14rem" :min="0" :max="360" /> -->
      <Button label="Submit" @click="updateFlip()" class="mt-4 btn" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flip: false,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async updateFlip() {
      if (this.flip) {
        const result = await this.$store.dispatch("PATCH_FILTERS", {
          id: this.$store.getters.GET_PHOTO_TO_EDIT,
          filter: "flip",
        });
        console.log(result);
        if (result) {
          console.log(result.file.id);
          this.showToast("success", "Success");
          this.$router.push({ name: "detail", params: { id: result.file.id } });
        }
      } else {
        this.showToast("error", "Mark flip");
      }
    },
  },

  computed: {
    filterStyle() {
      if (this.flip) {
        return { transform: "scaleY(-1)" };
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
#flipPhoto {
  width: 600px;
  height: 400px;
}
#range {
  accent-color: rgb(206, 147, 216);
}
.flip-image {
  margin-block: 150px;
}
</style>
