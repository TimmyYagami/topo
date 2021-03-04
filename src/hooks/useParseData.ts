// 创建一个映射，用来添加新增节点的信息。
export function useParseData(data, map) {
  data.forEach((item) => {
    if (item.menu && item.menu.length > 0) {
      useParseData(item.menu, map);
    } else {
      map.set(item.type, item);
    }
  });
  return map;
}
