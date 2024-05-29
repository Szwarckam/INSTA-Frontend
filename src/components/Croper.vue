<template>
  <cropper :src="img" @change="change" class="croper" />
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
  components: {
    Cropper,
  },
  data() {
    return {
      img: 'https://images.pexels.com/photos/4323307/pexels-photo-4323307.jpeg',
    };
  },
  methods: {
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas);
    },
  },
};
</script>
<style>
.croper {
  width: 30vw;
  height: 80vh;
}
</style>