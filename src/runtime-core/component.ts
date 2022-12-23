import {publicInstanceProxyHandle} from "./componentPublicInstance";
import {initProps} from "./componentProps";
import {emit} from "./componentEmit";
import {initSlots} from "./componentsSlots";

export function createComponentInstance(vnode, parentComp) {
  console.log('createComponentInstance', parentComp)
  const component = {
    vnode,
    setupState: {},
    props: {},
    slots: {},
    emit: () => {},
    provide: parentComp ? parentComp.provide : {},
    parent: parentComp
  }

  component.emit = emit.bind(null, component) as any
  return component
}

export function setupComponent(instance) {
  // TODO
  initProps(instance, instance.vnode.props)
  initSlots(instance, instance.vnode.children)
  setupStateFulComponent(instance)
}

function setupStateFulComponent(instance) {
  const Component = instance.vnode.type

  instance.proxy = new Proxy({_: instance}, publicInstanceProxyHandle)

  const {setup} = Component

  if (setup) {
    setCurrentInstance(instance)
    // function -> render   || object
    const {props} = instance
    const setupResult = setup(props, {emit: instance.emit})
    handleSetupResult(instance, setupResult)
    setCurrentInstance(null)
  }
}

function handleSetupResult(instance, setupResult: any) {
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.vnode.type
  if (Component.render) {
    instance.render = Component.render
  }
}

let currentInstance = null
export function getCurrentInstance() {
  return currentInstance
}

function setCurrentInstance(instance) {
  currentInstance = instance
}