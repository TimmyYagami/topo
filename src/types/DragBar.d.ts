// 拖拽每一项的数据格式
interface Menu {
  // 节点类型
  type: string;
  // 节点图标地址
  img: string;
  // 节点名称
  name: string;
}
// 菜单的数据格式
interface Submenu {
  title: string;
  menu: Menu[];
}
export interface DragBarSetting {
  // 是否显示拖拽栏
  show_bar: boolean;
  // 拖拽栏的数据格式
  submenu: Submenu[];
}
