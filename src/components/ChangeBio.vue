<template>
  <div class="info-container">
    <!-- <Editor v-model="bio" editorStyle="height: 320px" :class="{ error: isBioValid }" /> -->
    <Editor v-model="bio" editorStyle="height: 320px; width:60vw">
      <template v-slot:toolbar>
        <span class="ql-formats">
          <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
          <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
          <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
        </span>
      </template>
    </Editor>

    <span v-if="!isBioValid && bioTouched" class="error">Bio must contain at least 2 letters and only letters</span>
    <div class="bottom">
      <Button class="mt-4 btn" label="Save" @click="changeUserBio" />
    </div>
  </div>
</template>

<style>
.info-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
}
.inner-info {
  width: 50vw;
}
.btn {
  left: 50%;
  transform: translate(-50%);
}
.error {
  color: red;
  font-size: 0.9em;
  /* border-color: red; */
}

.bottom {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>

<script>
export default {
  data() {
    return {
      bio: "<div>Hello World!</div><div>PrimeVue <b>Editor</b> Rocks</div><div><br></div>",
      isBioValid: true,
      bioTouched: false,
    };
  },
  mounted() {
    console.log("EDyto zamonotway");
    this.bio = this.$store.getters.GET_BIO;
    console.log(this.bio);
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async changeUserBio() {
      console.log(this.bio);
      this.validatBio();
      if (this.isBioValid && this.bioTouched) {
        console.log("Można wysyłać");
        console.log(this.$store.getters.GET_TOKEN);
        const result = await this.$store.dispatch("POST_CHANGE_USER_DATA", {
          name: this.$store.getters.GET_NAME,
          lastName: this.$store.getters.GET_LAST_NAME,
          bio: this.bio.replace(/<[^>]+>/g, ""),
        });
        console.log(result);
        if (result.status == 404) {
          this.showToast("error", result.message);
        } else if (result.status >= 200 && result.status < 300) {
          this.showToast("success", result.message);
          this.$store.commit("SET_USER_DATA", result.profileData);
          this.$router.push("/settings");
        }
      } else {
        this.showToast("error", "Bio must contain at least 2 letters and only letters");
      }
    },
    validatBio() {
      this.bioTouched = true;
      this.isBioValid = this.bio.length > 0 ? true : false;
    },
  },
};
</script>
