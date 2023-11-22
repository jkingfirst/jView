import type { InjectionKey, Ref } from 'vue'
export interface CollapseProps {
  modelValue: string[]
  accordion?: boolean // 手风琴模式
}
export type NameTypes = string | number
export interface CollapseItemProps {
  name: NameTypes // 唯一标识符
  title?: string
  disabled?: boolean
}
interface CollapseContext {
  activeNames: Ref<NameTypes[]>
  handleClickItem: (name: NameTypes) => void
}
export interface CollapseEmit {
  (e: 'update:modelValue', value: NameTypes[]): void
  (e: 'change', value: NameTypes[]): void
}
export const CollapseContextKey = Symbol('CollapseContext') as InjectionKey<CollapseContext>
