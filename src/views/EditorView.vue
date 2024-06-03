<template>
  <div class="editor-container">
    <div class="img-container">
      <ImageComp />
    </div>
    <div class="card-container">
      <EditorOptions />
    </div>
  </div>
</template>

<script>
// import Croper from "@/components/Croper.vue";
import ImageComp from "@/components/ImageComp.vue";
import EditorOptions from "@/components/EditorOptions.vue";
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    EditorOptions,
    ImageComp,
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
  },
  computed: {
    // getBio() {
    //   this.bio = this.$store.getters.GET_BIO;
    // },
  },
};
</script>
<style>
.options {
  width: 40vw;
  height: 80vh;
}

.card {
  display: block;
}

.editor-container {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: row;
}

.croper {
  width: 30vw;
  height: 80vh;
}

/* .img-container {

  padding-top: 2vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
} */
</style>
