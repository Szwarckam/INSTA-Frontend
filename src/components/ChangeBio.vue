<template>
  <div class="info-container">
    <!-- <Editor v-model="bio" editorStyle="height: 320px" :class="{ error: isBioValid }" /> -->
    <!-- <Editor v-model="bio" editorStyle="height: 320px; width:60vw">

      <template v-slot:toolbar>
        <span class="ql-formats">
          <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
          <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
          <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
        </span>
      </template>
    </Editor> -->
    <FloatLabel>
      <Textarea
        v-model="bio"
        cols="100"
        rows="10"
        style="resize: vertical; height: fit-content"
        :invalid="!isBioValid && bioTouched"
      />
      <label>Bio</label>
    </FloatLabel>

    <span v-if="!isBioValid && bioTouched" class="error">Bio must contain at least 2 signs</span>
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
      bio: "",
      isBioValid: true,
      bioTouched: false,
    };
  },

  async mounted() {
    console.log("EDyto zamonotway");
    const result = await this.$store.dispatch("POST_MY_PROFILE_INFO");
    console.log(result);
    if (result) {
      this.bio = this.$store.getters.GET_BIO;
    }
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
        if (result.status >= 400 && result.status < 500) {
          this.showToast("error", result.message);
        } else if (result.status >= 200 && result.status < 300) {
          this.showToast("success", result.message);
          this.$router.push("/settings");
        }
        // } else {
        // this.showToast("error", "Bio must contain at least 2 letters and only letters");
      }
    },
    validatBio() {
      this.bioTouched = true;
      this.isBioValid = this.bio.length > 0 ? true : false;
      console.log(this.isBioValid);
    },
  },
};
</script>
