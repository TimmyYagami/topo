<template>
  {{ count }}
  <button @click="sum"> 加加</button>
</template>

<script lang="ts">
  import { reactive, defineComponent } from 'vue';

  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    setup: () => {
      const obj: any = {
        name: 123,
        wife: {
          name: '美丽',
        },
        brother: ['大明', '小明', '明明'],
      };
      const count = reactive(obj);

      const sum = () => {
        count.brother[0] += '1231231';
        count.brother.push('消极');
        obj.sex = 'nan';
        console.log(count);
      };

      return {
        count,
        sum,
      };
    },
  });
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
