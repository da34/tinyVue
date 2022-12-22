import {createComponentInstance, setupComponent} from "./component";
import {isObject} from "../shared";

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
    // 处理组件
  // console.log(vnode)
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if(isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode, container) {
  const el = document.createElement(vnode.type)
  vnode.el = el
  // props
  const { props } = vnode
  for (const propsKey in props) {
    const val = props[propsKey]
    el.setAttribute(propsKey, val)
  }
  
  // children
  const { children } = vnode
  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
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
