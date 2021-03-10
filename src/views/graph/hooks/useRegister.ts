import registerShape from './shape';
import registerBehavior from './behavior';

export default (G6) => {
  registerShape(G6);
  registerBehavior(G6);
};
