<template>
  <div
    class="j-select"
    :class="{
      'is-disabled': disabled
    }"
    @mouseenter="selectSate.isHover = true"
    @mouseleave="selectSate.isHover = false"
    @click="handleToggle"
  >
    <j-tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :manual="true"
      :popper-options="popperOptions"
      @click-outside="handleVisibleChange(false)"
    >
      <j-input
        ref="inputRef"
        v-model="selectSate.inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
      >
        <template #suffix>
          <j-icon
            v-if="isShowClearIcon"
            icon="circle-xmark"
            class="j-select-clear"
            @mousedown.prevent="NOOP"
            @click.stop="handleClear"
          ></j-icon>
          <j-icon
            v-else
            icon="angle-down"
            class="j-select__icon"
            :class="{
              'is-active': isSowDropdown
            }"
          ></j-icon>
        </template>
      </j-input>
      <template #content>
        <ul class="j-select__menu">
          <li
            v-for="item in options"
            :key="item.value"
            class="j-select__menu-item"
            :class="{
              'is-disabled': item.disabled,
              'is-selected': item.value === selectSate.selectOption?.value
            }"
            @click.stop="handleSelect(item)"
          >
            <render-vnode
              :vnode="props.customRender ? props.customRender(item) : item.label"
            ></render-vnode>
          </li>
        </ul>
      </template>
    </j-tooltip>
  </div>
</template>

<script lang="ts" setup>
import JInput from '@/components/Input/Input.vue'
import JTooltip from '@/components/Tooltip/Tooltip.vue'
import JIcon from '@/components/Icon/Icon.vue'
import RenderVnode from '@/components/common/components/RenderVnode'
import type { SelectEmits, SelectProps, OptionType, SelectState } from '@/components/Select/type'
import { computed, reactive, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { PopperOptions } from '@/components/Tooltip/type'
import type { TooltipInstance } from '@/components/Tooltip/type'
defineOptions({
  name: 'JSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '请选择'
})
const tooltipRef = ref() as Ref<TooltipInstance>
const emits = defineEmits<SelectEmits>()
const inputRef = ref()
const isSowDropdown = ref(false)
const findOptions = (value: string) => {
  const item = props.options.find((item) => value === item.value)
  return item ? item : null
}
const initOptions = ref<OptionType | null>(findOptions(props.modelValue))
const selectSate = reactive<SelectState>({
  inputValue: initOptions.value ? initOptions.value.label : '',
  selectOption: initOptions.value,
  isHover: false
})
const NOOP = () => {}
const isShowClearIcon = computed(() => {
  // 鼠标放置到select上， clearable：true, inputValue有值，selectOption有值
  return (
    selectSate.isHover &&
    props.clearable &&
    selectSate.inputValue.trim() !== '' &&
    selectSate.selectOption
  )
})
const handleClear = () => {
  selectSate.inputValue = ''
  selectSate.selectOption = null
  handleVisibleChange(false)
  emits('update:modelValue', '')
  emits('change', '')
  emits('clear')
}
const popperOptions: PopperOptions = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
}
watch(
  () => props.modelValue,
  (value) => {
    initOptions.value = findOptions(value)
  }
)
const handleToggle = () => {
  if (props.disabled) return false
  if (isSowDropdown.value) {
    handleVisibleChange(false)
  } else {
    handleVisibleChange(true)
  }
}
const handleVisibleChange = (isShow: boolean) => {
  if (isShow) {
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
  }
  isSowDropdown.value = isShow
  emits('visible-change', isShow)
}
const handleSelect = (item: OptionType) => {
  if (item.disabled) return false
  selectSate.selectOption = item
  selectSate.inputValue = item.label
  selectSate.isHover = false
  handleVisibleChange(false)
  emits('update:modelValue', item.value)
  emits('change', item.value)
  emits('visible-change', false)
  inputRef.value.ref.focus()
}
</script>

<style scoped lang="scss"></style>
