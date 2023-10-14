<template>
  <button
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
  >
    <span><slot /></span>
  </button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@/components/Button/type'

defineOptions({
  name: 'jButton',
  inheritAttrs: false
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})
</script>

<style scoped lang="scss"></style>
