import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
const useClickOutside = (elRef: Ref<HTMLElement | undefined>, callback: () => void) => {
  const handler = (e: MouseEvent) => {
    if (elRef.value && e.target) {
      if (!elRef.value?.contains(e.target as HTMLElement)) {
        callback()
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}
export default useClickOutside
