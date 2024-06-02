<template>
  <div class="info-container">
    <div class="inner-info">
      <InputGroup class="pt-4">
        <InputGroupAddon> <i class="pi pi-key"></i></InputGroupAddon>
        <FloatLabel>
          <Password
            v-model="oldPassword"
            promptLabel="Choose a password"
            weakLabel="Too simple"
            mediumLabel="Average complexity"
            strongLabel="Complex password"
            :invalid="!oldPassValid && oldPassTouched"
          />
          <label for="oldPassword">Original password</label>
        </FloatLabel>
      </InputGroup>
      <span v-if="!oldPassValid && oldPassTouched" class="error">
        Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number,
        and one special character.
      </span>
      <InputGroup class="pt-4">
        <InputGroupAddon> <i class="pi pi-key"></i></InputGroupAddon>
        <FloatLabel>
          <Password
            v-model="newPassword"
            promptLabel="Choose a password"
            weakLabel="Too simple"
            mediumLabel="Average complexity"
            strongLabel="Complex password"
            :invalid="!newPassValid && newPassTouched"
          />
          <label for="newPassword">New password</label>
        </FloatLabel>
      </InputGroup>
      <span v-if="!newPassValid && newPassTouched" class="error">
        Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number,
        and one special character.
      </span>
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
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      oldPassValid: true,
      newPassValid: true,
      oldPassTouched: false,
      newPassTouched: false,
      passRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    validateOldPass() {
      this.oldPassTouched = true;
      this.oldPassValid = this.passRegex.test(this.oldPassword);
    },
    validateNewPass() {
      this.newPassTouched = true;
      this.newPassValid = this.passRegex.test(this.newPassword);
    },
    async changePass() {
      this.validateOldPass();
      this.validateNewPass();
      if (this.oldPassValid && this.newPassValid) {
        if (this.oldPassword != this.newPassword) {
          console.log("Można wysyłać");
          console.log(this.$store.getters.GET_TOKEN);
          const result = await this.$store.dispatch("POST_CHANGE_PASS", {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          });
          console.log(result);
          if (result.status == 404) {
            this.showToast("error", result.message);
          } else if (result.status >= 200 && result.status < 300) {
            this.showToast("success", result.message);
            this.oldPassword = "";
            this.newPassword = "";
          }
        } else {
          //POST_CHANGE_PASS
          this.showToast("error", "Passwords cant be same");
        }
      }
    },
  },
};
</script>
