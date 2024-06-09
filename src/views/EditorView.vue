<template>
  <EditorOptions />
  <div class="editor-main">
    <Button
      severity="help"
      outlined
      icon="pi pi-arrow-circle-left"
      @click="this.$router.push({ name: 'Editor', params: { name: 'image' } })"
      v-tooltip.top="'Go back'"
      class="goBackBtn2"
    />
    <!-- <Card class="editor-card"> -->
    <!-- <template #content> -->
    <component :is="currentComponent" />
    <!-- </template> -->
    <!-- <div class="editor-container"> -->
    <!-- <div class="img-container"></div> -->
    <!-- </div> -->
    <!-- </Card> -->
  </div>
</template>

<script>
// import Croper from "@/components/Croper.vue";
// import ImageComp from "@/components/ImageComp.vue";
import EditorOptions from "@/components/EditorOptions.vue";
import ImageComp from "@/components/ImageComp.vue";
import Croper from "@/components/Croper.vue";
import Tint from "@/components/Tint.vue";
import Grayscale from "@/components/Grayscale.vue";
import Flip from "@/components/Flip.vue";
import Negate from "@/components/Negate.vue";
import Reformat from "@/components/Reformat.vue";
import Resize from "@/components/Resize.vue";
import Rotate from "@/components/Rotate.vue";
import Card from "primevue/card";
export default {
  data() {
    return {
      active: 0,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  components: {
    EditorOptions,
    Card,
    ImageComp,
    Croper,
    Tint,
    Rotate,
    Reformat,
    Resize,
    Negate,
    Grayscale,
    Flip,
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
  },
  computed: {
    currentComponent() {
      const componentsMap = {
        image: ImageComp,
        crop: Croper,
        tint: Tint,
        rotate: Rotate,
        resize: Resize,
        reformat: Reformat,
        negate: Negate,
        grayscale: Grayscale,
        flip: Flip,
        image: ImageComp,
      };
      return componentsMap[this.name] || null;
    },
  },
};
</script>
<style>
.options {
  width: 40vw;
  height: 80vh;
}

.editor-card {
  display: block;
  width: 80vw;
}
.editor-main {
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20px;
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
