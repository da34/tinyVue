import { h } from '../../lib/guide-mini-vue-esm.js'
import { Foo } from "./foo.js";

window.self = null
export const App = {
    render() {
        window.self = this
        return h('div', {
            id: 'test',
            class: ['red', 'green'],
            // onClick: () => {
            //     console.log('click')
            // }
        },
            [
                h('p', {}, 'hi ' + this.msg),
                h(Foo, {
                    count: 1,
                    onAdd(a, b) {
                        console.log('onAdd', a, b)
                    },
                    onAddFoo(a, b) {
                        console.log('onAddFoo')
                    }
                })
            ]
            // [
            //     h('div', { class: 'red' }, 'vue'),
            //     h('div', { class: 'blue' }, 'mini-vue')
            // ]
        )
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}