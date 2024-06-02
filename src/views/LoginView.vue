<template>
  <div class="main-container">
    <Card class="login-container">
      <template #title>Login</template>
      <template #content>
        <InputGroup class="pt-4">
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <FloatLabel>
            <InputText id="email" v-model="email" @input="validatEmail" :invalid="!isEmailValid && emailTouched" />
            <label for="email">Username</label>
          </FloatLabel>
        </InputGroup>
        <!-- <InlineMessage v-if="!isEmailValid && emailTouched" severity="error">Invalid email</InlineMessage> -->
        <span v-if="!isEmailValid && emailTouched" class="error">Invalid email</span>

        <InputGroup class="pt-4">
          <InputGroupAddon> <i class="pi pi-key"></i></InputGroupAddon>
          <FloatLabel>
            <Password
              v-model="pass"
              promptLabel="Choose a password"
              weakLabel="Too simple"
              mediumLabel="Average complexity"
              strongLabel="Complex password"
              :invalid="!isPassValid && passTouched"
            />
            <label for="pass">Password</label>
          </FloatLabel>
        </InputGroup>
        <span v-if="!isPassValid && passTouched" class="error">
          Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one
          number, and one special character.
        </span>
        <div class="bottom">
          <span> You don't have an account yet? <RouterLink to="/register" exact>Register</RouterLink> now</span>
          <Button label="Submit" @click="loginUser" class="mt-4 btn" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      pass: "",
      isEmailValid: true,
      isPassValid: true,
      emailTouched: false,
      passTouched: false,
      emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      passRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
    };
  },
  created() {
    console.log("Created");
    console.log(this.$store.getters.GET_TOKEN);
    if (this.$store.getters.GET_TOKEN !== "") {
      showToast("info", "You are already logged in");
      this.$router.push("/");
    }
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    validatEmail() {
      this.emailTouched = true;
      this.isEmailValid = this.emailRegex.test(this.email);
    },
    validatPass() {
      this.passTouched = true;
      this.isPassValid = this.passRegex.test(this.pass);
    },
    async loginUser() {
      this.validatEmail();
      if (!this.isEmailValid) {
        // return;
      }

      this.validatPass();
      if (!this.isPassValid) {
        // return;
      }
      if (this.isPassValid && this.isEmailValid) {
        console.log("Login successful!");
        const result = await this.$store.dispatch("POST_LOGIN_USER", {
          email: this.email,
          password: this.pass,
        });
        console.log(result);
        if (result.status == 404) {
          this.showToast("error", result.message);
        } else if (result.status >= 200 && result.status < 300) {
          this.showToast("success", result.message);
          this.$router.push("/");
        }
      }
    },
  },
};

// import Croper from "@/components/Croper.vue";
// import ImageComp from "@/components/ImageComp.vue";
// import EditorOptions from "@/components/EditorOptions.vue";
</script>
<style>
.bottom {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.main-container {
  width: 100vw;
  height: 80vh;
  display: flex;
  padding-top: 30px;
  align-items: flex-start;
  justify-content: center;
}
.login-container {
  display: flex;
  flex-direction: column;
  width: 40vw;
  gap: 20px;
}

.error {
  color: red;
  font-size: 0.9em;
}

.invalid {
  border: 1px solid red;
}
</style>
