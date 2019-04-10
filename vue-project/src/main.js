// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import responsive from 'vue-responsive'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueScrollProgress from 'vue-scroll-progress'
Vue.use(VueScrollProgress)
Vue.use(Vuetify)
Vue.use(responsive)
 
Vue.prototype.$http = axios
Vue.use(Buefy)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
