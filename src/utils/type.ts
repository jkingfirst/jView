export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)
export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'
