import { h } from '../../lib/guide-mini-vue-esm.js'
export const App = {
    render() {
        return h('div', {
            id: 'test',
            class: ['red', 'green']
        },[
            h('div', { class: 'red' }, 'vue'),
            h('div', { class: 'blue' }, 'mini-vue')
        ])
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}