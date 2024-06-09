<template>
  <div class="info-container">
    <div class="inner-info">
      <InputGroup class="pt-4">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="email" v-model="email" @input="validateEmail" :invalid="!isEmailValid && emailTouched" />
          <label for="email">Username</label>
        </FloatLabel>
      </InputGroup>
      <!-- <InlineMessage v-if="!isEmailValid && emailTouched" severity="error">Invalid email</InlineMessage> -->
      <span v-if="!isEmailValid && emailTouched" class="error">Invalid email</span>
      <div>
        <Button class="mt-4 btn" @click="changePass" label="Save" />
      </div>
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
</style>

<script>
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      isEmailValid: true,
      emailTouched: false,
      emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    validateEmail() {
      this.emailTouched = true;
      this.isEmailValid = this.emailRegex.test(this.email);
    },
    async changePass() {
      this.validateEmail();

      if (this.isEmailValid && this.emailTouched) {
        console.log("Można wysyłać");
        const result = await this.$store.dispatch("POST_RESET_PASS", {
          email: this.email,
        });
        console.log(result);
        if (result.status >= 400 && result.status < 500) {
          this.showToast("error", result.message);
        } else if (result.status >= 200 && result.status < 300) {
          this.showToast("success", result.message);
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>
