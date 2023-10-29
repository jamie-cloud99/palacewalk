import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar'
import { useStatusStore } from './stores/statusStore'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { register } from 'swiper/element/bundle'
register()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(setupCalendar, {})
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.use(Loading.Plugin)

// Global Component
app.component('loading-component', Loading)

app.mount('#app')
