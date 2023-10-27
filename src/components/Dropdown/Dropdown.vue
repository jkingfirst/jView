<template>
  <div class="j-dropdown" v-bind="$attrs">
    <j-tooltip v-bind="computedProps" @visible-change="visibleChange">
      <template #default>
        <slot></slot>
      </template>
      <template #content>
        <ul class="j-dropdown__content">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              :class="{
                'j-dropdown__divided': item.divided
              }"
              class="j-dropdown__item"
            ></li>
            <li class="j-dropdown-item">
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
import type { DropdownEmit, DropdownProps } from '@/components/Dropdown/type'
import { omit } from 'lodash-es'
import RenderVnode from '@/common/components/RenderVnode'
import { computed } from 'vue'
defineOptions({
  name: 'JDropdown',
  inheritAttrs: false
})
const props = defineProps<DropdownProps>()
const computedProps = computed(() => omit(props, ['menuOptions']))
const emits = defineEmits<DropdownEmit>()
const visibleChange = (val: boolean) => {
  emits('visible-change', val)
}
</script>
<style scoped lang="scss"></style>
