type InputType = 'text' | 'textarea'
export interface InputProps {
  type?: InputType
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  modelValue: string
}
export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
}
