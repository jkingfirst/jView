/*eslint-disable*/
const UpperCamelCase = require('uppercamelcase')
const createComponent = (componentName) => `
<template>
<div class="j-${componentName}">{{${componentName}}}</div>
</template>
<script lang="ts" setup>
defineOptions({
name: UpperCamelCase("j-${componentName}")
})
</script>
<style lang="scss" scoped>
</style>
`
const createTypeFile = () => {}
module.exports = {
  createComponent
}
