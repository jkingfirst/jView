<template>
  <div class="j-collapse-item">
    <div
      :id="`collapse-item-header-${name}`"
      class="j-collapse-item__header"
      :class="{
        'is-disable': disabled
      }"
      @click="handleClickItem(name)"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <transition name="slide" v-on="on">
      <div v-show="isShow" :id="`collapse-item-content-${name}`" class="j-collapse-item__content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CollapseItemProps, NameTypes } from '@/components/Collapse/type'
import { CollapseContextKey } from '@/components/Collapse/type'

defineOptions({
  name: 'JCollapse',
  inheritAttrs: false
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(CollapseContextKey)
const isShow = computed<boolean | undefined>(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
const handleClickItem = (name: NameTypes) => {
  collapseContext?.handleClickItem(name)
}
const on: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
  },
  enter(el) {
    el.style.overflow = 'hidden'
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
  },
  beforeLeave(el) {
    el.style.overflow = 'hidden'
    el.style.height = `${el.scrollHeight}px`
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
  }
}
</script>
<style scoped lang="scss"></style>
