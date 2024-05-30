<template>
  <div class="main-container">
    <Card class="login-container">
      <template #title>Login</template>
      <template #content>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <FloatLabel>
            <InputText id="username" v-model="value" />

            <label for="username">Username</label>
          </FloatLabel>
        </InputGroup>

        <InputGroup class="pt-4">
          <InputGroupAddon> <i class="pi pi-key"></i></InputGroupAddon>
          <FloatLabel>
            <InputText id="pass" v-model="pass" />
            <label for="pass">Password</label>
          </FloatLabel>
        </InputGroup>
        <div class="bottom">
          <span> You don't have an account yet? <RouterLink to="/register" exact>Register</RouterLink> now</span>
          <Button label="Submit" class="mt-4 btn" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      pass: null,
    };
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
</style>
