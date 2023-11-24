import { mount } from '@vue/test-utils'
import Button from '@/components/Button/Button.vue'
import { test, expect, describe } from 'vitest'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
describe('Button.vue', () => {
  test('test Button', () => {
    const el = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'hello word'
      }
    })
    // classs
    expect(el.classes()).toContain('j-button--primary')
    // slots
    expect(el.get('button').text()).toBe('hello word')
    // events
    el.get('button').trigger('click')
    console.log(el.emitted())
    expect(el.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    const el = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    expect(el.attributes('disabled')).toBeDefined()
    // 原生节点
    expect(el.get('button').element.disabled).toBeDefined()
    el.get('button').trigger('click')
    console.log(el.emitted())
    expect(el.emitted()).not.toHaveProperty('click')
  })
  test('icon', () => {
    const el = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    const FontIcon = el.findComponent(FontAwesomeIcon)
    expect(FontIcon.exists()).toBeTruthy()
    expect(FontIcon.attributes('icon')).toBe('arrow-up')
  })
})
