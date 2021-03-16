import { App } from 'vue';
import Topo from './src/index.vue';

Topo.install = (app: App): void => {
  app.component(Topo.name, Topo);
};

const _Topo = Topo;

export default _Topo;
