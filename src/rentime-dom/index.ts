import {createRenderer} from "../runtime-core/renderer";

function createElement(type) {
  return document.createElement(type)
}

function patchProp(el, propsKey, val) {
  const isOn = (key: string) => /^on[A-Z]/.test(key)
  if (isOn(propsKey)) {
    const event = propsKey.slice(2).toLowerCase()
    el.addEventListener(event, val)
  } else {
    el.setAttribute(propsKey, val)
  }
}

function insert(el, parent) {
  parent.append(el)
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
})

export function createApp(...args) {
  return renderer.createApp(...args)
}
export * from '../runtime-core'