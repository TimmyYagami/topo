<template>
  <DragBar v-if="showBar" :dragBar="submenu" />
  <div id="container" @dragover="dragoverHandler" @drop="dropHandler"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import G6 from '@antv/g6';
  import DragBar from '@/components/DragBar/index.vue';

  // 格式化props
  import { basicProps } from './props';

  import { buildUUID } from '@/utils/uuid';

  // g6数据处理方法
  import { useParseData } from '@/views/graph/hooks/useParseData';
  import { useCreateMenu } from '@/views/graph/hooks/useCreateMenu';
  import { useGetOptions } from '@/views/graph/hooks/useGetOptions';
  import useRegister from '@/views/graph/hooks/useRegister';

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
      // 拓扑数据映射，本质是一个对象
      let mapTopo = new Map();
      // 临时group，在点击节点时生成一个临时group，用来展示点击节点的描边。
      let tempGroup;

      onMounted(() => {
        container = document.getElementById('container');
        getData();
      });

      /*
       * G6事件
       * */

      // 获取数据
      const getData = () => {
        useParseData(props.submenu, mapTopo);
        createGraph(props.topoData);
      };
      // 生成画布
      const createGraph = (data) => {
        useRegister(G6);
        const contextMenu = useCreateMenu(G6, container, graph);
        const options = useGetOptions(container, props.size, [contextMenu]);
        graph = new G6.Graph(options);

        graph.data(data);
        graph.render();

        // 点击节点，增加选中状态
        graph.on('node:click', (e) => {
          const nodeItem = e.item; // 获取被点击的节点元素对象
          const group = nodeItem.get('group');
          group.addShape('circle', {
            attrs: {
              id: 'temp',
              x: 0,
              y: 0,
              r: props.size / 2 + 10,
              fill: '',
              stroke: '#07daff',
              lineWidth: 3,
            },
            name: 'rect-shape',
            zIndex: 10,
          });
          removeTempNode();
          tempGroup = group;
        });

        // 点击graph
        graph.on('click', () => {
          removeTempNode();
        });
      };
      /*
       * g6的监听事件
       * */
      // 删除临时节点
      const removeTempNode = () => {
        if (tempGroup) {
          // 删除上一个生成的 临时shape
          const child = tempGroup.find(function (item) {
            return item.attr('id') === 'temp';
          });
          tempGroup.removeChild(child);
          tempGroup = null;
        }
      };

      /*
       * vue上的事件
       * */

      // 拖拽进入容器事件，不加此事件无法触发drop事件
      const dragoverHandler = (e) => {
        e.preventDefault();
      };
      // 在容器松开鼠标事件
      const dropHandler = (e) => {
        let type = e.dataTransfer.getData('type');
        let fullName = mapTopo.get(type).name;
        let { x, y } = graph.getPointByClient(e.x, e.y);
        let model = {
          id: buildUUID(),
          style: '',
          type: 'image',
          img: mapTopo.get(type).icon,
          fullName: fullName,
          label: fullName.length > 8 ? fullName.slice(0, 8) + '...' : fullName,
          x,
          y,
        };
        graph.addItem('node', model);
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
  .g6-component-contextmenu {
    padding: 0;
  }
  .g6-component-contextmenu p {
    padding: 10px;
    cursor: pointer;
    margin: 0;
    text-align: center;
  }
  .g6-component-contextmenu p:hover {
    background: #44d9ae;
  }
</style>
