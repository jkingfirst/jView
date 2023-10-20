<template>
  <div class="j-collapse">
    <slot></slot>
  </div>
  {{ activeNames }}
</template>
<script setup lang="ts">
import type { CollapseEmit, CollapseProps, NameTypes } from '@/components/Collapse/type'
import { provide, ref, watch } from 'vue'
import { CollapseContextKey } from '@/components/Collapse/type'

defineOptions({
  name: 'JCollapse',
  inheritAttrs: false
})
const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmit>()
const activeNames = ref<NameTypes[]>(props.modelValue)
const handleClickItem = (name: NameTypes) => {
  const index = activeNames.value.findIndex((item) => item === name)
  if (index > -1) {
    activeNames.value.splice(index, 1)
  } else {
    activeNames.value.push(name)
  }
  emit('change', activeNames.value)
  emit('update:modelValue', activeNames.value)
}
provide(CollapseContextKey, {
  activeNames,
  handleClickItem
})
watch(
  () => props.modelValue,
  (value) => {
    activeNames.value = value
  }
)
</script>
<style scoped lang="scss"></style>
