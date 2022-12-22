export const extend = Object.assign

export function isObject(val) {
    return val !== null && typeof val === 'object'
}

export function hasChanged(newVal, val) {
    return !Object.is(newVal, val)
}

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)

export const camelize = (str:string) => {
    return str.replace(/-(\w)g/, (_, c) => {
        return c ? c.toUpperCase() : ''
    })
}
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
export const toHandleKey = (str: string) => str ? 'on' + capitalize(str) : ''