import {h} from "../../lib/guide-mini-vue-esm.js";

export const Foo = {
    setup(props, { emit }) {
        const emitAdd = () => {
            console.log('emit add')
            emit('add', 1, 2)
            emit('add-foo', 1, 2)
        }
        return {
            emitAdd
        }
    },
    render() {
        const btn = h('button', {
            onClick: this.emitAdd
        }, 'emit add')

        const foo = h('p', {}, 'foo: ' + this.count)
        return h('div', {},
            [btn, foo]
        )
    }
}