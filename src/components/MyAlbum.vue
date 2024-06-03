<template>
  <div class="card-container">
    <Card v-for="photo in photosList" :key="photo.id" class="card">
      <template #header>
        <!-- <img alt="user header" :src="`http://localhost:3000/api/getimage/${photo.id}`" /> -->
      </template>
      <template #title>
        <div class="title">Title: {{ photo.originalName }}</div></template
      >

      <template #content class="content-container">
        <div class="image-container">
          <Image :src="`http://localhost:3000/api/getimage/${photo.id}`" width="300" height="300" alt="Image" preview />
        </div>
      </template>
      <template #footer>
        <div class="flex gap-3 mt-1">
          <Button severity="help" label="Show Likes" @click="seeLikes(photo.id)" class="w-full" />
          <Button severity="secondary" label="Edit" @click="editPhoto(photo.id)" class="w-full" />
        </div>
      </template>
    </Card>
  </div>
  <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '25rem' }">
    <div v-if="likeList.length > 0">
      People who like this photo:
      <div v-for="like in likeList">
        {{ like }}
      </div>
    </div>
    <div v-else>Nobody likes ur photo :(</div>
    <div class="flex justify-content-end gap-2">
      <!-- <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button> -->
    </div>
  </Dialog>
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
      visible: false,
      title: null,
      likeList: null,
    };
  },
  computed: {
    photosList() {
      console.log(this.$store.getters.GET_PHOTOS.filter((el) => el.album == this.$store.getters.GET_EMAIL));
      return this.$store.getters.GET_PHOTOS.filter((el) => el.album == this.$store.getters.GET_EMAIL);
    },
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    seeLikes(id) {
      const photo = this.$store.getters.GET_PHOTOS.find((el) => el.id == id);
      console.log(photo.likes);
      this.visible = true;
      this.likeList = photo.likes;
      this.title = photo.originalName;
      console.log(this.title);
    },
    editPhoto(id) {
      this.$store.commit("SET_PHOTO_TO_EDIT", id);
      this.$router.push("/editor");
    },
  },
};
</script>
