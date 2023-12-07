<template>
  <transition :name="transitionName" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
    <div
      v-show="visible"
      ref="messageRef"
      class="j-message"
      :class="{ 'is-close': showClose, [`j-message--${type}`]: type }"
      :style="styles"
      @mouseenter="handleClearTimer"
      @mouseleave="handleDelayCloseMessage"
    >
      <div class="j-message__content">
        <slot>
          <RenderVnode :vnode="message"></RenderVnode>
        </slot>
      </div>
      <j-icon
        v-if="showClose"
        class="j-message__close"
        icon="fa-xmark"
        @click="handleCloseMessage"
      ></j-icon>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import RenderVnode from '@/components/common/components/RenderVnode'
import type { MessageProps } from '@/components/Message/type'
import { getLastMessageInstance } from '@/components/Message/method'
import JIcon from '@/components/Icon/Icon.vue'
import useEventsListener from '@/hooks/useEventsListener'
defineOptions({
  name: 'JMessage'
})
const props = withDefaults(defineProps<MessageProps>(), {
  showClose: false,
  type: 'info',
  duration: 3000,
  offset: 20,
  zIndex: 2000,
  transitionName: 'fade-up'
})
// console.log(getCurrentInstance(), '33333')
// console.log(getLastMessageInstance(), '$$$$$')
const messageRef = ref<HTMLElement | null>(null)
const CHeight = ref(0)
const preMessageInstance = getLastMessageInstance()
const topOffset = computed(() => {
  return (preMessageInstance?.vm?.exposed?.bottomOffset.value || 0) + props.offset
})
const bottomOffset = computed(() => {
  return topOffset.value + CHeight.value
})
const visible = ref(false)
const keyDown = (e: Event) => {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    handleCloseMessage()
  }
}
useEventsListener(document, 'keydown', keyDown)
const styles = computed(() => {
  return {
    top: `${topOffset.value}px`,
    zIndex: props.zIndex
  }
})
const handleShowMessage = () => {
  visible.value = true
}
let delayCloseTimer: any = null
const handleDelayCloseMessage = () => {
  if (props.duration) {
    handleStartTimer()
  }
}
const handleClearTimer = () => {
  console.log('clear')
  clearTimeout(delayCloseTimer)
}
const handleStartTimer = () => {
  delayCloseTimer = setTimeout(() => {
    handleCloseMessage()
  }, props.duration)
}
const handleCloseMessage = () => {
  visible.value = false
}
const onAfterEnter = () => {
  CHeight.value = messageRef.value!.getBoundingClientRect().height
}
const onAfterLeave = () => {
  props?.destroy && props.destroy()
}
onMounted(() => {
  handleShowMessage()
  handleDelayCloseMessage()
})
onBeforeUnmount(() => {
  handleClearTimer()
})

defineExpose({
  topOffset,
  bottomOffset,
  visible
})
</script>

<style scoped lang="scss"></style>
