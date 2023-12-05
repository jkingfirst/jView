<template>
  <div
    class="j-select>"
    :class="{
      'is-disabled': disabled
    }"
    @click="handleToggle"
  >
    <j-tooltip ref="tooltipRef" :manual="true">
      <j-input
        v-model="selectSate.inputValue"
        class="j-select__input"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
      />
      <template #content>
        <ul class="j-select__options">
          <li
            v-for="item in options"
            :key="item.value"
            class="j-select__option-item"
            :class="{
              'is-disabled': item.disabled
            }"
            @click="handleSelect(item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </template>
    </j-tooltip>
  </div>
</template>

<script lang="ts" setup>
import JInput from '@/components/Input/Input.vue'
import JTooltip from '@/components/Tooltip/Tooltip.vue'
import type { SelectEmits, SelectProps, OptionType, SelectState } from '@/components/Select/type'
import { reactive, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { TooltipInstance } from '@/components/Tooltip/type'
defineOptions({
  name: 'JSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '请选择'
})
const tooltipRef = ref() as Ref<TooltipInstance>
const emits = defineEmits<SelectEmits>()

const isSowDropdown = ref(false)
const findOptions = (value: string) => {
  const item = props.options.find((item) => value === item.value)
  return item ? item : null
}
const initOptions = findOptions(props.modelValue)
const innerValue = ref(findOptions(props.modelValue))
const selectSate = reactive<SelectState>({
  inputValue: initOptions ? initOptions.label : '',
  selectOption: initOptions
})
watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = findOptions(value)
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
    tooltipRef.value.hide()
  } else {
    tooltipRef.value.show()
  }
  isSowDropdown.value = isShow
  emits('visible-change', isShow)
}
const handleSelect = (item: OptionType) => {
  if (item.disabled) return false
  selectSate.selectOption = item
  handleVisibleChange(false)
  emits('update:modelValue', item.value)
  emits('change', selectSate.item.value)
  emits('visible-change', false)
}
</script>

<style scoped lang="scss"></style>
