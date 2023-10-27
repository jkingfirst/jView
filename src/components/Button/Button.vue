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
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :type="nativeType"
    :auto-focus="autoFocus"
  >
    <j-icon v-if="icon" :icon="icon"></j-icon>
    <j-icon v-if="loading" icon="spinner" spin></j-icon>
    <span><slot /></span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonProps } from '@/components/Button/type'
import JIcon from '@/components/Icon/Icon.vue'
const _ref = ref<HTMLButtonElement>()
defineOptions({
  name: 'JButton'
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})
// 暴露组件实例
defineExpose({
  ref: _ref
})
</script>

<style scoped lang="scss"></style>
