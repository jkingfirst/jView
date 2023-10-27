import { defineComponent, h } from 'vue'
const RenderVnode = defineComponent({
  name: 'RenderVnode',
  props: {
    vNode: {
      type: [String, Object],
      require: true
    }
  },
  setup(props) {
    return () => h('div', props.vNode)
  }
})
export default RenderVnode
