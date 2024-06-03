<template>
  <div class="card-container">
    <Card v-for="photo in photosList" :key="photo.id" class="card">
      <template #header>
        <!-- <img alt="user header" :src="`http://localhost:3000/api/getimage/${photo.id}`" /> -->
      </template>
      <template #title>
        <div class="title">Title: {{ photo.originalName }}</div></template
      >
      <template #subtitle>
        <div class="author">Author: {{ photo.authorName }} {{ photo.authorLastName }}</div>
      </template>
      <template #content class="content-container">
        <div class="image-container">
          <Image :src="`http://localhost:3000/api/getimage/${photo.id}`" width="300" height="300" alt="Image" preview />
        </div>
      </template>
      <template #footer>
        <div class="flex gap-3 mt-1">
          <Button
            v-if="isLogged"
            severity="help"
            icon="pi pi-heart"
            @click="LikeOrNot(photo.id)"
            :outlined="!likeButtons[photo.id]"
            :raised="likeButtons[photo.id]"
            class="w-full"
            :label="photo.likes.length"
          />

          <Button severity="secondary" label="See more" class="w-full" />
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.author {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      likeButtons: {}, // przechowuje stan przycisków
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters.GET_TOKEN !== "";
    },

    photosList() {
      console.log(this.$store.getters.GET_PHOTOS);
      for (const photo of this.$store.getters.GET_PHOTOS) {
        console.log(photo.likes.find((el) => el == this.$store.getters.GET_EMAIL));
        if (photo.likes.find((el) => el == this.$store.getters.GET_EMAIL)) {
          this.likeButtons[photo.id] = true;
        }
      }
      return this.$store.getters.GET_PHOTOS;
    },
  },
  methods: {
    // prevLiked(photos, id) {
    //   console.log(this.$store.getters.GET_EMAIL);
    //   console.log(photos.find((el) => el == this.$store.getters.GET_EMAIL));
    //   const photo = photos.find((el) => el == this.$store.getters.GET_EMAIL);
    //   if (photo) {
    //     this.likeButtons[id] = true;
    //   }
    // },
    async LikeOrNot(id) {
      // Zmienia stan przycisku
      console.log(this.$store.getters.GET_EMAIL);
      if (this.$store.getters.GET_TOKEN != "") {
        this.likeButtons[id] = !this.likeButtons[id];

        console.log(this.likeButtons);
        const result = await this.$store.dispatch("POST_LEAVE_LIKE", {
          id: id,
        });
        if (result.status >= 400 && result.status < 500) {
          this.showToast("error", result.message);
        } else if (result.status >= 200 && result.status < 300) {
          this.showToast("success", result.message);
        }
      } else {
        this.showToast("info", "You must be logged in to leave a like");
        this.$router.push("/login");
      }

      console.log(id);
    },
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
  },
};
</script>
