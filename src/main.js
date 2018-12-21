// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
// import VueI18n from 'vue-i18n'

import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/styles/base.scss' // 自定义样式
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

import './icons' // icon
import '@/permission' // permission control
import '@/utils/filters'

import VideoPlayer from 'vue-video-player'

Vue.use(VideoPlayer)
Vue.use(ElementUI, { locale })
// Vue.use(VueI18n)
Vue.config.productionTip = false

// const i18n = new VueI18n({
//   locale: 'zh-CN', // 默认从浏览器语言读取
//   messages: {
//     'zh-CN': require('./local/language-zh.js'), // 中文语言包
//     'en': require('./local/language-en.js') // 英文语言包
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // i18n: i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
