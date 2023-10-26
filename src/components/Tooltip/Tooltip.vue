<template>
  <div ref="toolWrapperRef" class="j-tooltip" v-on="outerEvents">
    <div ref="triggerNode" class="j-tooltip__trigger" v-on="events">
      <slot></slot>
    </div>
    <div v-if="isOpen" ref="popperNode" class="j-tooltip__popper">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onUnmounted, reactive, ref, watch, watchEffect } from 'vue'
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside'
import type { TooltipProps, TooltipEmit, TooltipInstance } from '@/components/Tooltip/type'
defineOptions({
  name: 'JTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click'
})
const toolWrapperRef = ref<HTMLElement | undefined>()
useClickOutside(toolWrapperRef, () => {
  closePopper()
})
const emits = defineEmits<TooltipEmit>()
const isOpen = ref<boolean>(false)
const triggerNode = ref<HTMLElement | null>(null)
const popperNode = ref<HTMLElement | null>(null)
let instance: Instance
const visibleChange = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}
const openPopper = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const closePopper = () => {
  isOpen.value = false
  emits('visible-change', false)
}
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const attachmentEvents = () => {
  if (props.manual) {
    return false
  }
  if (props.trigger === 'click') {
    events['click'] = visibleChange
  } else if (props.trigger === 'hover') {
    events['mouseenter'] = openPopper
    outerEvents['mouseleave'] = closePopper
  }
}
watch(
  () => props.trigger,
  (value, oldValue) => {
    if (value !== oldValue && !props.manual) {
      outerEvents = {}
      events = {}
      attachmentEvents()
    }
  }
)
attachmentEvents()
watchEffect(
  () => {
    if (isOpen.value) {
      if (triggerNode.value && popperNode.value) {
        instance = createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement
        })
      }
    } else {
      instance?.destroy()
    }
  },
  {
    flush: 'post'
  }
)
onUnmounted(() => {
  instance?.destroy()
})
defineExpose<TooltipInstance>({
  show: openPopper,
  hide: closePopper
})
</script>

<style scoped lang="scss"></style>
