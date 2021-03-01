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
    const dragendhandler = (e) => {
      console.log(e);
    };
    return () =>
      h(
        'div',
        {
          ref: 'dragItem',
          class: 'bar_box',
          draggable: true,
          ondragend: dragendhandler,
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
