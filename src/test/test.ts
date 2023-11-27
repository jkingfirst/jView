import { test, expect, vi, describe } from 'vitest'
import axios from 'axios'
function sum(a: number, b: number) {
  return a + b
}
function callbackFn(size: number, cb: Function) {
  if (size > 10) {
    cb(size)
  }
}
const getList = () => {
  return axios.get('baidu.com')
}
test('1+1=2', () => {
  expect(sum(1, 1)).toBe(2)
})
describe('function', () => {
  // 监控回调函数执行
  test('function callback', () => {
    const cb = vi.fn()
    callbackFn(12, cb)
    expect(cb).toHaveBeenCalled()
    expect(cb).toHaveBeenCalledWith(12)
  })
  test('test method on object ', () => {
    const obj = {
      getName: () => 'jking'
    }
    // 监控对象上的方法
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })
  // 模拟第三方模块
  test('test mock', () => {})
})
