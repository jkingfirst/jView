<template>
  <div class="j-form-item">
    <div class="j-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </div>
    <div class="j-form-item__content">
      <slot></slot>
    </div>
    {{ innerValue }} ----{{ innerRule }}
  </div>
</template>
<script setup lang="ts">
import type { FormItemProps } from '@/components/Form/type'
import { FormContextKey } from '@/components/Form/type'
import { isNil } from 'lodash-es'
import { inject, computed } from 'vue'
defineOptions({
  name: 'JFormItem'
})
const props = defineProps<FormItemProps>()
const formContext = inject(FormContextKey)
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})
const innerRule = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})
</script>

<style scoped lang="scss"></style>
