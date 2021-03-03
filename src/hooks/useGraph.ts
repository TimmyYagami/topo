import G6 from '@antv/g6';

export function initGraph(size) {
  const container: HTMLElement | null = document.getElementById('container');
  // 创建 G6 图实例
  return new G6.Graph({
    container: 'container', // 指定图画布的容器 id，与第 9 行的容器对应
    // 画布宽高
    width: (container as any).offsetWidth,
    height: (container as any).offsetHeight,
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        'drag-node',
        {
          type: 'tooltip', // 提示框
          formatText(model) {
            console.log(model);
            // 提示框文本内容
            const text = 'label: ' + model.label + '<br/> class: ' + model.class;
            return text;
          },
        },
      ], // 允许拖拽画布、放缩画布、拖拽节点
    },
    // 节点在默认状态下的样式配置（style）和其他配置
    defaultNode: {
      size: size, // 节点大小
      // ...                 // 节点的其他配置
      // 节点样式配置
      style: {
        fill: 'steelblue', // 节点填充色
        stroke: '#666', // 节点描边色
        lineWidth: 1, // 节点描边粗细
      },
      // 节点上的标签文本配置
      labelCfg: {
        // 节点上的标签文本样式配置
        style: {
          fill: '#000', // 节点标签文字颜色
        },
      },
    },
    // 边在默认状态下的样式配置（style）和其他配置
    defaultEdge: {
      // ...                 // 边的其他配置
      // 边样式配置
      style: {
        opacity: 0.6, // 边透明度
        stroke: 'grey', // 边描边颜色
      },
      // 边上的标签文本配置
      labelCfg: {
        autoRotate: true, // 边上的标签文本根据边的方向旋转
      },
    },
    // 节点不同状态下的样式集合
    nodeStateStyles: {
      // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
      hover: {
        fill: 'lightsteelblue',
      },
      // 鼠标点击节点，即 click 状态为 true 时的样式
      click: {
        stroke: '#000',
        lineWidth: 3,
      },
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
      // 鼠标点击边，即 click 状态为 true 时的样式
      click: {
        stroke: 'steelblue',
      },
    },
    layout: {
      // Object，可选，布局的方法及其配置项，默认为 random 布局。
      type: 'random', // 指定为力导向布局
      preventOverlap: true, // 防止节点重叠
      // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
      linkDistance: 150, // 指定边距离为100
    },
  });
}
