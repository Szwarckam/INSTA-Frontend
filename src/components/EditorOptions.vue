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
            this.$router.push("/editor");
          },
        },
        {
          label: "Rotate",
          command: () => {
            this.$router.push("/rotate");
          },
        },
        {
          label: "Resize",
          command: () => {
            this.$router.push("/resize");
          },
        },
        {
          label: "Reformat",
          command: () => {
            this.$router.push("/reformat");
          },
        },
        {
          label: "Crop",
          command: () => {
            this.$router.push("/crop");
          },
        },
        {
          label: "Grayscale",
          command: () => {
            this.$router.push("/grayscale");
          },
        },
        {
          label: "Flip",
          command: () => {
            this.$router.push("/flip");
          },
        },
        {
          label: "Negate",
          command: () => {
            this.$router.push("/negate");
          },
        },
        {
          label: "Tint",
          command: () => {
            this.$router.push("/tint");
          },
        },
      ],
    };
  },
};
</script>
