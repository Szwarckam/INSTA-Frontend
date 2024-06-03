<template>
  <div class="info-container">
    <div class="inner-info">
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
      <Button class="mt-4 btn" label="Save" @click="changeUserData" />
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
      active: 0,
      name: "",
      lastName: "",
      nameRegex: /^[a-zA-Z]{2,}$/,
      isNameValid: true,
      isLastNameValid: true,
      nameTouched: false,
      lastNameTouched: false,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async changeUserData() {
      this.validatLastName();
      this.validatName();
      if (this.isNameValid && this.isLastNameValid) {
        console.log("Można wysyłać");
        console.log(this.$store.getters.GET_TOKEN);
        const result = await this.$store.dispatch("POST_CHANGE_USER_DATA", {
          name: this.name,
          lastName: this.lastName,
          bio: this.$store.getters.GET_BIO,
        });
        console.log(result);
        if (result.status == 404) {
          this.showToast("error", result.message);
        } else if (result.status >= 200 && result.status < 300) {
          this.showToast("success", result.message);
          this.$router.push("/settings");
        }
      } else {
        //POST_CHANGE_PASS
        this.showToast("error", "Passwords cant be same");
      }
    },
    validatName() {
      this.nameTouched = true;
      this.isNameValid = this.nameRegex.test(this.name);
    },
    validatLastName() {
      this.lastNameTouched = true;
      this.isLastNameValid = this.nameRegex.test(this.lastName);
    },
  },
  computed: {
    getData() {
      return {
        name: this.$store.getters.GET_NAME,
        lastName: this.$store.getters.GET_LAST_NAME,
      };
    },
  },
  watch: {
    getData: {
      immediate: true,
      handler(newValue) {
        this.name = newValue.name;
        this.lastName = newValue.lastName;
      },
    },
  },
  mounted() {
    this.getData;
  },
};
</script>
