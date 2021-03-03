<template>
  <DragBar v-if="showBar" :dragBar="submenu" />
  <div id="container" @dragover="dragoverHandler" @drop="dropHandler"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import DragBar from '@/components/DragBar/index.vue';

  import { throttle } from '@/utils/throttle';
  import { initGraph } from '@/hooks/useGraph';
  import { basicProps } from './props';

  export default defineComponent({
    name: 'Index',
    components: {
      DragBar,
    },
    props: basicProps,
    setup(props) {
      // 容器
      let container: HTMLElement | null;
      // 画布实例
      let graph;
      let viewLeft, viewTop;
      // 获取数据
      const getData = () => {
        createGraph(props.topoData);
      };
      // 生成画布
      const createGraph = (data) => {
        // 初始化画布配置
        container = document.getElementById('container');
        viewTop = container.getBoundingClientRect().top;
        viewLeft = container.getBoundingClientRect().left;

        // 渲染画布
        graph = initGraph(props.size);
        graph.data(data);
        graph.render();

        // 鼠标进入节点
        graph.on('node:mouseenter', (e) => {
          const nodeItem = e.item; // 获取鼠标进入的节点元素对象
          graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
        });

        // 鼠标离开节点
        graph.on('node:mouseleave', (e) => {
          const nodeItem = e.item; // 获取鼠标离开的节点元素对象
          graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
        });

        // 点击节点
        graph.on('node:click', (e) => {
          // 先将所有当前是 click 状态的节点置为非 click 状态
          const clickNodes = graph.findAllByState('node', 'click');
          clickNodes.forEach((cn) => {
            graph.setItemState(cn, 'click', false);
          });
          const nodeItem = e.item; // 获取被点击的节点元素对象
          graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
        });

        // 监听画布拖拽事件
        graph.on('dragstart', canDragStart);
        graph.on('dragend', canDragEnd);
        graph.on('wheel', canWheel);
      };
      /*
       * g6的监听事件
       * */
      let canvasOffset = {
        x: 0,
        y: 0,
        nx: 0,
        ny: 0,
      };
      const canDragStart = (e) => {
        canvasOffset.x = e.clientX;
        canvasOffset.y = e.clientY;
        console.log(canvasOffset);
      };
      const canDragEnd = (e) => {
        canvasOffset.nx = canvasOffset.nx + e.clientX - canvasOffset.x;
        canvasOffset.ny = canvasOffset.ny + e.clientY - canvasOffset.y;
        console.log(canvasOffset);
      };
      const canWheel = (e) => {
        console.log(e);
        canvasOffset.nx = canvasOffset.nx + e.clientX - canvasOffset.x;
        canvasOffset.ny = canvasOffset.ny + e.clientY - canvasOffset.y;
        console.log(canvasOffset);
      };

      /*
       * window上的事件
       * */
      function handlerScroll() {
        viewTop = container.getBoundingClientRect().top;
        viewLeft = container.getBoundingClientRect().left;
      }
      onMounted(() => {
        window.onscroll = throttle(handlerScroll, 500);
        getData();
      });

      /*
       * vue上的事件
       * */
      // 拖拽进入容器事件，不加此事件无法触发drop事件
      const dragoverHandler = (e) => {
        e.preventDefault();
      };
      // 在容器松开鼠标事件
      const dropHandler = (e) => {
        graph.addItem('node', {
          x: e.x - canvasOffset.nx - viewLeft,
          y: e.y - canvasOffset.ny - viewTop,
        });
      };
      return {
        dropHandler,
        dragoverHandler,
      };
    },
  });
</script>

<style lang="scss">
  #container {
    flex: 1;
    position: relative;
  }

  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
</style>
