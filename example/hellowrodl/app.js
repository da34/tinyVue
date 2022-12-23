import { h } from '../../lib/guide-mini-vue-esm.js'
import { Foo } from "./foo.js";

export const App = {
    render() {
        const app = h('div', {}, 'app')
        const pSlots2 = h('p', {}, 'footer')
        const foo = h(Foo, {}, {header: ({age}) => h('p', {}, 'header' + age), footer: () => pSlots2})
        return h('div', {id: 'test',},
            [app, foo]
        )
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}