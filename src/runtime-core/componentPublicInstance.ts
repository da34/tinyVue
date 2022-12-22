import {hasOwn} from "../shared";

const publicPropertiesMap = {
  '$el': i => i.vnode.el
}
export const publicInstanceProxyHandle = {
  get({_: instance}, key) {
    const publicGetter = publicPropertiesMap[key]
    // console.log(instance, '455555')
    const { props } = instance
    if (publicGetter)
      return publicGetter(instance)
    const { setupState } = instance
    if (hasOwn(setupState, key))
      return setupState[key]
    else if (hasOwn(props, key))
      return props[key]
  }
}