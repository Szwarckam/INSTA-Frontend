<template>
  <div class="card flex justify-content-center">
    <Image alt="Image" preview>
      <template #indicatoricon>
        <i class="pi pi-search"></i>
      </template>
      <template #image>
        <img src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg" alt="image" />
      </template>
      <template #preview="slotProps">
        <img
          src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg"
          alt="preview"
          :style="slotProps.style"
          @click="slotProps.onClick"
        />
      </template>
    </Image>
  </div>
</template>
<style></style>
