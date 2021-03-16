export function useCreateMenu(G6, container, graph) {
  const { left, top } = container.getBoundingClientRect();

  return new G6.Menu({
    getContent(evt) {
      const item = evt.item;
      const type = item.getType() === 'node' ? '节点' : '连线';
      return `
        <p>删除${type}</p>
        <p>删除${type}</p>
      `;
    },
    handleMenuClick: (target, item) => {
      graph.removeItem(item);
    },
    offsetX: -left + 20,
    offsetY: -top + 20,
    itemTypes: ['node', 'edge'],
  });
}
