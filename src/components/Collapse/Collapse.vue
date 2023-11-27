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
const a = ref(0)
const activeNames = ref<NameTypes[]>(props.modelValue)
const handleClickItem = (name: NameTypes) => {
  const _activeNames = [...activeNames.value]
  const index = activeNames.value.findIndex((item) => item === name)
  if (index > -1) {
    _activeNames.splice(index, 1)
  } else {
    _activeNames.push(name)
  }
  console.log(activeNames.value, '#####')
  console.log(a.value)
  activeNames.value = _activeNames
  emit('change', _activeNames)
  emit('update:modelValue', _activeNames)
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
