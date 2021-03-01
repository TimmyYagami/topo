<template>
  <DragBar v-if="dragBar.show_bar" :dragBar="dragBar.submenu" />
  <div id="container"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import DragBar from '@/components/DragBar/index.vue';
  import { DragBarSetting } from '@/types/DragBar';
  import G6 from '@antv/g6';

  export default defineComponent({
    name: 'Index',
    components: {
      DragBar,
    },
    setup() {
      // 拖拽栏数据
      const dragBar: DragBarSetting = {
        show_bar: true,
        submenu: [
          {
            name: '虚拟设备',
            type: 'virtual',
            menu: [
              {
                type: 'router',
                icon: '/src/icon/rotuer.svg',
                name: '路由器',
              },
              {
                type: 'firewall',
                icon: '/src/icon/firewall.svg',
                name: '防火墙',
              },
            ],
          },
          {
            name: '实体设备',
            type: 'entity',
            menu: [
              {
                type: 'net',
                icon: '/src/icon/switch.svg',
                name: '交换机',
              },
            ],
          },
          {
            name: '因特网',
            type: 'internet',
            menu: [
              {
                type: 'net',
                icon: '/src/icon/net.svg',
                name: '网络',
              },
            ],
          },
        ],
      };
      onMounted(() => {
        const container: HTMLElement | null = document.getElementById('container');
        console.log(container);
        // 创建 G6 图实例
        const graph = new G6.Graph({
          container: 'container', // 指定图画布的容器 id，与第 9 行的容器对应
          // 画布宽高
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      });
      return {
        dragBar,
      };
    },
  });
</script>

<style scoped lang="scss">
  #container {
    flex: 1;
  }
</style>
