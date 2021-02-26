<template>
  <Canvas />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Canvas from '@/views/Canvas/index.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Canvas,
    },
    setup: () => {
      return {};
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
