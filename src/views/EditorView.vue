<template>
  <div class="editor-container">
    <div class="croper-container">
      <Croper />
    </div>
    <div class="card-container">
      <EditorOptions />

    </div>

  </div>
</template>

<script setup>
import Croper from '@/components/Croper.vue';
import EditorOptions from '@/components/EditorOptions.vue';

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

/* .croper-container {

  padding-top: 2vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
} */
</style>