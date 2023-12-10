<template>
  <div style="display: flex">
    <j-tooltip ref="tooltipRef" content="jking---" :delay="0">
      <span style="border: 1px solid red">hello</span>
    </j-tooltip>
  </div>
  <div class="mb-4">
    <j-button @click="open">Default1</j-button>
    <j-button type="primary" @click="close">Primary2</j-button>
    <j-button type="success" @click="handleCreateMessage">Success</j-button>
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
  <div>
    <j-downdown
      :menu-options="options"
      placement="right"
      @select-change="(item) => console.log(item)"
    >
      <j-button>下拉菜单</j-button>
    </j-downdown>
  </div>
  <div>
    <!--    <j-message message="HELLO-word" type="primary"></j-message>-->
    <!--    <j-message message="HELLO-word" type="primary" :duration="0"></j-message>-->
  </div>
  <j-input v-model="userName" clearable></j-input>
  {{ userName }}}
  <div>
    <j-switch
      v-model="switchValue"
      active-text="right"
      inactive-text="left"
      active-value="right"
      inactive-value="left"
      :before-change="beforeChange"
    ></j-switch>
  </div>
  <div>
    <j-select
      :options="selectOptions"
      clearable
      model-value="1"
      :custom-render="handleRender"
      filterable
    ></j-select>
    <br />
    <j-select clearable filterable model-value="1" :remote-method="handleRemote" remote></j-select>
  </div>
  <div>
    <j-form ref="formRef" :model="formModel" :rules="formRules">
      <j-form-item label="邮箱" prop="email">
        <j-input v-model="formModel.email"></j-input>
      </j-form-item>
      <j-form-item label="密码" prop="password">
        <template #label="formItem">
          <j-button>{{ formItem.label }}</j-button>
        </template>
        <j-input v-model="formModel.password" show-password></j-input>
      </j-form-item>
      <j-form-item label="test" prop="test">
        <template #default="{ validate }">
          <input @blur="validate" />
        </template>
      </j-form-item>
      <div>
        <j-button type="primary" @click.prevent="validateForm">验证</j-button>
        <j-button @click.prevent="reset">重置</j-button>
      </div>
    </j-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, h, reactive } from 'vue'
import type { OptionType } from '@/components/Select/type'
import JButton from '@/components/Button/Button.vue'
import JCollapse from '@/components/Collapse/Collapse.vue'
import JCollapseItem from '@/components/Collapse/CollapseItem.vue'
import JIcon from '@/components/Icon/Icon.vue'
import JTooltip from '@/components/Tooltip/Tooltip.vue'
import JForm from '@/components/Form/Form.vue'
import JFormItem from '@/components/Form/FormItem.vue'
import JDropdown from '@/components/Dropdown/Dropdown.tsx'
import JInput from '@/components/Input/Input.vue'
// import JMessage from '@/components/Message/Message.vue'
import JSelect from '@/components/Select/Select.vue'
import JSwitch from '@/components/Switch/Switch.vue'
import { createMessage } from '@/components/Message/method'
import type { MenuOption } from '@/components/Dropdown/type'
import type { FormProps } from '@/components/Form/type'
const buttonRef = ref(null)
const userName = ref('jking')
const password = ref('1234')
const tooltipRef = ref<HTMLElement | undefined>()
const switchValue = ref('left')
const formRef = ref()
const options = ref<MenuOption[]>([
  {
    label: h('b', 'hello word'),
    key: 'item1'
  },
  {
    label: 'item2',
    key: 'item2',
    disabled: true
  },
  {
    label: 'item3',
    key: 'item3',
    divided: true
  },
  {
    label: 'item4',
    key: 'item4'
  }
])
const selectOptions = ref([
  { label: 'hello', value: '1' },
  { label: 'halo', value: '2' },
  { label: 'word', value: '23' },
  { label: 'world', value: '2' },
  { label: '你好', value: '3', disabled: true }
])
onMounted(() => {
  // console.log(buttonRef.value?.ref)
  createMessage({ message: 'hello 111', duration: 0, type: 'success' })
  createMessage({ message: 'hello 2222', duration: 0, type: 'danger' })
  const instance = createMessage({
    message: 'hello 33333',
    duration: 0,
    showClose: true,
    type: 'warning'
  })
  setTimeout(() => {
    // instance.destroy()
  }, 5000)
})
const formModel = reactive({
  email: '',
  password: '',
  test: ''
})
const validateForm = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('全部通过')
    })
    .catch((e: any) => {
      console.log(e)
    })
}
const reset = () => {
  formRef.value.resetFields()
}
const formRules: FormProps['rules'] = {
  email: [{ required: true, message: '输入正确邮箱', type: 'string' }],
  password: [{ required: true, message: '输入密码', type: 'string' }],
  test: [{ required: true, message: '输入test', type: 'string' }]
}
const handleCreateMessage = () => {
  createMessage({ message: 'hello 2222', duration: 0, type: 'primary' })
}
const handleRender = (item) => {
  return h('div', {}, [h('b', item.label), h('span', item.value)])
}
const handleFilter = (value: string) => {
  console.log(value)
  return []
}
const handleRemote = (value: string): Promise<OptionType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let arr = selectOptions.value.filter((item) => item.label.includes(value)) || []
      resolve(arr)
    }, 1000)
  })
}
const beforeChange: () => Promise<boolean> | boolean = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}
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
