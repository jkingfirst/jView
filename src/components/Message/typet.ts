import type { VNode } from 'vue'

export interface MessageProps {
  message: string | VNode
  type: 'info' | 'success' | 'primary' | 'warning' | 'error'
  duration?: number
  showClose?: boolean
  destory: () => void
}
export type CreateMessageProps = Omit<MessageProps, 'destory'>
