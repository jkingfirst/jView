<template>
  <div ref="toolWrapperRef" class="j-tooltip" v-on="outerEvents">
    <div ref="triggerNode" class="j-tooltip__trigger" v-on="events">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div v-if="isOpen" ref="popperNode" class="j-tooltip__popper">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside'
import { debounce } from 'lodash-es'
import type { TooltipProps, TooltipEmit, TooltipInstance } from '@/components/Tooltip/type'
defineOptions({
  name: 'JTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click',
  transition: 'fade',
  delay: 0
})
const delay = computed(() => props.delay)
const toolWrapperRef = ref<HTMLElement | undefined>()
useClickOutside(toolWrapperRef, () => {
  if (!props.manual) {
    closePopper()
  }
})
const emits = defineEmits<TooltipEmit>()
const isOpen = ref<boolean>(false)
const triggerNode = ref<HTMLElement | null>(null)
const popperNode = ref<HTMLElement | null>(null)
let instance: Instance
const visibleChange = () => {
  if (isOpen.value) {
    closeFinalDebounce()
  } else {
    openFinalDebounce()
  }
  emits('visible-change', isOpen.value)
}
const openPopper = () => {
  console.log(33333333)
  isOpen.value = true
  emits('visible-change', true)
}
const closePopper = () => {
  console.log(11111)
  isOpen.value = false
  emits('visible-change', false)
}
const closeDebounce = debounce(closePopper, delay.value)
const openDebounce = debounce(openPopper, delay.value)
const openFinalDebounce = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinalDebounce = () => {
  openDebounce.cancel()
  closeDebounce()
}
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }
  ],
  ...props.popperOptions
}))
const attachmentEvents = () => {
  if (props.manual) {
    return false
  }
  if (props.trigger === 'click') {
    events['click'] = visibleChange
  } else if (props.trigger === 'hover') {
    events['mouseenter'] = openFinalDebounce
    outerEvents['mouseleave'] = closeFinalDebounce
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
        instance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        instance?.destroy()
      }
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
  show: openFinalDebounce,
  hide: closeFinalDebounce
})
</script>

<style scoped lang="scss"></style>
