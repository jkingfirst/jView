type switchValueType = boolean | number | string
export interface SwitchProps {
  modelValue: switchValueType
  disabled?: boolean
  id?: string
  name?: string
  size?: 'default' | 'small' | 'large'
  activeText?: string
  inactiveText?: string
  activeValue?: switchValueType
  inactiveValue?: switchValueType
  beforeChange?: () => Promise<boolean> | boolean
}
export interface SwitchEmits {
  (e: 'update:modelValue', value: switchValueType): void
  (e: 'change', value: switchValueType): void
}
