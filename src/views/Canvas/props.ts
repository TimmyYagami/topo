export const basicProps = {
  // 拓扑数据
  topoData: {
    type: Object,
    required: false,
    default: {},
  },
  // 拓扑节点大小
  size: {
    type: Number,
    required: false,
    default: 60,
  },
  // 是否展示操作栏
  showBar: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 操作栏数据
  submenu: {
    type: Array,
    required: false,
    default: () => {
      return [
        {
          name: '虚拟设备',
          type: 'virtual',
          menu: [
            {
              type: 'router',
              icon: '/src/icon/rotuer.svg',
              name: '路由器',
            },
            {
              type: 'firewall',
              icon: '/src/icon/firewall.svg',
              name: '防火墙',
            },
          ],
        },
        {
          name: '实体设备',
          type: 'entity',
          menu: [
            {
              type: 'net',
              icon: '/src/icon/switch.svg',
              name: '交换机',
            },
          ],
        },
        {
          name: '因特网',
          type: 'internet',
          menu: [
            {
              type: 'net',
              icon: '/src/icon/net.svg',
              name: '网络',
            },
          ],
        },
      ];
    },
  },
};
