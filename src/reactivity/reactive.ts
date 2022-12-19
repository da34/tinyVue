import {mutableHandles, readonlyHandles, shallowReadonlyHandles} from "./baseHandlers";

export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly'
}
export function reactive(raw) {
    return createActiveObj(raw, mutableHandles)
}

export function readonly(raw) {
    return createActiveObj(raw, readonlyHandles)
}

export function isReactive(value) {
    return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
    return !!value[ReactiveFlags.IS_READONLY]
}

export function shallowReadonly(raw) {
    return createActiveObj(raw, shallowReadonlyHandles)
}
function createActiveObj(raw, baseHandles) {
    return new Proxy(raw, baseHandles)
}

