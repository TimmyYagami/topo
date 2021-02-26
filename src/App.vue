<template>
  <DragBar :dragBar="dragBar" />
  <Canvas />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import DragBar from '@/components/DragBar/index.vue';
  import Canvas from '@/views/Canvas/index.vue';
  import { DragBarSetting } from '@/types/DragBar';

  export default defineComponent({
    name: 'App',
    components: {
      DragBar,
      Canvas,
    },
    setup: () => {
      // 拖拽栏数据
      const dragBar: DragBarSetting = {
        show_bar: true,
        submenu: [
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
      };
      return {
        dragBar,
      };
    },
  });
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    border: 1px solid #e0e0e0;
  }
</style>
