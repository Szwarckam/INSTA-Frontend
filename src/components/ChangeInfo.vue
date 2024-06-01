<template>
  <div class="info-container">
    <div class="inner-info">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user-edit"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="name" v-model="name" />

          <label for="name">Name</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="pt-4">
        <InputGroupAddon>
          <i class="pi pi-user-edit"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="lastName" v-model="lastName" />

          <label for="lastName">Lastname</label>
        </FloatLabel>
      </InputGroup>
      <Button class="mt-4 btn" label="Save" />
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
    };
  },
  mounted() {
    setTimeout(() => {
      console.log("Mounted");
      console.log("Name: ", this.$store.getters.GET_NAME);
      this.name = this.$store.getters.GET_NAME;
      this.lastName = this.$store.getters.GET_LAST_NAME;
    }, 1005);
  },
};
</script>
