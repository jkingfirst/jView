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
}
export interface SelectState {
  inputValue: string
  selectOption: OptionType | null
}
export interface SelectEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'visible-change', value: boolean): void
}
