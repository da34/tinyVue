import { h } from '../../lib/guide-mini-vue-esm.js'
window.self = null
export const App = {
    render() {
        window.self = this
        return h('div', {
            id: 'test',
            class: ['red', 'green']
        },
            'hi ' + this.msg
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