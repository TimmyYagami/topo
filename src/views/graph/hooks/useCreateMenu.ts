export function useCreateMenu(G6, container, graph) {
  const { left, top } = container.getBoundingClientRect();

  return new G6.Menu({
    getContent(evt) {
      const item = evt.item;
      const type = item.getType() === 'node' ? '节点' : '连线';
      console.log(evt, container);
      return `
        <p>删除${type}</p>
        <p>删除${type}</p>
      `;
    },
    handleMenuClick: (target, item) => {
      graph.removeItem(item);
      console.log(target, item);
    },
    // offsetX and offsetY include the padding of the parent container
    // 需要加上父级容器的 padding-left 16 与自身偏移量 10
    offsetX: -left + 20,
    // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
    offsetY: -top + 20,
    // the types of items that allow the menu show up
    // 在哪些类型的元素上响应
    itemTypes: ['node', 'edge'],
  });
}
