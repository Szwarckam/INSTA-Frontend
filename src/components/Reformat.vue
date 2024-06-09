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
        id="reformatPhoto"
        alt="image"
        class="reformat-image"
      />
      <div class="flex justify-content-center mt-2">
        <SelectButton v-model="format" :options="options" optionLabel="name" />
      </div>

      <Button label="Submit" @click="updateReformat()" class="mt-4 btn" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { name: "PNG", value: "png" },
        { name: "GIF", value: "gif" },
        { name: "JPG", value: "jpg" },
        { name: "AVIF", value: "avif" },
        { name: "WEBP", value: "webp" },
      ],
      format: null,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async updateReformat() {
      console.log(this.format);
      const result = await this.$store.dispatch("PATCH_FILTERS", {
        id: this.$store.getters.GET_PHOTO_TO_EDIT,
        filter: "reformat",
        format: this.format.value,
      });
      console.log(result);
      if (result) {
        this.showToast("success", "Success");
        this.$router.push({ name: "detail", params: { id: result.file.id } });
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
  mounted() {},
};
</script>

<style>
.karta {
  width: 80vw;
  margin: 20px auto;
}
#reformatPhoto {
  width: 600px;
  height: 400px;
}
</style>
