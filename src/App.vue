<template>
  <Topo :topoData="topoData" :showBar="showBar" :submenu="submenu" :size="size" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  // import graph from '@/views/graph/index.vue';
  import Topo from '@/packges/index';

  export default defineComponent({
    name: 'App',
    components: {
      Topo,
    },
    setup: () => {
      // 拖拽栏数据
      const topoData = {
        // 点集
        nodes: [
          {
            id: 'node1', // 节点的唯一标识
            x: 100, // 节点横坐标
            y: 200, // 节点纵坐标
            label: '起始点', // 节点文本
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
            label: '目标点',
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1', // 起始点 id
            target: 'node2', // 目标点 id
          },
        ],
      };
      const showBar = true;
      const submenu = [
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
              type: 'switch',
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
        {
          type: 'noMenu',
          icon: '/src/icon/net.svg',
          name: '自成一类',
        },
        {
          type: 'nolength',
          icon: '/src/icon/net.svg',
          name: '没得长度',
          menu: [],
        },
      ];
      const size = 60;
      return { topoData, showBar, submenu, size };
    },
  });
</script>

<style lang="scss">
  #app {
    width: 800px;
    height: 800px;
    display: flex;
    border: 1px solid #e0e0e0;
    position: relative;
  }
</style>
