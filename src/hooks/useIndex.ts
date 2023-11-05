import { computed, ref } from 'vue'

const seedIndex = ref(0)
const useIndex = (initIndex = 2000) => {
  const baseIndex = ref(initIndex)
  const currentIndex = computed(() => seedIndex.value + baseIndex.value)
  const increaseIndex = () => {
    seedIndex.value++
    console.log(currentIndex.value, '#####')
    return currentIndex.value
  }
  return {
    currentIndex,
    increaseIndex
  }
}
export default useIndex
