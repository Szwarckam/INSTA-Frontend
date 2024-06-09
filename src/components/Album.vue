<template>
  <div class="card-container">
    <!-- <Button /> -->
    <TagsSelect class="tags-select2" />
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
        <div class="title">
          <h1 @click="this.$router.push({ name: 'detail', params: { id: photo.id } })">
            Title: {{ photo.originalName }}
          </h1>
          <!-- <Button
            icon="pi pi-times"
            severity="danger"
            aria-label="Cancel"
            @click="removePhoto(photo.id)"
            class="delete-btn"
          /> -->
        </div></template
      >

      <template #content class="content-container">
        <div class="image-container">
          <Image :src="`http://localhost:3000/api/getimage/${photo.id}`" width="300" height="300" alt="Image" preview />
        </div>
        <!-- <ScrollPanel style="width: 300px; height: 60px; text-align: justify"> -->
        <!-- <p>{{ getDesc(photo.desc) }}</p> -->
        <!-- </ScrollPanel> -->
      </template>
      <template #footer>
        <div class="flex gap-3 mt-1">
          <Button severity="help" label="Show Likes" @click="seeLikes(photo.id)" class="w-full" />
          <!-- <Button severity="secondary" label="Edit" @click="editPhoto(photo.id)" class="w-full" /> -->
        </div>
      </template>
    </Card>
  </div>
  <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '25rem' }">
    <div v-if="likeList.length > 0">
      People who like this photo:
      <div v-for="like in likeList">
        <div v-if="like == this.$store.getters.GET_EMAIL"><span class="pi pi-user mr-2"></span>You</div>
        <div v-else><span class="pi pi-user mr-2"></span>{{ like }}</div>
      </div>
    </div>
    <div v-else>Nobody likes this photo :(</div>
    <div class="flex justify-content-end gap-2">
      <!-- <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button> -->
    </div>
  </Dialog>
</template>

<style>
.delete-btn {
  position: absolute;
  right: -20px;
  top: -20px;
  z-index: 20;
}
.content-container {
  position: relative;
}
.title {
  position: relative;
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
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  position: relative;
}

.tags-select2 {
  position: absolute;
  right: 135px;
  padding: 0;
  top: 0vh;
  z-index: 10;
}
</style>

<script>
import TagsSelect from "@/components/TagsSelect.vue";

export default {
  data() {
    return {
      visible: false,
      title: null,
      likeList: null,
    };
  },
  props: ["name"],
  components: {
    TagsSelect,
  },
  computed: {
    photosList() {
      console.log(this.$store.getters.GET_PHOTOS.filter((el) => el.album == this.name));
      return this.$store.getters.GET_PHOTOS.filter((el) => el.album == this.name);
    },
    tags() {
      return this.$store.getters.GET_FIND_PHOTOS_BY;
    },
  },
  mounted() {
    this.$store.commit("SET_FIND_PHOTOS_BY", []);
  },
  methods: {
    getDesc(desc) {
      if (desc.length > 100) {
        return desc.substring(0, 100) + "...";
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
      this.$router.push("/editor/image");
    },
    async removePhoto(id) {
      const result = await this.$store.dispatch("DEL_PHOTO", id);
      console.log(result);
      const result2 = await this.$store.dispatch("GET_PHOTOS_LIST");
      console.log(result2);
      if (result2 && result) {
        this.showToast("success", "Success");
      } else {
        this.showToast("error", "Error");
      }
    },
  },
};
</script>
