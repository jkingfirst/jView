<template>
  <form class="j-form">
    <slot></slot>
    <button @click.prevent="test">点击</button>
  </form>
</template>

<script lang="ts" setup>
import type { ValidateFieldsError } from 'async-validator'
import type {
  FormProps,
  FormContext,
  FormItemContext,
  ValidateFailError,
  FromInstance
} from '@/components/Form/type'
import { provide } from 'vue'
import { FormContextKey } from '@/components/Form/type'

defineOptions({
  name: 'JForm'
})
const props = defineProps<FormProps>()
let fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
  if (fields.length > 0) {
    fields.splice(fields.indexOf(field), 1)
  }
}
const test = () => {
  console.log(fields)
}
const validate = async () => {
  let errors: ValidateFieldsError = {}
  for (let field of fields) {
    try {
      await field.validate()
    } catch (e) {
      const err = e as ValidateFailError
      errors = {
        ...errors,
        ...err.fields
      }
      console.log(errors)
    }
  }
  if (Object.keys(errors).length === 0) {
    return true
  } else {
    return Promise.reject(errors)
  }
}
const resetFields = (values: string[]) => {
  const filterFields =
    values && values.length > 0 ? fields.filter((item) => values.includes(item.prop)) : fields
  filterFields.forEach((item) => {
    item.resetField()
  })
}
const clearValidate = (values: string[]) => {
  const filterFields =
    values && values.length > 0 ? fields.filter((item) => values.includes(item.prop)) : fields
  filterFields.forEach((item) => {
    item.clearValidate()
  })
}
// 通过provide 向FormItem传递数据，以便formItem能够获取数据和验证
provide(FormContextKey, {
  ...props,
  addField,
  removeField
})
defineExpose<FromInstance>({
  validate,
  clearValidate,
  resetFields
})
</script>

<style scoped lang="scss"></style>
