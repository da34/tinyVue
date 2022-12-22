const publicPropertiesMap = {
  '$el': i => i.vnode.el
}
export const publicInstanceProxyHandle = {
  get({_: instance}, key) {
    const publicGetter = publicPropertiesMap[key]
    // console.log(instance, '455555')
    if (publicGetter)
      return publicGetter(instance)
    const { setupState } = instance
    if (key in setupState) {
      return setupState[key]
    }
  }
}