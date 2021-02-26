<template>
  <div id="container"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import G6 from '@antv/g6';

  export default defineComponent({
    name: 'Index',
    setup() {
      onMounted(() => {
        const container = document.getElementById('container');
        console.log(container);
        // 创建 G6 图实例
        const graph = new G6.Graph({
          container: 'container', // 指定图画布的容器 id，与第 9 行的容器对应
          // 画布宽高
          width: container.offsetWidth,
          height: container.offsetHeight,
          zzz,
        });
      });
    },
  });
</script>

<style scoped lang="scss">
  #container {
    flex: 1;
  }
</style>
