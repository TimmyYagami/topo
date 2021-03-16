import anchorEvent from './anchor-event';
import nodeStateEvents from './node-state-events';

export default (G6) => {
  G6.registerNode(
    'base-node',
    {
      // 初始化锚点方法，绘制锚点
      initAnchor(cfg, group) {
        group.anchorShapes = [];
        group.showAnchor = (group) => {
          this.drawAnchor(cfg, group);
        };
        group.clearAnchor = (group) => {
          group.anchorShapes && group.anchorShapes.forEach((a) => a.remove());
          group.anchorShapes = [];
        };
      },
      // 绘制锚点
      drawAnchor(cfg, group) {
        const size = cfg.size;
        const x = (size - 20) / 2;
        const y = -(size - 20) / 2;
        // 添加拖拽连线标识
        const anchor = group.addShape('image', {
          attrs: {
            x,
            y,
            width: 20,
            height: 20,
            img: '/src/icon/drag.svg',
            cursor: 'crosshair',
            banDrag: true,
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'image-shape',
          draggable: true,
        });

        anchorEvent(anchor, group);

        group.anchorShapes.push(anchor);
      },
      // 绘制完继承的节点后会触发此方法
      afterDraw(cfg, group) {
        const size = cfg.size;
        const width = size - 20;
        const height = size - 20;
        // 添加图片
        const img = group.addShape('image', {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            width,
            height,
            img: cfg.img,
            cursor: 'pointer',
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'image-shape',
          draggable: true,
        });

        // 按className查找元素
        group.getItem = (className) => {
          return group.get('children').find((item) => item.get('className') === className);
        };
        this.initAnchor(cfg, group);
        return img;
      },
      setState(name, value, item) {
        // 定义全部修改状态的事件
        const buildInEvents = [
          'anchorShow',
          'nodeState:hover',
          'nodeState:selected',
          'nodeOnDragStart',
          'nodeOnDrag',
          'nodeOnDragEnd',
        ];
        const group = item.getContainer();
        if (buildInEvents.includes(name)) {
          nodeStateEvents[name].call(this, value, group);
        }
      },
    },
    // 继承了 rect 节点
    'circle'
  );
};
