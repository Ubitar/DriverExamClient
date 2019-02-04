import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import DivFlex from './components/custom/div'
Vue.use(DivFlex)

import RadioBtn from './components/custom/radiobtn'
Vue.use(RadioBtn)

import CheckBox from './components/custom/checkbox'
Vue.use(CheckBox)

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

Vue.use(require('vue-wechat-title'))

import Api from './Api.js'
Vue.prototype.$Api = Api

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
