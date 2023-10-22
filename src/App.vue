<template>
  <h1>hjlo word</h1>
  <h2>hjlo word</h2>
  <h3>hjlo word</h3>
  <a>hjlo word</a>
  <div class="mb-4">
    <j-button>Default</j-button>
    <j-button type="primary">Primary</j-button>
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
const buttonRef = ref(null)
onMounted(() => {
  console.log(buttonRef.value?.ref)
})
const a = ref(['hello word'])
</script>

<style scoped></style>
