import type { CreateMessageProps, MessageInstance } from '@/components/Message/type'
import JMessage from '@/components/Message/Message.vue'
import { render, h, ref, shallowReactive } from 'vue'
import useIndex from '@/hooks/useIndex'
const messageInstances: MessageInstance[] = shallowReactive([])
const seed = ref(0)
const createMessage = (props: CreateMessageProps) => {
  const { increaseIndex } = useIndex()
  seed.value++
  const instanceId = `message__${seed.value}`
  const container = document.createElement('div')
  const destroy = () => {
    const idx = messageInstances.findIndex((item) => item.id === instanceId)
    idx && messageInstances.splice(idx, 1)
    render(null, container)
  }
  const newProps = {
    ...props,
    destroy,
    zIndex: increaseIndex()
  }
  const manualDestroy = () => {
    const messageInstance = messageInstances.find((instance) => instance.id === instanceId)
    messageInstance!.vm.exposed!.visible.value = false
  }
  const vnode = h(JMessage, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstChild!)
  const instance = {
    id: instanceId,
    vnode: vnode,
    props: newProps,
    vm: vnode.component!,
    destroy: manualDestroy
  }
  messageInstances.push(instance)
  return instance
}
const getLastMessageInstance = () => {
  return messageInstances.at(-1)
}
export { createMessage, getLastMessageInstance }
