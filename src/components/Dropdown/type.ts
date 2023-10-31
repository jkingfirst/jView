import type { TooltipProps } from '@/components/Tooltip/type'
import type { VNode } from 'vue'

export interface MenuOption {
  label: string | VNode
  key: string | number
  disabled?: boolean
  divided?: boolean
}
export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[]
  hideOnClick?: boolean
}
export interface DropdownEmit {
  (e: 'visible-change', value: boolean): boolean
  (e: 'select-change', value: MenuOption): void
}
