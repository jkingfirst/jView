<template>
  <div class="j-dropdown" v-bind="$attrs">
    <j-tooltip v-bind="computedProps" ref="tooltipRef" @visible-change="visibleChange">
      <template #default>
        <slot></slot>
      </template>
      <template #content>
        <ul class="j-dropdown__content">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="divided"
              :class="{
                'j-dropdown__divided': item.divided
              }"
            ></li>
            <li class="j-dropdown-item" @click="handleClickItem(item)">
              <RenderVnode :v-node="item.label"></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </j-tooltip>
  </div>
</template>
<script setup lang="ts">
import JTooltip from '@/components/Tooltip/Tooltip.vue'
import type { DropdownEmit, DropdownProps, MenuOption } from '@/components/Dropdown/type'
import { omit } from 'lodash-es'
import RenderVnode from '@/components/common/components/RenderVnode'
import { computed, Ref, ref } from 'vue'
import type { TooltipInstance } from '@/components/Tooltip/type'
const tooltipRef = ref() as Ref<TooltipInstance>
defineOptions({
  name: 'JDropdown',
  inheritAttrs: false
})
const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true
})
const computedProps = computed(() => omit(props, ['menuOptions']))
const emits = defineEmits<DropdownEmit>()
const visibleChange = (val: boolean) => {
  emits('visible-change', val)
}
const handleClickItem = (item: MenuOption) => {
  if (props.hideOnClick) {
    tooltipRef.value?.hide()
  }
  emits('select-change', item)
}
</script>
<style scoped lang="scss"></style>
