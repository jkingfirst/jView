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
        :placeholder="filterPlaceholder"
        :disabled="disabled"
        :readonly="!filterable"
        @input="onFilter"
        @keydown="handleKeydown"
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
              'is-active': isShowDropdown
            }"
          ></j-icon>
        </template>
      </j-input>
      <template #content>
        <div v-if="selectSate.loading" class="j-select__loading">
          <j-icon icon="spinner"></j-icon>
        </div>
        <div v-else-if="filterOptions.length === 0 && !selectSate.loading">no data matched</div>
        <ul class="j-select__menu">
          <li
            v-for="(item, index) in filterOptions"
            :key="item.value"
            class="j-select__menu-item"
            :class="{
              'is-disabled': item.disabled,
              'is-highlight': selectSate.selectHighlight === index,
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
import { isFunction } from '@/utils/type'
defineOptions({
  name: 'JSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '请选择',
  options: () => []
})
const tooltipRef = ref() as Ref<TooltipInstance>
const emits = defineEmits<SelectEmits>()
const inputRef = ref()
const isShowDropdown = ref(false)
const findOptions = (value: string) => {
  const item = props.options.find((item) => value === item.value)
  return item ? item : null
}
const initOptions = ref<OptionType | null>(findOptions(props.modelValue))
const selectSate = reactive<SelectState>({
  inputValue: initOptions.value ? initOptions.value.label : '',
  selectOption: initOptions.value,
  isHover: false,
  loading: false,
  selectHighlight: -1
})
const filterOptions = ref(props.options)
const getFilterOptions = async (value: string) => {
  if (props.filterable && props.filterMethod && isFunction(props.filterMethod)) {
    // 自定义筛选
    filterOptions.value = props.filterMethod(value)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    //远程搜索
    try {
      selectSate.loading = true
      filterOptions.value = await props.remoteMethod(selectSate.inputValue)
    } catch (e) {
      console.error(e)
    } finally {
      selectSate.loading = false
    }
  } else {
    filterOptions.value = props.options.filter((item) => item.label.includes(value))
  }
}
const filterPlaceholder = computed(() => {
  return props.filterable && selectSate.selectOption && isShowDropdown.value
    ? selectSate.selectOption.label
    : props.placeholder
})
const onFilter = () => {
  getFilterOptions(selectSate.inputValue)
}
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
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (selectSate.selectHighlight > -1 && filterOptions.value[selectSate.selectHighlight]) {
        const selectItem = filterOptions.value[selectSate.selectHighlight]
        handleSelect(selectItem)
      }
      break
    case 'Escape':
      if (isShowDropdown.value) {
        handleVisibleChange(false)
      }
      break
    case 'ArrowUp':
      if (filterOptions.value.length > 0) {
        if (selectSate.selectHighlight === -1 || selectSate.selectHighlight === 0) {
          selectSate.selectHighlight = filterOptions.value.length - 1
        } else {
          selectSate.selectHighlight--
        }
      }
      break
    case 'ArrowDown':
      if (filterOptions.value.length > 0) {
        if (selectSate.selectHighlight === filterOptions.value.length - 1) {
          selectSate.selectHighlight = 0
        } else {
          selectSate.selectHighlight++
        }
      }
      break
    default:
      break
  }
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
  if (isShowDropdown.value) {
    handleVisibleChange(false)
  } else {
    handleVisibleChange(true)
  }
}
const handleVisibleChange = (isShow: boolean) => {
  if (isShow) {
    if (props.filterable && selectSate.selectOption) {
      selectSate.inputValue = ''
    }
    if (props.filterable) {
      getFilterOptions(selectSate.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    if (props.filterable) {
      selectSate.inputValue = selectSate.selectOption
        ? selectSate.selectOption.label
        : props.placeholder
    }
  }
  isShowDropdown.value = isShow
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
