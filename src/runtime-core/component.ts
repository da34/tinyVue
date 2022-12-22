export function createComponentInstance(vnode) {
  const component = {
    vnode,
    setupState: {}
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
  
  instance.proxy = new Proxy({}, {
    get(target, key) {
      const { setupState } = instance
      if (key in setupState) {
        return setupState[key]
      }
    }
  })
  
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
