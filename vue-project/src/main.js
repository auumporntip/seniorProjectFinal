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
import { store } from './store/store'
import BootstrapVue from 'bootstrap-vue'
import ModuleLibrary from '@coreui/vue';
import VTooltip from 'v-tooltip'

Vue.use(BootstrapVue)
Vue.config.ignoredElements = ['b-field', 'b-upload', 'b-icon','v-row']

Vue.use(VueScrollProgress)
Vue.use(Vuetify)
Vue.use(responsive)
Vue.use(ModuleLibrary);
Vue.use(VTooltip)
Vue.directive('tooltip', VTooltip)

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import {
  faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, fas
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);

// ...


Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
});

