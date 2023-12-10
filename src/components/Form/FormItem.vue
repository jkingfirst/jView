<template>
  <div
    class="j-form-item"
    :class="{
      'is-error': validateState.state === 'error',
      'is-success': validateState.state === 'success',
      'is-loading': validateState.loading,
      'is-required': required
    }"
  >
    <div class="j-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </div>
    <div class="j-form-item__content">
      <slot :validate="validate"></slot>
      <div v-if="validateState.state === 'error'" class="j-form-item__err-msg">
        {{ validateState.errMessage }}
      </div>
      <button @click.prevent="validate">验证</button>
    </div>
    {{ innerValue }} ----{{ innerRule }}
  </div>
</template>
<script setup lang="ts">
import type {
  FormItemProps,
  ValidateFailError,
  FormRuleItem,
  FormItemContext
} from '@/components/Form/type'
import { FormContextKey, FormItemContextKey } from '@/components/Form/type'
import { isNil } from 'lodash-es'
import { inject, computed, reactive, provide, onMounted, onUnmounted } from 'vue'
import Schema from 'async-validator'
defineOptions({
  name: 'JFormItem'
})
let initValue: any = null
const validateState = reactive({
  state: 'init',
  loading: false,
  errMessage: ''
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
const required = computed(() => {
  innerRule.value.some((item) => item.required)
})
const clearValidate = () => {
  validateState.state = 'init'
  validateState.loading = false
  validateState.errMessage = ''
}
const resetField = () => {
  const model = formContext?.model
  clearValidate()
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initValue
  }
}
const getRulesByTrigger = (trigger?: string) => {
  const rules = innerRule.value
  if (rules.length > 0) {
    return rules.filter((item: FormRuleItem) => {
      if (!trigger || !item.trigger) {
        return true
      }
      return item.trigger && trigger === item.trigger
    })
  } else {
    return []
  }
}
const addField = formContext?.addField
const removeField = formContext?.removeField
const validate = async (trigger?: string) => {
  const filterRules = getRulesByTrigger(trigger)
  console.log(filterRules, '@@@@@')
  if (filterRules.length === 0) {
    return true
  }
  if (props.prop) {
    validateState.loading = true
    const fileName = props.prop
    const validator = new Schema({
      [fileName]: getRulesByTrigger(trigger)
    })
    return validator
      .validate({ [fileName]: innerValue.value })
      .then(() => {
        validateState.state = 'success'
        validateState.errMessage = ''
        console.log('验证成功')
      })
      .catch((e: ValidateFailError) => {
        const errs = e.errors
        if (errs && errs.length > 0) {
          validateState.state = 'error'
          validateState.errMessage = errs[0].message || ''
        }
        return Promise.reject(e)
      })
      .finally(() => {
        validateState.loading = false
      })
  }
}
const formItemContext: FormItemContext = {
  validate,
  clearValidate,
  resetField,
  prop: props.prop || ''
}
provide(FormItemContextKey, formItemContext)
onMounted(() => {
  addField!(formItemContext)
  initValue = innerValue.value
})
onUnmounted(() => {
  removeField!(formItemContext)
})
</script>

<style scoped lang="scss"></style>
