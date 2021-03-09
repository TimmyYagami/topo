export default (G6) => {
  G6.registerNode('base-node', {
    // 添加文本节点
    drawText(cfg, group) {
      group.addShape('text', {
        attrs: {
          text: cfg.label,
          fill: '#fff',
          fontSize: 14,
          textAlign: 'center',
          textBaseline: 'middle',
          ...cfg.labelCfg.style,
        },
        className: 'node-text',
        draggable: true,
      });
    },
    drawAnchor(cfg, group) {
      const item = group.get('children')[0];
      const bBox = item.getBBox();
      const anchors = this.getAnchorPoints(cfg);

      // 绘制锚点坐标
      anchors &&
        anchors.forEach((p, i) => {
          const x = bBox.width * (p[0] - 0.5);
          const y = bBox.height * (p[1] - 0.5);

          // 视觉锚点
          group.addShape('circle', {
            attrs: {
              x,
              y,
              fill: '#e7e7e7',
              stroke: '#1890ff',
              lineWidth: 1,
              r: 5,
            },
            zIndex: 1,
            nodeId: group.get('id'),
            className: 'node-anchor',
            draggable: true,
            isAnchor: true,
            index: i,
          });
        });
    },
    draw(cfg, group) {
      console.log(cfg);
      const attrs = cfg;
      const shape = group.addShape(
        'rect', // 继承内置节点的 shape, 可选 rect, circle, ellipse, path 等
        {
          // 所有的样式配置
          attrs: {
            ...attrs,
            fill: '#1890ff',
            ...attrs.style,
            x: -attrs.style.width / 2,
            y: -attrs.style.height / 2,
          },
          className: 'custom-shape', // 添加自定义属性, 方便以后对节点进行查找更新等
          draggable: true, // 允许自定义图形使用拖拽事件
        }
      );

      this.drawText(cfg, group);
      this.drawAnchor(cfg, group);

      return shape;
    },
  });
};
