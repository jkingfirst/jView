<template>
  <button
    ref="_ref"
    class="j-button"
    :class="{
      [`j-button--${type}`]: type,
      [`j-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled
    }"
    :disabled="disabled"
    :type="nativeType"
    :auto-focus="autoFocus"
  >
    <span><slot /></span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonProps } from '@/components/Button/type'
const _ref = ref<HTMLButtonElement>()
defineOptions({
  name: 'JButton',
  inheritAttrs: false
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})
// 暴露组件实例
defineExpose({
  ref: _ref
})
</script>

<style scoped lang="scss">
@import 'style';
</style>
