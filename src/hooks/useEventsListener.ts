import { isRef, onBeforeUnmount, onMounted, unref, watch } from 'vue'
import type { Ref } from 'vue'
export type TargetType = Ref<EventTarget | null> | EventTarget
const useEventsListener = (target: TargetType, event: string, callback: (e: Event) => any) => {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, callback)
      value?.addEventListener(event, callback)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, callback)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, callback)
  })
}
export default useEventsListener
