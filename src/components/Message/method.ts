import type { CreateMessageProps } from '@/components/Message/typet'
import JMessage from '@/components/Message/Message.vue'
import { render, h, reactive, ref } from 'vue'
const messageInstance = reactive([])
const insanceId = ref(0)
const createMessage = (props: CreateMessageProps) => {
  insanceId.value++
  const container = document.createElement('div')
  const destroy = () => {
    render(null, container)
  }
  const newProps = {
    ...props,
    destroy
  }
  const vnode = h(JMessage, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstChild)
  const instance = {
    id: `message__${insanceId.value}`
  }
  messageInstance.push(instance)
}
export { createMessage }
