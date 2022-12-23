import {createComponentInstance, setupComponent} from "./component";
import {ShapeFlags} from "../shared/ShapeFlags";
import {Fragment, Text} from "./vnode";

export function render(vnode, container, parentComp) {
  patch(vnode, container, parentComp)
}

function patch(vnode, container, parentComp) {
    // 处理组件
  // console.log(vnode)
  const { type, shapeFlag } = vnode
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComp)
      break
    case Text:
      processText(vnode, container)
      break;
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComp)
      } else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComp)
      }
  }
}

function processText(vnode, container) {
  const { children } = vnode
  const el = document.createTextNode(children)
  vnode.el = el
  container.append(el)
}

function processFragment(vnode, container, parentComp) {
  mountChildren(vnode, container, parentComp)
}

function processElement(vnode, container, parentComp) {
  const el = document.createElement(vnode.type)

  vnode.el = el

  // children
  const { children, shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el, parentComp)
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

function processComponent(vnode, container, parentComp) {
  mountComponent(vnode, container, parentComp)
}

function mountComponent(vnode, container, parentComp) {
  const instance = createComponentInstance(vnode, parentComp)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function mountChildren(vnode, container, parentComp) {
  vnode.children.forEach(c => {
    patch(c, container, parentComp)
  })
}

function setupRenderEffect(instance: any, container) {
  // console.log(instance, 'instance')
  if (!instance.render) return
  const subTree = instance.render.call(instance.proxy)
  patch(subTree, container, instance)
  instance.vnode.el = subTree.el
}
