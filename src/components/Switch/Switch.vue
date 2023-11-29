<template>
  <div
    class="j-switch"
    :class="{
      [`j-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': isChecked
    }"
    @click="switchValue"
  >
    <input type="checkbox" :checked="isChecked" :disabled="disabled" class="j-switch__input" />
    <div class="j-switch__core">
      <div class="j-switch__core-inner">
        <span v-if="inactiveText || activeText" class="j-switch__core-inner-text">{{
          isChecked ? activeText : inactiveText
        }}</span>
      </div>
      <div class="j-switch__core-action"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SwitchEmits, SwitchProps } from '@/components/Switch/type'
import { isBoolean, isPromise } from '@/utils/type'
import { size } from 'lodash-es'
import { computed, ref, watch } from 'vue'
defineOptions({
  name: 'JSwitch'
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emit = defineEmits<SwitchEmits>()
const innerValue = ref(props.modelValue)
const isChecked = computed(() => props.activeValue === innerValue.value)
const handleChange = () => {
  const newValue = isChecked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
const switchValue = () => {
  if (props.disabled) return false
  const { beforeChange } = props
  if (!beforeChange) {
    handleChange()
  } else {
    const shouldChange = beforeChange()
    const isPromiseOrBoolean = [isBoolean(shouldChange), isPromise(shouldChange)].includes(true)
    if (!isPromiseOrBoolean) {
      throw new Error('Switch组件 beforeChange must return type `Promise<boolean>` or `boolean`')
    }
    if (isPromise(shouldChange)) {
      shouldChange
        .then((result) => {
          if (result) {
            handleChange()
          }
        })
        .catch((e) => {
          console.warn(e)
        })
    } else if (shouldChange) {
      handleChange()
    }
  }
}
watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value
  }
)
</script>

<style scoped lang="scss"></style>
