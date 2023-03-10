import {ShapeFlags} from "../shared/ShapeFlags";

export function initSlots(instance, children) {
  // instance.slots = Array.isArray(slots) ? slots : [slots]
  if(instance.vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN)
    normalizeSlotObject(children, instance.slots)
}

function normalizeSlotObject(children, slots) {
  for (const key in children) {
    const value = children[key]
    slots[key] = (props) => normalizeSlotValue(value(props))
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value]
}