<template>
  <el-menu
    :default-active="dragBar[0].type"
    class="drag-bar-menu"
    @open="handleOpen"
    @close="handleClose"
    :unique-opened="true"
  >
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
        default: () => [
          {
            title: '虚拟设备',
            menu: [
              {
                type: 'router',
                img: 'router',
                name: '路由器',
              },
            ],
          },
        ],
      },
    },
    setup: (props) => {
      const handleOpen = (key, keyPath) => {
        console.log(key, keyPath);
      };
      const handleClose = (key, keyPath) => {
        console.log(key, keyPath);
      };
      return {
        handleOpen,
        handleClose,
      };
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
