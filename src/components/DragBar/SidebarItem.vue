<template>
  <!--如果数据中menu存在，且长度大于0，那么有子级菜单    -->
  <template v-if="item.menu && item.menu.length > 0">
    <el-submenu :index="item.type">
      <template #title>
        <span>{{ item.name }}</span>
      </template>
      <SidebarItem v-for="(m, i) in item.menu" :key="i" :item="m" />
    </el-submenu>
  </template>

  <template v-else>
    <el-menu-item :index="item.type">
      <bar :menu="item" />
    </el-menu-item>
  </template>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import bar from './bar';

  export default defineComponent({
    name: 'SidebarItem',
    components: {
      bar,
    },
    props: {
      item: {
        type: Object,
        required: true,
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
<style lang="scss">
  .drag-bar-menu {
    .el-menu .el-menu-item {
      height: auto;
      line-height: 30px;
    }
    .bar_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 30px;
      }
    }
  }
</style>
