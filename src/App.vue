<template>
  <div style="display: flex">
    <j-tooltip ref="tooltipRef" content="jking---" delay="1000">
      <span>hello</span>
    </j-tooltip>
  </div>
  <div class="mb-4">
    <j-button @click="open">Default1</j-button>
    <j-button type="primary" @click="close">Primary2</j-button>
    <j-button type="success">Success</j-button>
    <j-button type="info">Info</j-button>
    <j-button type="warning">Warning</j-button>
    <j-button type="danger">Danger</j-button>
    <j-button type="info" loading>loading</j-button>
    <j-button type="info" icon="user-secret">icon</j-button>
  </div>

  <div class="mb-4">
    <j-button plain>Plain</j-button>
    <j-button type="primary" plain>Primary</j-button>
    <j-button type="success" plain>Success</j-button>
    <j-button type="info" plain>Info</j-button>
    <j-button type="warning" plain>Warning</j-button>
    <j-button type="danger" plain>Danger</j-button>
  </div>

  <div class="mb-4">
    <j-button round>Round</j-button>
    <j-button type="primary" round>Primary</j-button>
    <j-button type="success" round>Success</j-button>
    <j-button type="info" round>Info</j-button>
    <j-button type="warning" round>Warning</j-button>
    <j-button type="danger" round>Danger</j-button>
  </div>

  <div>
    <j-button type="primary" size="large">large</j-button>
    <j-button type="primary">default</j-button>
    <j-button type="primary" size="small">small</j-button>
  </div>
  <j-icon icon="fa-user-secret" type="danger" color="red" style="font-size: 100px"></j-icon>
  <div>
    <j-collapse v-model="a">
      <j-collapse-item title="hello word" name="hello word">
        <div>23424234</div>
      </j-collapse-item>
      <j-collapse-item title="hello jking" name="hello jking">
        <div>
          <h1>111</h1>
          <div><a>hello word</a></div>
        </div>
      </j-collapse-item>
    </j-collapse>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import JButton from '@/components/Button/Button.vue'
import JCollapse from '@/components/Collapse/Collapse.vue'
import JCollapseItem from '@/components/Collapse/CollapseItem.vue'
import JIcon from '@/components/Icon/Icon.vue'
import JTooltip from '@/components/Tooltip/Tooltip.vue'
const buttonRef = ref(null)
const tooltipRef = ref<HTMLElement | undefined>()
onMounted(() => {
  // console.log(buttonRef.value?.ref)
})
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  console.log(tooltipRef.value)
  tooltipRef.value?.hide()
}
const a = ref(['hello word'])
</script>

<style scoped>
header {
  display: flex;
}
</style>
