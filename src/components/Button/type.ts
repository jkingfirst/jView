export type ButtonType = 'primary' | 'danger' | 'success' | 'info' | 'warning'
export type ButtonSize = 'large' | 'small' | 'default'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType
  plain?: boolean
  circle?: boolean
  round?: boolean
  disabled?: boolean
  autoFocus?: boolean
  icon?: string
  loading?: boolean
}
