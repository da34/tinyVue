import {getCurrentInstance} from "./component";

export function provide(key, value) {
  const instance: any = getCurrentInstance()
  if (!instance) return
  let { provide, parent } = instance
  if (provide === parent.provide) {
    provide = instance.provide =Object.create(parent.provide)
  }
  provide[key] = value
}

export function inject(key, def) {
  const instance: any = getCurrentInstance()
  if (!instance) return
  const value = instance.parent.provide[key]
  if (value) {
    return value
  } else if (def) {
    if (typeof def === 'function') return def()
    return def
  }
}