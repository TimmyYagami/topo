let dragLog: any[] = []; // 记录鼠标坐标

let anchorNodeId = null; // dragover 也会发生在拖拽的锚点上, 用于记录当前拖拽的节点id

export default (anchor, group) => {
  // 拖拽事件
  anchor.on('dragstart', (e) => {
    if (anchorNodeId == null) {
      const id = group.get('item').get('id');
      const point = [0, 0];

      dragLog = [e.x, e.y];

      // 添加线条
      const line = group.addShape('path', {
        attrs: {
          stroke: '#1890FF',
          lineDash: [5, 5],
          path: [
            ['M', ...point],
            ['L', ...point],
          ],
        },
        className: 'dashed-line',
        pointStart: point,
      });

      // 置于顶层
      group.toFront();
      line.toFront(); // 最后把这条线层级提升至最高
      anchorNodeId = id;
    }
  });

  // 拖拽中
  anchor.on('drag', (e) => {
    const { type, direction } = group.getFirst().attr();
    const canvasBox =
      group.get('children')[0].get('canvasBox') || group.get('children')[0].get('canvasBBox');
    const diff =
      type === 'triangle-node' ? (direction === 'up' ? canvasBox.height : 0) : canvasBox.height / 2;
    const line = group.getItem('dashed-line');
    const pointStart = line.get('pointStart');
    const endPoint = [e.x - canvasBox.x - canvasBox.width / 2, e.y - canvasBox.y - diff];

    line.toFront();
    /**
     * 计算方法:
     * 鼠标位置 - box左上角 - width/2 => 中心坐标
     * 这里 1px 是为了让鼠标释放时 node: drag 事件监听到 target, 而不是当前虚线
     */

    // 如果鼠标移动距离超过 10px 就开始计算角度
    if (
      Math.sqrt(
        Math.pow(Math.abs(dragLog[0]) - Math.abs(e.x), 2) +
          Math.pow(Math.abs(dragLog[1]) - Math.abs(e.y), 2)
      ) >= 10
    ) {
      if (e.x >= dragLog[0]) {
        // 右下
        if (e.y >= dragLog[1]) {
          endPoint[0] -= 1;
          endPoint[1] -= 1;
        } else {
          // 右上
          endPoint[0] -= 1;
          endPoint[1] -= 1;
        }
      } else {
        // 左上
        if (e.y >= dragLog[1]) {
          endPoint[0] += 1;
          endPoint[1] += 1;
        } else {
          // 左下
          endPoint[0] += 1;
          endPoint[1] += 1;
        }
      }
    }

    line.attr({
      path: [
        ['M', ...pointStart],
        ['L', endPoint[0], endPoint[1]],
      ],
    });
  });

  // 拖拽结束删除虚线
  anchor.on('dragend', () => {
    const item = group.getItem('dashed-line');

    item.remove();
    anchorNodeId = null;
  });
};
