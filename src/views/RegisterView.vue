<template>
  <div class="main-container">
    <Card class="login-container">
      <template #title>Login</template>
      <template #content>
        <InputGroup>
          <!-- <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon> -->
          <FloatLabel>
            <InputText id="name" v-model="name" />

            <label for="name">Name</label>
          </FloatLabel>
        </InputGroup>
        <InputGroup class="pt-4">
          <!-- <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon> -->
          <FloatLabel>
            <InputText id="lastName" v-model="lastName" />

            <label for="lastName">Lastname</label>
          </FloatLabel>
        </InputGroup>
        <InputGroup class="pt-4">
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <FloatLabel>
            <InputText id="email" v-model="email" />

            <label for="email">Username</label>
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
          <span> You already have an account?<RouterLink to="/login" exact> Login</RouterLink></span>
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
      lastName: null,
      name: null,
      email: null,
      pass: null,
    };
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
</style>
