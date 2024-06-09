<template>
  <div class="gallery-card-container">
    <Card id="gallery-detailCard">
      <template #header>
        <Button
          severity="help"
          outlined
          icon="pi pi-arrow-circle-left"
          @click="this.$router.push('/')"
          class="gallery-btn-edit2"
          v-tooltip.top="'Go back'"
          id="gallery-goBackBtn"
        />
        <div class="gallery-detailTitle">Title: {{ photo?.originalName }}</div>
        <!-- Header może być pusty lub zawierać inne informacje -->
      </template>
      <template #title> </template>
      <template #content>
        <div class="gallery-time">{{ getDate(this.photo?.history[0].timestamp) }}</div>
        <div class="gallery-content-container">
          <div class="gallery-detail-image-container">
            <Image
              :src="`http://localhost:3000/api/getimage/${photo?.id}`"
              width="100%"
              height="100%"
              alt="Image"
              preview
              style="width: 70vw"
            />
          </div>
          <div class="gallery-detail-author">Author: {{ photo?.authorName }} {{ photo?.authorLastName }}</div>
          <div class="gallery-desc-container">
            <p class="gallery-tags" v-if="this.photo?.tags.length > 0">
              Tags:
              <Chip v-for="tag in this.photo?.tags" :label="tag.name" class="gallery-tag-chip"></Chip>
            </p>
            <p v-html="photo?.desc"></p>
          </div>
        </div>
      </template>
    </Card>
    <div class="gallery-card" v-if="filtredOptions.length > 0" style="width: 80vw">
      <Paginator
        v-model:first="first"
        :rows="1"
        :totalRecords="filtredOptions.length"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      />

      <div class="p-3 text-center">
        <h1>{{ getFilterName(filtredOptions[first]?.status) }}</h1>
        <p>{{ getDate(filtredOptions[first]?.timestamp) }}</p>
        <Image
          :src="`http://localhost:3000/api/getimage/${photo?.id}/filter/${filtredOptions[first]?.status}`"
          :alt="first"
          class="border-round"
          preview
        />
      </div>
    </div>
  </div>
</template>

<script>
import TagsSelect from "@/components/TagsSelect.vue";
import Chip from "primevue/chip";
import Image from "primevue/image";

export default {
  props: ["id"],
  components: {
    TagsSelect,
  },
  data() {
    return {
      photo: null,
      first: 0,
    };
  },
  computed: {
    filtredOptions() {
      return this.photo?.history.filter((el) => el.status != "original") ?? [];
    },
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
    getFilterName(filter) {
      console.log(filter.indexOf("_"));
      if (filter.indexOf("_") != -1) {
        return filter.substring(0, filter.indexOf("_")).toUpperCase();
      } else {
        return filter.toUpperCase();
      }
    },
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
.gallery-tag-chip {
  margin-inline: 2px;
  padding-inline: 10px;
}
#gallery-goBackBtn {
  position: absolute;
  left: 120px;
  top: 20px;
  width: 100px;
  height: 50px;
  z-index: 2;
}

.gallery-time {
  position: absolute;
  top: 20px;
  right: 20px;
}
#gallery-detailCard {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  position: relative;
}
.gallery-detailTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}
.gallery-author {
  display: flex;
  align-items: center;
  justify-content: center;
}
.gallery-card-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  position: relative;
}
.gallery-desc-container p {
  text-align: justify;
  /* width: 70vw; */
  margin-bottom: 20px;
}
.gallery-desc-container {
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
.gallery-detail-image-container {
  width: 80vw;
  display: flex;
  justify-content: center;
}
.gallery-detail-author {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  padding-block: 10px;
}
</style>
