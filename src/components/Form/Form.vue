<template>
  <form class="j-form">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import type { FormProps, FormContext } from '@/components/Form/type'
import { provide, reactive, watch } from 'vue'
import { FormContextKey } from '@/components/Form/type'

defineOptions({
  name: 'JForm'
})
const props = defineProps<FormProps>()
// 通过provide 向FormItem传递数据，以便formItem能够获取数据和验证
provide(FormContextKey, props)
</script>

<style scoped lang="scss"></style>
