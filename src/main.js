import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import vuePhotoZoomPro from 'vue-photo-zoom-pro'
import 'vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css'

import { register } from 'swiper/element/bundle'
register()

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
  position: 'top-right',
  timeout: 1200,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.7,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(setupCalendar, {})
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.use(Toast, options)

// Global Component
app.component('loading-component', Loading)

app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.component('photo-zoom',vuePhotoZoomPro)

app.mount('#app')
