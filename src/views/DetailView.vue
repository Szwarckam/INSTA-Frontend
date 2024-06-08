<template>
  <div class="card-container">
    <Button
      severity="help"
      outlined
      icon="pi pi-arrow-circle-left"
      @click="this.$router.push('/')"
      class="btn-edit2"
      v-tooltip.top="'Go back'"
      id="goBackBtn"
    />
    <Card id="detailCard">
      <template #header>
        <div class="detailTitle">Title: {{ photo?.originalName }}</div>
        <!-- Header może być pusty lub zawierać inne informacje -->
      </template>
      <template #title> </template>
      <template #content>
        <div class="time">{{ getDate(this.photo?.history[0].timestamp) }}</div>
        <div class="content-container">
          <div class="detail-image-container">
            <Image
              :src="`http://localhost:3000/api/getimage/${photo?.id}`"
              width="100%"
              height="100%"
              alt="Image"
              preview
              style="width: 70vw"
            />
          </div>
          <!-- <ScrollPanel style="width: 80vw; font-size: 20px"> -->
          <div class="detail-author">Author: {{ photo?.authorName }} {{ photo?.authorLastName }}</div>
          <div class="desc-container">
            <p class="tags" v-if="this.photo?.tags.length > 0">
              Tags:
              <Chip v-for="tag in this.photo?.tags" :label="tag.name" class="tag-chip"></Chip>
            </p>
            <p v-html="photo?.desc"></p>
          </div>
          <!-- </ScrollPanel> -->
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import TagsSelect from "@/components/TagsSelect.vue";
import Chip from "primevue/chip";

export default {
  props: ["id"],
  components: {
    TagsSelect,
  },
  data() {
    return {
      photo: null,
    };
  },
  computed: {
    photosList() {
      return this.$store.getters.GET_PHOTOS.filter((el) => el.album == this.$store.getters.GET_EMAIL);
    },
    tags() {
      return this.$store.getters.GET_FIND_PHOTOS_BY;
    },
  },
  async mounted() {
    await this.fetchPhotosList();
    this.photo = this.getPhotoById(this.id);

    console.log(this.photo.tags);
    if (!this.photo) {
      this.$router.push("/");
    }
  },
  methods: {
    getDate(time) {
      const date = new Date(time);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    },
    async fetchPhotosList() {
      await this.$store.dispatch("GET_PHOTOS_LIST");
    },
    getPhotoById(id) {
      return this.$store.getters.GET_PHOTOS.find((el) => el.id === id);
    },
  },
};
</script>

<style>
.tag-chip {
  margin-inline: 2px;
  padding-inline: 10px;
}
#goBackBtn {
  position: absolute;
  left: 120px;
  top: 20px;
  width: 100px;
}

.time {
  position: absolute;
  top: 20px;
  right: 20px;
}
#detailCard {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  position: relative;
}
.detailTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
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
  position: relative;
}
.desc-container p {
  text-align: justify;
  /* width: 70vw; */
  margin-bottom: 20px;
}
.desc-container {
  width: 80vw;
  text-align: justify;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  font-size: 20px;
  padding: 10px;
}
.detail-image-container {
  width: 80vw;
  display: flex;
  justify-content: center;
}
.detail-author {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  padding-block: 10px;
}
</style>
