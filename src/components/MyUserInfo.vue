<template>
  <div class="profile-info-container">
    <div class="">
      <h1 class="info-title">User Info</h1>
    </div>
    <Card class="card inner-card">
      <template #content>
        <div class="content-container">
          <Button
            severity="help"
            icon="pi pi-user-edit"
            @click="this.$router.push('/settings')"
            class="btn-edit"
            v-tooltip.left="'Edit profile'"
          />
          <div class="profile-img-container">
            <Avatar
              :image="`http://localhost:3000/api/getimage/profile/${this.$store.getters.GET_EMAIL}`"
              class="mr-2 avatar-icon"
              shape="circle"
            />
            <!-- <Image :src="`" width="300" height="300" alt="Image" rounded preview /> -->
          </div>
          <div class="user-name">
            <h1>Name: {{ name }}</h1>

            <h1>Lastname: {{ lastName }}</h1>
            <h1>Email: {{ email }}</h1>
            <h2>Bio: {{ bio }}</h2>
          </div>
        </div>

        <div class="image-container"></div>
      </template>
      <template #footer>
        <!-- <Button icon="pi pi-check" aria-label="Filter" /> -->
        <div class="flex gap-3 mt-1"></div>
      </template>
    </Card>
    <h1 class="info-title">My photos</h1>
  </div>
</template>

<style>
.avatar-icon {
  width: 200px;
  height: 200px;
}
.user-name {
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}
.btn-edit {
  position: absolute;
  right: 20px;
}
.info-title {
  margin-bottom: 20px;
}
.author {
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner-card {
  width: 90vw;
  margin-bottom: 20px;
}
.content-container {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.profile-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  /* width: 0vw; */
  margin: 20px;
}
</style>

<script>
import SpeedDial from "primevue/speeddial";
export default {
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      bio: "",
    };
  },
  components: {
    SpeedDial,
  },
  async created() {
    const result = await this.$store.dispatch("POST_PROFILE_INFO", this.$store.getters.GET_EMAIL);
    console.log(result);
    if (result) {
      this.name = this.$store.getters.GET_USER_DATA.name;
      this.lastName = this.$store.getters.GET_USER_DATA.lastName;
      this.bio = this.$store.getters.GET_USER_DATA.bio;
      this.email = this.$store.getters.GET_USER_DATA.email;
    }
    console.log(this.name);
  },
  computed: {
    getData() {
      // console.log(this.$store.getters.GET_USER_DATA.name);
      // return this.$store.getters.GET_USER_DATA;
    },
  },
};
</script>
