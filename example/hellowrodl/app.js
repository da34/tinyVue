import {h, getCurrentInstance, renderSlots} from '../../lib/guide-mini-vue-esm.js'
import {Foo} from "./foo.js";

export const App = {
	render() {
		const app = h('div', {}, 'app')
		return h('div', {id: 'test',}, [app, h(Foo)])
	},
	setup() {
		const instance = getCurrentInstance()
		console.log('App: ', instance)
		return {
			msg: 'mini-vue'
		}
	}
}