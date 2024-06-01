<template>
  <!-- <Button :label="visible" @click="setVisible" /> -->

  <Dialog modal header="Sending data..." :style="{ width: '25rem' }">
    <template #header>
      <!-- <div class="inline-flex align-items-center justify-content-center gap-2">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        <span class="font-bold white-space-nowrap">Amy Elsner</span> -->
      <!-- </div> -->
    </template>
    <div class="spiner-container">
      <ProgressSpinner />
    </div>

    <template #footer>
      <!-- <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
      <Button label="Save" outlined severity="secondary" @click="visible = false" autofocus /> -->
    </template>
  </Dialog>
</template>

<script></script>
<style>
.spiner-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
