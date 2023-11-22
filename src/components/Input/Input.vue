<template>
  <div
    class="j-input>"
    :class="{
      [`j-input-${type}`]: type,
      [`j-input-${size}`]: size,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-append': $slots.append,
      'is-prepend': $slots.prepend
    }"
  >
    <!--input-->
    <template v-if="type === 'input'">
      <!--prepend 前置-->
      <div v-if="$slots.prepend" class="j-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="j-input-wrapper">
        <!--prefix 前缀-->
        <span v-if="$slots.prefix" class="j-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          v-model="innerValue"
          class="j-input__self"
          :type="type"
          :disabled="disabled"
          @change="handleChange"
          @input="handleInput"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <!--suffix 后缀-->
        <span v-if="$slots.suffix" class="j-input__suffix">
          <slots name="suffix"></slots>
        </span>
      </div>
      <!--append 后置-->
      <div v-if="$slots.append" class="j-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!--textarea-->
    <template v-if="type === 'textarea'">
      <textarea v-model="innerValue" @input="handleInput"></textarea>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { InputEmits, InputProps } from '@/components/Input/type'
import { ref, watch } from 'vue'
defineOptions({
  name: 'JInput'
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'default',
  showPassword: false,
  clearable: false,
  disabled: false
})
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const handleChange = () => {}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
}
const handleBlur = () => {}
const handleFocus = () => {}
watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  }
)
</script>

<style scoped lang="scss"></style>
