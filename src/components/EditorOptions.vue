<template>
  <!-- w-full md:w-20rem -->
  <!-- <Card> -->
  <div class="card flex flex-column align-items-center gap-3">
    <PanelMenu :model="items" class="w-full md:w-20rem">
      <template #item="{ item }">
        <a v-ripple class="flex align-items-center px-3 py-2 cursor-pointer" @click="filterOption(item.label)">
          <span :class="[item.icon, 'text-primary']" />
          <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
        </a>
      </template>
    </PanelMenu>
  </div>
  <!-- </Card> -->
</template>

<script>
export default {
  data() {
    return {
      expandedKeys: {},
      items: [
        {
          key: "0",
          label: "Filters",
          icon: "pi pi-users",
          items: [
            {
              key: "0_1",
              label: "Rotate",
            },
            {
              key: "0_2",
              label: "Resize",
            },
            {
              key: "0_3",
              label: "Reformat",
            },
            {
              key: "0_4",
              label: "Crop",
            },
            {
              key: "0_5",
              label: "Greyscale",
            },
            {
              key: "0_6",
              label: "Flip",
            },
            {
              key: "0_7",
              label: "Negate",
            },
            {
              key: "0_8",
              label: "Tint",
            },
            ,
          ],
        },
      ],
    };
  },
  methods: {
    toggleAll() {
      if (Object.keys(this.expandedKeys).length) this.collapseAll();
      else this.expandAll();
    },
    expandAll() {
      for (let node of this.items) {
        this.expandNode(node);
      }

      this.expandedKeys = {
        ...this.expandedKeys,
      };
    },
    collapseAll() {
      this.expandedKeys = {};
    },
    expandNode(node) {
      if (node.items && node.items.length) {
        this.expandedKeys[node.key] = true;

        for (let child of node.items) {
          this.expandNode(child);
        }
      }
    },
    filterOption(e) {
      if (e != "Filters") {
        this.$router.push(`/${e}`);
      }
      console.log(e);
    },
  },
};
</script>
