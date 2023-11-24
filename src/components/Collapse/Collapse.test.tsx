import { mount } from '@vue/test-utils'
import { test, expect, describe, vi } from 'vitest'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
describe('collapse', () => {
  test('basic use', async () => {
    const onChange = vi.fn()
    const wrapper = mount(
      () => {
        return (
          <Collapse modelValue={['a']} onChange={onChange}>
            <CollapseItem name={'a'} title={'title a'}>
              {'content a'}{' '}
            </CollapseItem>
            <CollapseItem name={'b'} title={'title b'}>
              {'content b'}
            </CollapseItem>
            <CollapseItem name={'c'} title={'title c'} disabled>
              {'content c'}
            </CollapseItem>
          </Collapse>
        )
      },
      {
        global: {
          stubs: ['JIcon']
        },
        attachTo: document.body // 解决事件触发后样式不更新问题
      }
    )
    const headers = wrapper.findAll('.j-collapse-item__header')
    const contents = wrapper.findAll('.j-collapse-item__wrapper')
    //判断长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // 文本
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')
    // content
    const firstContent = contents[0]
    const secondContent = contents[1]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    // 事件
    await firstHeader.trigger('click')
    console.log(firstContent.html())
    expect(firstContent.isVisible()).toBeFalsy()
    expect(onChange).toHaveBeenCalledWith([])
    await secondHeader.trigger('click')
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
})
