import type { VNode } from 'vue'
export type OptionType = {
  label: string
  value: string
  disabled?: boolean
}
export interface SelectProps {
  modelValue: string
  placeholder?: string
  options: OptionType[]
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  customRender?: RenderLabelFun
}
type RenderLabelFun = (option: OptionType) => VNode
export interface SelectState {
  inputValue: string
  selectOption: OptionType | null
  isHover: boolean
}
export interface SelectEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}
