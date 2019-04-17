import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import MoMenuPage from '@/pages/MoMenuPage'
import MoTypePage from '@/pages/MoTypePage'
import MoOrderPage from '@/pages/MoOrderPage'
import MoStatusPage from '@/pages/MoStatusPage'
import MoReceiptPage from '@/pages/MoReceiptPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
       
    }, {
      path: '/MoMenu',
      name: 'MoMenuPage',
      component: MoMenuPage
    }, {
      path: '/MoType',
      name: 'MoTypePage',
      component: MoTypePage
    }, {
      path: '/MoOrder',
      name: 'MoOrderPage',
      component: MoOrderPage
    }, {
      path: '/MoStatus',
      name: 'MoStatusPage',
      component: MoStatusPage
    }, {
      path: '/MoReceipt',
      name: 'MoReceiptPage',
      component: MoReceiptPage
    }
  ]
})
