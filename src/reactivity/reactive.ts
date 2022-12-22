import {mutableHandles, readonlyHandles, shallowReadonlyHandles} from "./baseHandlers";
import {isObject} from "../shared";

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

export function isProxy(value) {
    return isReactive(value) || isReadonly(value)
}

export function shallowReadonly(raw) {
    return createActiveObj(raw, shallowReadonlyHandles)
}
function createActiveObj(raw, baseHandles) {
    if (!isObject(raw)) {
        console.error('target 不是一个object')
        return
    }
    return new Proxy(raw, baseHandles)
}

