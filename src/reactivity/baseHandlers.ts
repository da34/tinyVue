import {track, trigger} from "./effect";
import {reactive, ReactiveFlags, readonly} from "./reactive";
import {extend, isObject} from "../shared";
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadonly = false, shallow?) {
    return function get(target, key) {
            if (key === ReactiveFlags.IS_REACTIVE)
                return !isReadonly

            if (key === ReactiveFlags.IS_READONLY)
                return isReadonly
            const res = Reflect.get(target, key)

            if (shallow)
                return res
            if (isObject(res)) {
                return isReadonly ? readonly(res) : reactive(res)
            }

            // TODO 依赖收集
            if (!isReadonly)
                track(target, key)
            return res
    }
}

function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value)
        // TODO 触发依赖
        trigger(target, key)
        return res
    }
}
export const mutableHandles =  {
    get,
    set
}

export const readonlyHandles = {
    get: readonlyGet,
    set(target, key, value) {
        console.warn(`${key} 不可以修改，因为 target ${target} 是 readonly`)
        return true
    }
}

export const shallowReadonlyHandles = extend({}, readonlyHandles, {
    get: shallowReadonlyGet
})