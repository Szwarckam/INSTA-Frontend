<template>
  <div class="profile-info-container">
    <div class="">
      <h1 class="info-title">Gallery</h1>
    </div>
    <Card class="card inner-card">
      <Galleria
        :value="images"
        :responsiveOptions="responsiveOptions"
        :numVisible="5"
        containerStyle="max-width: 640px"
      >
        <template #item="slotProps">
          <img :src="`http://localhost:3000/api/getimage/${slotProps.item.id}`" style="width: 100%" />
        </template>
        <template #thumbnail="slotProps">
          <img :src="`http://localhost:3000/api/getimage/${slotProps.item.id}`" />
        </template>
      </Galleria>
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
      responsiveOptions: [
        {
          breakpoint: "1300px",
          numVisible: 4,
        },
        {
          breakpoint: "575px",
          numVisible: 1,
        },
      ],
    };
  },
  components: {
    SpeedDial,
  },
  computed: {
    getPhotosData() {
      return this.$store.getters.GET_PHOTOS;
    },
  },
};
</script>
