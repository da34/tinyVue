import {createVNode, Fragment} from "../vnode";

export function renderSlots(slots, name, props) {
  if (!name) return
  const slot = slots[name]
  if (typeof slot === 'function')
    return createVNode(Fragment, {}, slot(props))
}