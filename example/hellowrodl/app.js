import {h, provide, inject, } from '../../lib/guide-mini-vue-esm.js'

const Provider = {
	name: 'provider',
	setup() {
		provide('foo', 'fooVal')
		provide('bar', 'barVal')
	},
	render() {
		return h('div', {}, [h('p', {}, 'Provider'), h(ProvideTwo)])
	}
}

const ProvideTwo = {
	name: 'ProvideTwo',
	setup() {
		provide('foo', 'fooValTwo')
		const foo = inject('foo')
		return {
			foo
		}
	},
	render() {
		return h('div', {}, [h('p', {}, 'ProviderTwo: ' + this.foo), h(Consumer)])
	}
}

const Consumer = {
	name: 'Consumer',
	setup() {
		const foo = inject('foo')
		const bar = inject('bar')
		const barTwo = inject('bar-tow', () => 'default')

		return {
			foo,
			bar,
			barTwo
		}
	},
	render() {
		return h('div', {}, `Consumer: - ${this.foo} - ${this.bar} - ${this.barTwo}`)
	}
}
export const App = {
	render() {
		return h('div', {}, [h('p', {}, 'AppInject'), h(Provider)])
	},
	setup() {
		return {
		}
	}
}