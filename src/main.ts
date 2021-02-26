import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const vue = createApp(App);
vue.use(ElementPlus);
vue.mount('#app');
