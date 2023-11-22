type InputType = 'text' | 'textarea'
export interface InputProps {
  type?: InputType
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  modelValue: string | number
}
export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
}
