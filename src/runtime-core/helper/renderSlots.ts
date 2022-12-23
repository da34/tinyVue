import {createVNode} from "../vnode";

export function renderSlots(slots, name, props) {
  if (!name) return
  const slot = slots[name]
  if (typeof slot === 'function')
    return createVNode('div', {}, slot(props))
}