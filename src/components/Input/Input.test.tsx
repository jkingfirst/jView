import { mount } from '@vue/test-utils'
import { test, expect, describe, it } from 'vitest'
import Input from '@/components/Input/Input.vue'
import Icon from '@/components/Icon/Icon.vue'
describe('Input.vue', () => {
  test('基本展示', () => {
    // 动态class 是否展示正确
    // v-if 是否展示标签或内容
    // slot 是否展示插槽内容
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        modelValue: '23'
      },
      slots: {
        prefix: 'prefix',
        prepend: 'prepend'
      }
    })
    // class
    expect(wrapper.classes()).toContain('j-input-text')
    expect(wrapper.classes()).toContain('j-input-small')
    // input render
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.find('input').attributes('type')).toBe('text')
    // 插槽 查找节点一节节点内容是否正确
    expect(wrapper.find('.j-input__prefix').exists()).toBeTruthy()
    expect(wrapper.find('.j-input__prepend').exists()).toBeTruthy()
    expect(wrapper.find('.j-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.j-input__prefix').text()).toBe('prefix')
  })
  test('v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        modelValue: '23',
        'onUpdate:modelValue': (value: any) =>
          wrapper.setProps({
            modelValue: value
          })
      },
      slots: {
        prefix: 'prefix',
        prepend: 'prepend'
      }
    })
    const [currentInput] = wrapper.findAll('input')
    // 初始值
    expect(wrapper.props('modelValue')).toBe('23')
    expect(currentInput.element.value).toBe('23')
    //更新值
    // setValue 组合事件会模拟input 和change时间
    await currentInput.setValue('123')
    expect(currentInput.element.value).toBe('123')
    expect(wrapper.props('modelValue')).toBe('123')
    console.log('event-click', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent[0]).toEqual(['123'])
    expect(changeEvent[0]).toEqual(['123'])
    // 异步更新
    await wrapper.setProps({
      modelValue: 'async props'
    })
    expect(currentInput.element.value).toBe('async props')
  })
  // 点击清空图标情况按钮
  test('clear', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        clearable: true,
        modelValue: '23'
      },
      slots: {
        prefix: 'prefix',
        prepend: 'prepend'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 展示交互
    expect(wrapper.find('.j-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(wrapper.find('input').exists()).toBeTruthy()
    await input.trigger('focus')
    expect(wrapper.find('.j-input__clear').exists()).toBeTruthy()
    // 点击清空
    const clearIcon = wrapper.find('.j-input__clear')
    await clearIcon.trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])
  })
  test('type password ', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        showPassword: true,
        modelValue: ''
      },
      slots: {
        prefix: 'prefix',
        prepend: 'prepend'
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })
    // render
    expect(wrapper.find('.j-input_password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    await input.setValue('123')
    const eyeIcon = wrapper.find('.j-input_password')
    expect(eyeIcon.exists()).toBeTruthy()
    // 行为交互
    await eyeIcon.trigger('click')
    const IconComp = wrapper.findComponent(Icon)
    expect(IconComp.exists()).toBeTruthy()
    expect(IconComp.attributes('icon')).toBe('eye')
    expect(input.element.type).toBe('text')
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('password')
    expect(IconComp.attributes('icon')).toBe('eye-slash')
  })
})
