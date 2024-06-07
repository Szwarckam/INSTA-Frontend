<template>
  <div class="card-container">
    <Card
      v-for="photo in photosList"
      :key="photo.id"
      class="card"
      :style="{ display: isVisible(photo) ? 'block' : 'none' }"
    >
      <template #header>
        <!-- <img alt="user header" :src="`http://localhost:3000/api/getimage/${photo.id}`" /> -->
      </template>
      <template #title>
        <div class="title">Title: {{ photo.originalName }}</div>
      </template>
      <template #subtitle>
        <div class="author">Author: {{ photo.authorName }} {{ photo.authorLastName }}</div>
      </template>
      <template #content class="content-container">
        <div class="image-container">
          <Image :src="`http://localhost:3000/api/getimage/${photo.id}`" width="300" height="300" alt="Image" preview />
        </div>
        <ScrollPanel style="width: 300px; height: 60px; text-align: justify">
          <p>{{ getDesc(photo.desc) }}</p>
        </ScrollPanel>
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

          <Button severity="secondary" label="See more" class="w-full" @click="goToDetail(photo.id)" />
        </div>
      </template>
    </Card>
  </div>
</template>

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
      const photos = this.$store.getters.GET_PHOTOS;
      for (const photo of photos) {
        if (photo.likes.find((el) => el === this.$store.getters.GET_EMAIL)) {
          this.likeButtons[photo.id] = true;
        }
      }
      return photos;
    },

    tags() {
      return this.$store.getters.GET_FIND_PHOTOS_BY;
    },
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
    getDesc(desc) {
      if (desc.length > 200) {
        return desc.substring(0, 200) + "...";
      }
      return desc;
    },
    isVisible(photo) {
      console.log(photo);
      if (this.tags.length > 0) {
        return photo.tags.some((tag) => this.tags.includes(tag.name));
      } else {
        return true;
      }
    },
    async LikeOrNot(id) {
      // Zmienia stan przycisku
      if (this.$store.getters.GET_TOKEN != "") {
        this.likeButtons[id] = !this.likeButtons[id];

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
    },
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
  },
  mounted() {
    this.$store.commit("SET_FIND_PHOTOS_BY", []);
  },
};
</script>

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
  padding-top: 80px;
}

.desc-container {
  height: 50px;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  width: 300px;
}
</style>
