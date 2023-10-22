// https://stackblitz.com/edit/vitejs-vite-2ewfux?file=src%2Fcomponents%2FParentComp.vue
// import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'
// [plugin:vite:vue] [@vue/compiler-sfc] Failed to resolve extends base type.
//     If this previously worked in 3.2, you can instruct the compiler to ignore this extend by adding /* @vue-ignore */ before it, for example:
//
// interface Props extends /* @vue-ignore */ Base {}
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface FontAwesomeIconProps {
  border?: boolean
  fixedWidth?: boolean
  flip?: 'horizontal' | 'vertical' | 'both'
  icon: object | Array<string> | string | IconDefinition
  mask?: object | Array<string> | string
  listItem?: boolean
  pull?: 'right' | 'left'
  pulse?: boolean
  rotation?: 90 | 180 | 270 | '90' | '180' | '270'
  swapOpacity?: boolean
  size?:
    | '2xs'
    | 'xs'
    | 'sm'
    | 'lg'
    | 'xl'
    | '2xl'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'
  spin?: boolean
  transform?: object | string
  symbol?: boolean | string
  title?: string
  inverse?: boolean
  bounce?: boolean
  shake?: boolean
  beat?: boolean
  fade?: boolean
  beatFade?: boolean
  spinPulse?: boolean
  spinReverse?: boolean
}
export interface FontIconProps extends FontAwesomeIconProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
}
