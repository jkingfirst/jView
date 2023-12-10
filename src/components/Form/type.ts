import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
export interface FormRuleItem extends RuleItem {
  trigger?: string
}
export type FormRules = FormRuleItem[]
export interface FormProps {
  model: Record<string, any>
  rules: Record<string, FormRules>
}
export interface FormItemProps {
  label: string
  prop?: string
}
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}
export interface FormItemContext {
  prop: string
  validate: () => any
  resetField(): void
  clearValidate(): void
}
export const FormContextKey = Symbol('FormContext') as InjectionKey<FormContext>
export const FormItemContextKey: InjectionKey<FormItemContext> = Symbol('FormContext')
export interface ValidateFailError {
  errors: ValidateError[]
  fields: ValidateFieldsError
}
export interface FromInstance {
  validate: () => Promise<any>
  resetFields(value?: string[]): void
  clearValidate(value?: string[]): void
}
