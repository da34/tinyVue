import {createComponentInstance, setupComponent} from "./component";
import {ShapeFlags} from "../shared/ShapeFlags";
import {Fragment, Text} from "./vnode";
import {createAppApi} from "./createApp";
import {effect} from "../reactivity/effect";

export function createRenderer(options) {
  const {createElement: hostCreateElement, patchProp: hostPatchProp, insert: hostInsert} = options
  
  function render(vnode, container, parentComp) {
    patch(null, vnode, container, parentComp)
  }
  
  function patch(n1, n2, container, parentComp) {
    // 处理组件
    // console.log(vnode)
    const {type, shapeFlag} = n2
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComp)
        break
      case Text:
        processText(n1, n2, container)
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComp)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComp)
        }
    }
  }
  
  function processText(n1, n2, container) {
    const {children} = n2
    const el = document.createTextNode(children)
    n2.el = el
    hostInsert(el, container)
    // container.append(el)
  }
  
  function processFragment(n1, n2, container, parentComp) {
    mountChildren(n2, container, parentComp)
  }
  
  function processElement(n1, n2, container, parentComp) {
    if (!n1) {
      mountElement(n2, container, parentComp)
    } else {
      patchElement(n1, n2, container)
    }
    // container.append(el)
  }
  
  function mountElement(vnode, container, parentComp) {
    const el = hostCreateElement(vnode.type)
  
    vnode.el = el
  
    // children
    const {children, shapeFlag} = vnode
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComp)
    }
  
    // props
    const {props} = vnode
    for (const propsKey in props) {
      const val = props[propsKey]
      hostPatchProp(el, propsKey, val)
    }
    hostInsert(el, container)
  }
  
  function patchElement(n1, n2, container) {
    console.log('n1', n1)
    console.log('n2', n2)
  }
  
  function processComponent(n1, n2, container, parentComp) {
    mountComponent(n2, container, parentComp)
  }
  
  function mountComponent(vnode, container, parentComp) {
    const instance = createComponentInstance(vnode, parentComp)
    setupComponent(instance)
    setupRenderEffect(instance, container)
  }
  
  function mountChildren(vnode, container, parentComp) {
    vnode.children.forEach(c => {
      patch(null, c, container, parentComp)
    })
  }
  
  function setupRenderEffect(instance: any, container) {
    // console.log(instance, 'instance')
    effect(() => {
      if (!instance.isMounted) {
        console.log('init')
        // if (!instance.render) return
        const subTree = instance.subTree = instance.render.call(instance.proxy)
        patch(null, subTree, container, instance)
        instance.vnode.el = subTree.el
        instance.isMounted = true
      } else {
        console.log('update')
        const { proxy, render } = instance
        const subTree = render.call(proxy)
        const prevSubTree = instance.subTree
        instance.subTree = subTree
        patch(prevSubTree, subTree, container, instance)
      }
    })
  }
  
  return {
    createApp: createAppApi(render)
  }
}
