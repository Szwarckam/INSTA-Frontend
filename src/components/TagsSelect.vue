<template>
  <div class="card flex justify-content-center">
    <MultiSelect @click="updatePhotoList" v-model="selectedTags" :options="tags" optionLabel="name"
      placeholder="Select Tags" display="chip" class="w-full md:w-20rem">
      <template #option="slotProps">
        <div class="flex align-items-center">
          <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            class="mr-2" style="width: 18px" />
          <div @click="updatePhotoList">{{ slotProps.option.name }}</div>
        </div>
      </template>
      <template #footer>
        <div class="py-2 px-3">
          <b>{{ selectedTags ? selectedTags.length : 0 }}</b> item{{ (selectedTags ?
            selectedTags.length : 0) > 1 ? 's' : '' }} selected.
        </div>
      </template>
    </MultiSelect>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTags: null,
      tags: []

    };
  },
  methods: {
    updatePhotoList() {
      setTimeout(() => {
        console.log(this.selectedTags);
      }, 20);

    }
  },
  computed: {
    getTags() {
      console.log(this.$store.getters.GET_TAGS);
      return this.$store.getters.GET_TAGS
    }
  },
  async created() {
    const result = await this.$store.dispatch("GET_TAGS_LIST");
    console.log(result);
    if (result) {
      this.tags = this.$store.getters.GET_TAGS
    }
  }

};
</script>