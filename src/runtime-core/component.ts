export function createComponentInstance(vnode) {
  const component = {
    vnode,
  }
  return component
}

export function setupComponent(instance) {
  // TODO
  // initProps()
  // initSlots()
  setupStateFulComponent(instance)
}

function setupStateFulComponent(instance) {
  const Component = instance.vnode.type
  const { setup } = Component
  if(setup) {
    // function -> render   || object
    const setupResult = setup()
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
