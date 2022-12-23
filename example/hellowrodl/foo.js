import {h, getCurrentInstance} from "../../lib/guide-mini-vue-esm.js";

export const Foo = {
    setup() {
        const instance = getCurrentInstance()
        console.log('Foo: ', instance)
    },
    render() {
        // const foo = h('p', {}, 'foo')
        return h('div', {}, '566666')
    }
}