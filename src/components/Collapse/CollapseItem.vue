<template>
  <div class="j-collapse-item">
    <div
      :id="`collapse-item-header-${name}`"
      class="j-collapse-item__header"
      :class="{
        'is-disable': disabled,
        'is-active': isActive
      }"
      @click="handleClickItem(name)"
    >
      <slot name="title">{{ title }}</slot>
      <j-icon icon="angle-right" class="j-icon-angle"></j-icon>
    </div>
    <transition name="slide" v-on="on">
      <div v-show="isActive" :id="`collapse-item-content-${name}`" class="j-collapse-item__wrapper">
        <div class="j-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CollapseItemProps, NameTypes } from '@/components/Collapse/type'
import { CollapseContextKey } from '@/components/Collapse/type'
import JIcon from '@/components/Icon/Icon.vue'

defineOptions({
  name: 'JCollapse',
  inheritAttrs: false
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(CollapseContextKey)
const isActive = computed<boolean | undefined>(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
const handleClickItem = (name: NameTypes) => {
  collapseContext?.handleClickItem(name)
}
const on: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom

    el.style.maxHeight = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  },
  enter(el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`
    } else {
      el.style.maxHeight = 0
    }
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
    el.style.overflow = 'hidden'
  },
  afterEnter(el) {
    el.style.maxHeight = ''
    el.style.overflow = el.dataset.oldOverflow || ''
  },
  beforeLeave(el) {
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.maxHeight = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  },
  afterLeave(el) {
    el.style.maxHeight = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
}
</script>
<style scoped lang="scss"></style>
