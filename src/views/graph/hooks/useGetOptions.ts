export function useGetOptions(container: any, size, plugins) {
  return {
    container: 'container', // 指定图画布的容器 id，与第 9 行的容器对应
    width: container.offsetWidth,
    height: container.offsetHeight,
    plugins,
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        'drag-node',
        'create-edge',
        {
          type: 'tooltip',
          offset: 20,
          formatText(model) {
            return model.fullName;
          },
        },
      ], // 允许拖拽画布、放缩画布、拖拽节点
    },
    // 节点在默认状态下的样式配置（style）和其他配置
    defaultNode: {
      size, // 节点大小
      // 节点上的标签文本配置
      labelCfg: {
        offset: 10,
        position: 'bottom',
        style: {
          fill: '#000',
        },
      },
      linkPoints: {
        top: true,
        right: true,
        bottom: true,
        left: true,
      },
    },
    // 边在默认状态下的样式配置（style）和其他配置
    defaultEdge: {
      // ...                 // 边的其他配置
      // 边样式配置
      style: {
        stroke: 'grey', // 边描边颜色
        lineWidth: 2,
      },

      // 边上的标签文本配置
      labelCfg: {
        autoRotate: true, // 边上的标签文本根据边的方向旋转
      },
    },
    anchorPointStyles: {
      r: 4,
      fill: '#fff',
      stroke: '#1890FF',
      lineWidth: 1,
    },
  };
}
