import {createComponentInstance, setupComponent} from "./component";
import {isObject} from "../shared";
import {ShapeFlags} from "../shared/ShapeFlags";

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
    // 处理组件
  // console.log(vnode)
  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container)
  }
}

function processElement(vnode, container) {
  const el = document.createElement(vnode.type)
  vnode.el = el
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
  
  // children
  const { children, shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    children.forEach(c => {
      patch(c, el)
    })
  }
  
  container.appendChild(el)
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render.call(instance.proxy)
  // console.log(subTree, 'instance')
  patch(subTree, container)
  instance.vnode.el = subTree.el
}
