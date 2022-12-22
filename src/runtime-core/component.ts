import {publicInstanceProxyHandle} from "./componentPublicInstance";
import {initProps} from "./componentProps";

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    setupState: {},
    props: {}
  }
  return component
}

export function setupComponent(instance) {
  // TODO
  initProps(instance, instance.vnode.props)
  // initSlots()
  setupStateFulComponent(instance)
}

function setupStateFulComponent(instance) {
  const Component = instance.vnode.type
  
  instance.proxy = new Proxy({_: instance}, publicInstanceProxyHandle)
  
  const { setup } = Component
  if(setup) {
    // function -> render   || object
    const setupResult = setup(instance.props)
    handleSetupResult(instance, setupResult)
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
