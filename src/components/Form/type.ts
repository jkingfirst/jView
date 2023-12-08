import type { InjectionKey } from 'vue'
export interface FormProps {
  model: Record<string, any>
  rules: Record<string, any>
}
export interface FormItemProps {
  label: string
  prop?: string
}
export interface FormContext extends FormProps {}
export const FormContextKey = Symbol('FormContext') as InjectionKey<FormContext>
