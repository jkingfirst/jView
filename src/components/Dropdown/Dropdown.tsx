import { computed, defineComponent, SetupContext, ref } from 'vue'
import JTooltip from '@/components/Tooltip/Tooltip.vue'
import RenderVnode from '@/components/common/components/RenderVnode'
import { omit } from 'lodash-es'
import type { TooltipInstance } from '@/components/Tooltip/type'
import type { DropdownEmit } from '@/components/Dropdown/type'
const JDropdown = defineComponent({
  name: 'JDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'click'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    delay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  emits: ['visible-change', 'select-change'],
  setup(props, { emit, slots, expose }: SetupContext<DropdownEmit>) {
    const computedProps = computed(() => {
      return omit(props, ['menuOptions', 'hideOnClick'])
    })
    const tooltipRef = ref<TooltipInstance | null>(null)
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })
    const handleClickItem = (item) => {
      if (item.disabled) {
        return false
      }
      if (props.hideOnClick) {
        tooltipRef.value?.hide()
      }
      emit('select-change', item)
    }
    const visibleChange = (value) => {
      emit('visible-change', value)
    }
    return () => (
      <div class={'j-dropdown'}>
        <JTooltip {...computedProps.value} ref={tooltipRef} onVisibleChange={visibleChange}>
          {{
            default: () => slots.default(),
            content: () => (
              <ul class="j-dropdown__menu">
                {props.menuOptions.map((item) => {
                  return (
                    <Fragment key={item.key}>
                      {item.divided ? (
                        <li
                          role="divided"
                          class={{
                            'divided-placeholder': true,
                            'j-dropdown__divided': item.divided
                          }}
                        ></li>
                      ) : (
                        ''
                      )}
                      <li
                        onClick={() => handleClickItem(item)}
                        class={{
                          'j-dropdown__item': true,
                          'is-disabled': item.disabled
                        }}
                      >
                        <RenderVnode vnode={item.label}></RenderVnode>
                      </li>
                    </Fragment>
                  )
                })}
              </ul>
            )
          }}
        </JTooltip>
      </div>
    )
  }
})
export default JDropdown
