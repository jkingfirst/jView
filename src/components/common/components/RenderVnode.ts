import { defineComponent, h } from 'vue'
// first kind can do work
// const RenderVnode = defineComponent({
//   name: 'RenderVnode',
//   props: {
//     vNode: {
//       type: [String, Object],
//       require: true,
//       default: 'jk3i322222'
//     }
//   },
//   setup(props) {
//     console.log(props.vNode, '######')
//     return () => props.vNode
//   }
// })
const RenderVnode = defineComponent(
  (props) => {
    console.log(props.vnode, '######')
    return () => h('div', props.vnode)
  },
  {
    props: {
      vnode: {
        type: [String, Object],
        required: true
      }
    }
  }
)
export default RenderVnode
