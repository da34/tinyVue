import {publicInstanceProxyHandle} from "./componentPublicInstance";
import {initProps} from "./componentProps";
import {emit} from "./componentEmit";
import {initSlots} from "./componentsSlots";

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    setupState: {},
    props: {},
    slots: {},
    emit: () => {
    }
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
    // function -> render   || object
    const {props} = instance
    const setupResult = setup(props, {emit: instance.emit})
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
