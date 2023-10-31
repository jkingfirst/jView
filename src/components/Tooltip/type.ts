import type { Placement, Options } from '@popperjs/core'
export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean
  popperOptions?: Partial<Options>
  transition?: string
  delay?: number
}
export interface TooltipEmit {
  (e: 'visible-change', value: boolean): void
}
export interface TooltipInstance {
  show: () => void
  hide: () => void
}