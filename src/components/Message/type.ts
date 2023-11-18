import type { VNode, ComponentInternalInstance } from 'vue'

export interface MessageProps {
  message: string | VNode
  type?: 'info' | 'success' | 'primary' | 'warning' | 'danger'
  duration?: number
  showClose?: boolean
  destroy?: () => void
  offset?: number
  zIndex?: number
  transitionName?: string
}
export interface MessageInstance {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  destroy: () => void
}
export type CreateMessageProps = Omit<MessageProps, 'destroy' | 'zIndex' | 'id'>
