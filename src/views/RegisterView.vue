<template>
  <Toast />
  <div class="main-container">
    <Card class="login-container">
      <template #title>Login</template>
      <template #content>
        <InputGroup>
          <FloatLabel>
            <InputText id="name" v-model="name" @input="validatName" :invalid="!isNameValid && nameTouched" />
            <label for="name">Name</label>
          </FloatLabel>
        </InputGroup>
        <!-- <InlineMessage v-if="!isNameValid && nameTouched" severity="error"
          >Name must contain at least 2 letters and only letters</InlineMessage
        > -->
        <span v-if="!isNameValid && nameTouched" class="error"
          >Name must contain at least 2 letters and only letters</span
        >
        <InputGroup class="pt-4">
          <FloatLabel>
            <InputText
              id="lastName"
              v-model="lastName"
              @input="validatLastName"
              :invalid="!isLastNameValid && lastNameTouched"
            />
            <label for="lastName">Lastname</label>
          </FloatLabel>
        </InputGroup>
        <!-- <InlineMessage v-if="!isLastNameValid && lastNameTouched" severity="error"
          >Lastname must contain at least 2 letters and only letters</InlineMessage
        > -->
        <span v-if="!isLastNameValid && lastNameTouched" class="error"
          >Lastname must contain at least 2 letters and only letters</span
        >
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
            <!-- <Password id="pass" v-model="pass" @input="validatPass" :invalid="!isPassValid && passTouched" /> -->
            <!-- <label for="pass">Password</label> -->
          </FloatLabel>
        </InputGroup>
        <!-- <InlineMessage v-if="!isPassValid && passTouched" severity="error"
          >Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one
          number, and one special character.</InlineMessage
        > -->
        <span v-if="!isPassValid && passTouched" class="error">
          Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one
          number, and one special character.
        </span>
        <div class="bottom">
          <span> You already have an account?<RouterLink to="/login" exact> Login</RouterLink></span>
          <Button label="Submit" @click="registerUser" class="mt-4 btn" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { email } from "@vee-validate/rules";

export default {
  data() {
    return {
      lastName: "",
      name: "",
      email: "",
      pass: "",
      isEmailValid: true,
      isNameValid: true,
      isLastNameValid: true,
      isPassValid: true,
      emailTouched: false,
      nameTouched: false,
      lastNameTouched: false,
      passTouched: false,
      nameRegex: /^[a-zA-Z]{2,}$/,
      emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      passRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    validatEmail() {
      this.emailTouched = true;
      this.isEmailValid = this.emailRegex.test(this.email);
    },
    validatName() {
      this.nameTouched = true;
      this.isNameValid = this.nameRegex.test(this.name);
    },
    validatLastName() {
      this.lastNameTouched = true;
      this.isLastNameValid = this.nameRegex.test(this.lastName);
    },
    validatPass() {
      this.passTouched = true;
      this.isPassValid = this.passRegex.test(this.pass);
    },
    async registerUser() {
      this.validatName();
      if (!this.isNameValid) {
        // return;
      }

      this.validatLastName();
      if (!this.isLastNameValid) {
        // return;
      }

      this.validatEmail();
      if (!this.isEmailValid) {
        // return;
      }

      this.validatPass();
      if (!this.isPassValid) {
        // return;
      }
      if (this.isPassValid && this.isLastNameValid && this.isNameValid && this.isEmailValid) {
        console.log("Registration successful!");
        const result = await this.$store.dispatch("POST_REGISTER_USER", {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          password: this.pass,
        });
        console.log(result);
        if (result.status == 404) {
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
