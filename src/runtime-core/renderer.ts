import {createComponentInstance, setupComponent} from "./component";
import {ShapeFlags} from "../shared/ShapeFlags";
import {Fragment, Text} from "./vnode";

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
    // 处理组件
  // console.log(vnode)
  const { type, shapeFlag } = vnode
  switch (type) {
    case Fragment:
      processFragment(vnode, container)
      break
    case Text:
      processText(vnode, container)
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container)
      } else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container)
      }
  }
}

function processText(vnode, container) {
  const { children } = vnode
  const el = document.createTextNode(children)
  vnode.el = el
  container.append(el)
}

function processFragment(vnode, container) {
  mountChildren(vnode, container)
}

function processElement(vnode, container) {
  const el = document.createElement(vnode.type)

  vnode.el = el

  // children
  const { children, shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }

  // props
  const { props } = vnode
  const isOn = (key: string) => /^on[A-Z]/.test(key)
  for (const propsKey in props) {
    const val = props[propsKey]
    if (isOn(propsKey)) {
      const event = propsKey.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(propsKey, val)
    }
  }

  container.append(el)
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(c => {
    patch(c, container)
  })
}

function setupRenderEffect(instance: any, container) {
  // console.log(instance, 'instance')
  if (!instance.render) return
  const subTree = instance.render.call(instance.proxy)
  patch(subTree, container)
  instance.vnode.el = subTree.el
}
