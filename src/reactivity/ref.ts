import {isTacking, trackEffects, triggerEffects} from "./effect";
import {hasChanged, isObject} from "../shared";
import {reactive} from "./reactive";

class RefImpl {
    private _value: any;
    public dep
    private _rawValue
    public __v_isRef = true
    constructor(value) {
        this._rawValue = value
        this._value = convert(value)
        this.dep = new Set()
    }
    get value() {
        if (isTacking())
            trackEffects(this.dep)
        return this._value
    }
    set value(val) {
        // console.log(val, this._rawValue, 555)
        if (hasChanged(val, this._rawValue)) {
            this._rawValue = val
            this._value = convert(val)
            triggerEffects(this.dep)
        }
    }
}
function convert(value) {
    return isObject(value) ? reactive(value) : value
}
export function  ref(value) {
    return new RefImpl(value)
}

export function isRef(ref) {
    return !!ref.__v_isRef
}

export function unRef(ref) {
    return isRef(ref) ? ref.value : ref
}