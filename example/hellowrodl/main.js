import { createApp } from '../../lib/guide-mini-vue-esm'
import { App } from './app'

const rootContainer = document.querySelector('#app')
createApp(App).mount(rootContainer)