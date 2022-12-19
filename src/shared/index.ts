export const extend = Object.assign

export function isObject(val) {
    return val !== null && typeof val === 'object'
}

export function hasChanged(newVal, val) {
    return !Object.is(newVal, val)
}