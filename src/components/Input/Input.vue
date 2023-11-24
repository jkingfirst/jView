<template>
  <div
    class="j-input>"
    :class="{
      [`j-input-${type}`]: type,
      [`j-input-${size}`]: size,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-append': $slots.append,
      'is-prepend': $slots.prepend,
      'is-focus': isFocus
    }"
  >
    <!--input-->
    <template v-if="type === 'text'">
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
          v-bind="attrs"
          class="j-input__self"
          :type="nativeType"
          :disabled="disabled"
          @change="handleChange"
          @input="handleInput"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <!--suffix 后缀-->
        <span v-if="$slots.suffix || clearable || showPassword" class="j-input__suffix">
          <slots name="suffix"></slots>
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="j-input__clear"
            @click="handleClear"
          ></Icon>
          <Icon
            v-if="isShowPasswordIcon"
            :icon="passwordIcon"
            class="j-input_password"
            @click="handleToggleEyes"
          ></Icon>
        </span>
      </div>
      <!--append 后置-->
      <div v-if="$slots.append" class="j-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!--textarea-->
    <template v-if="type === 'textarea'">
      <textarea
        v-bind="attrs"
        v-model="innerValue"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      ></textarea>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon/Icon.vue'
import type { InputEmits, InputProps } from '@/components/Input/type'
import { computed, ref, useAttrs, watch } from 'vue'
defineOptions({
  name: 'JInput',
  inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'default',
  showPassword: false,
  clearable: false,
  disabled: false
})
const attrs = useAttrs()
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordIcon = ref('eye-slash')
const showClear = computed(
  () => !props.disabled && props.clearable && !!props.modelValue && isFocus.value
)
const isShowPasswordIcon = computed(() => {
  return props.showPassword && !!innerValue.value && !props.disabled
})
const nativeType = computed(() => {
  return props.showPassword && passwordIcon.value === 'eye-slash' ? 'password' : props.type
})
const handleToggleEyes = () => {
  passwordIcon.value = passwordIcon.value === 'eye' ? 'eye-slash' : 'eye'
}
const handleChange = () => {
  emits('change', innerValue.value)
}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}
const handleBlur = () => {
  isFocus.value = false
}
const handleFocus = () => {
  isFocus.value = true
}
const handleClear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('input', '')
  emits('change', '')
  emits('clear')
}
watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  }
)
</script>

<style scoped lang="scss"></style>
