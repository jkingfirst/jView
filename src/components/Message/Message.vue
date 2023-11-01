<template>
  <div v-if="visible" class="j-message">
    <div class="j-message__content">
      <slot>
        <RenderVnode :vnode="message"></RenderVnode>
      </slot>
      <div v-if="showClose" class="j-message__close__wrapper">
        <j-icon icon="fa-xmark"></j-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import RenderVnode from '@/components/common/components/RenderVnode'
import type { MessageProps } from '@/components/Message/typet'
import JIcon from '@/components/Icon/Icon.vue'

const props = withDefaults(defineProps<MessageProps>(), {
  showClose: false,
  type: 'info',
  duration: 3000
})
const visible = ref(false)
const showMessage = () => {
  visible.value = true
}
let delayCloseTimer = null
const delayCloseMessage = () => {
  if (props.duration) {
    delayCloseTimer = setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
}
onMounted(() => {
  showMessage()
  delayCloseMessage()
})
onBeforeUnmount(() => {
  clearTimeout(delayCloseTimer)
})
watch(
  () => visible,
  (value) => {
    if (!value) {
      // 销毁组件
      props.destory()
    }
  }
)
</script>

<style scoped lang="scss">
.j-message {
  border: 1px solid red;
}
</style>
