import type { Placement, Options } from '@popperjs/core'
export type PopperOptions = Partial<Options>
export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean
  popperOptions?: PopperOptions
  transition?: string
  delay?: number
}
export interface TooltipEmit {
  (e: 'visible-change', value: boolean): void
  (e: 'click-outside', value: boolean): void
}
export interface TooltipInstance {
  show: () => void
  hide: () => void
}
