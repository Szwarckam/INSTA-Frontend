<template>
  <div class="card">
    <TabMenu :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ item.label }}</span>
        </a>
      </template>
    </TabMenu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: "Default",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "image" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
        {
          label: "Rotate",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "rotate" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
        {
          label: "Resize",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "resize" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
        {
          label: "Reformat",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "reformat" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
        {
          label: "Crop",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "crop" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
        {
          label: "Grayscale",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "grayscale" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
        {
          label: "Flip",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "flip" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
        {
          label: "Negate",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "negate" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
        {
          label: "Tint",
          command: () => {
            this.$router.push({ name: "Editor", params: { name: "tint" } });
            // this.$store.commit("SET_VISIBLE", true);
          },
        },
      ],
    };
  },
};
</script>
