import {createVNode} from "./vnode";
// @ts-ignore
import {render} from "./renderer";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const vnode = createVNode(rootComponent)

      render(vnode, rootContainer)
    }
  }
}