<template>
  <i
    class="j-icon"
    :class="{
      [`j-icon--${type}`]: type
    }"
    :style="styles"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="$props"></FontAwesomeIcon>
  </i>
</template>
<script setup lang="ts">
import type { FontIconProps } from './type'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
defineOptions({
  name: 'JIcon',
  inheritAttrs: false
})
const props = defineProps<FontIconProps>()
const styles = computed(() => {
  return props?.color ? { color: props?.color } : {}
})
</script>

<style scoped lang="scss"></style>
