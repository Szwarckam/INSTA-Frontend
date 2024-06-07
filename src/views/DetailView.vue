<template>
  <div class="card-container">
    <Card id="detailCard">
      <template #header>
        <div class="detailTitle">Title: {{ photo?.originalName }}</div>
        <!-- Header może być pusty lub zawierać inne informacje -->
      </template>
      <template #title> </template>
      <template #content>
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
          <div class="desc-container">{{ photo?.desc }}</div>
          <!-- </ScrollPanel> -->
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
#detailCard {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
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
.desc-container {
  width: 80vw;
  text-align: justify;
  display: flex;
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

<script>
import TagsSelect from "@/components/TagsSelect.vue";

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
    if (!this.photo) {
      this.$router.push("/");
    }
  },
  methods: {
    async fetchPhotosList() {
      await this.$store.dispatch("GET_PHOTOS_LIST");
    },
    getPhotoById(id) {
      return this.$store.getters.GET_PHOTOS.find((el) => el.id === id);
    },
  },
};
</script>
