import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'Bar',

  props: {
    menu: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const dragstarthandler = (e) => {
      e.dataTransfer.setData('type', props.menu.type);
    };
    return () =>
      h(
        'div',
        {
          ref: 'dragItem',
          class: 'bar_box',
          draggable: true,
          ondragstart: dragstarthandler,
        },
        [
          h('img', {
            class: 'bar_icon',
            src: props.menu.icon,
          }),
          h(
            'span',
            {
              class: 'bar_name',
            },
            props.menu.name
          ),
        ]
      );
  },
});
