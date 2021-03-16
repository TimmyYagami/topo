<template>
  <el-menu :default-active="dragBar[0].type" class="drag-bar-menu" :unique-opened="true">
    <SidebarItem v-for="(item, i) in dragBar" :key="i" :item="item" />
  </el-menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SidebarItem from './SidebarItem.vue';

  export default defineComponent({
    name: 'Index',
    components: {
      SidebarItem,
    },
    props: {
      dragBar: {
        type: Array,
        required: true,
      },
    },
    setup: (props) => {
      return {};
    },
  });
</script>

<style scoped lang="scss">
  .drag-bar-menu {
    width: 200px;
    overflow: hidden;
    border-right: 1px solid #d9d9d9;
  }
</style>
