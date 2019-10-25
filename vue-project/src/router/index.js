

import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
// import MenuPage from '@/Pages/MenuPage'
import LoginPage from '@/Pages/LoginPage'
import NotificationPage from '@/Pages/NotificationPage'
import StaticPage from '@/Pages/StaticPage'
import OrderedPage from '@/Pages/OrderedPage'
import ServedPage from '@/Pages/ServedPage'
import EmployeePage from '@/Pages/Employee/EmployeePage'
import SignupPage from '@/Pages/SignupPage'
import CreateRestaurant from '@/Pages/CreateRestaurant'
import EditProfilePage from '@/Pages/EditProfilePage'
import TypeOfServicePage from '@/Pages/TypeOfServicePage'
import TypeOfServiceMenu from '@/Pages/TypeOfServiceMenu'
import Restaurant from '@/Pages/Restaurant'
import MenuPage from '@/Pages/Menu/MenuPage'
import TablePage from '@/Pages/TablePage'
import Superadmin from '@/Superadmin/Superadmin'
import accountsuper from '@/Superadmin/page/accountsuper'
import billsuper from '@/Superadmin/page/billsuper'
import catsuper from '@/Superadmin/page/catsuper'
import empsuper from '@/Superadmin/page/empsuper'
import menusuper from '@/Superadmin/page/menusuper'
import menuservicesuper from '@/Superadmin/page/menuservicesuper'
import notificationsuper from '@/Superadmin/page/notificationsuper'
import positionsuper from '@/Superadmin/page/positionsuper'
import restaurantsuper from '@/Superadmin/page/restaurantsuper'
import statussuper from '@/Superadmin/page/statussuper'
import transactionsuper from '@/Superadmin/page/transactionsuper'
import typeofressuper from '@/Superadmin/page/typeofressuper'
import typeofservicesuper from '@/Superadmin/page/typeofservicesuper'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    }, {
      path: '/Menu',
      name: 'MenuPage',
      component: MenuPage
    },
    {
      path: '/Notification',
      name: 'NotificationPage',
      component: NotificationPage
    }, {
      path: '/Static',
      name: 'StaticPage',
      component: StaticPage
    },{
      path: '/Ordered',
      name: 'OrderedPage',
      component: OrderedPage
    },{
      path: '/Employee',
      name: 'EmployeePage',
      component: EmployeePage
    },{
      path: '/Signup',
      name: 'SignupPage',
      component: SignupPage
    },{
      path: '/CreateRestaurant',
      name: 'CreateRestaurant',
      component: CreateRestaurant
    },{
      path: '/EditProfile',
      name: 'EditProfile',
      component: EditProfilePage
    },
    {
      path: '/TypeOfService',
      name: 'TypeOfService',
      component: TypeOfServicePage
    },
    {
      path: '/TypeOfServiceMenu',
      name: 'TypeOfServiceMenu',
      component: TypeOfServiceMenu
    },
    
    {
      path: '/Restaurant',
      name: 'Restaurant',
      component: Restaurant
    },
    {
      path: '/Table',
      name: 'TablePage',
      component: TablePage
    },
    {
      path: '/Superadmin',
      name: 'Superadmin',
      component: Superadmin
    },
    {
      path: '/accountsuper',
      name: 'accountsuper',
      component: accountsuper
    },
    {
      path: '/billsuper',
      name: 'billsuper',
      component: billsuper
    },
    {
      path: '/catsuper',
      name: 'catsuper',
      component: catsuper
    },
    {
      path: '/empsuper',
      name: 'empsuper',
      component: empsuper
    },
    {
      path: '/menusuper',
      name: 'menusuper',
      component: menusuper
    },
    {
      path: '/menuservicesuper',
      name: 'menuservicesuper',
      component: menuservicesuper
    },
    {
      path: '/notificationsuper',
      name: 'notificationsuper',
      component: notificationsuper
    },
    {
      path: '/positionsuper',
      name: 'positionsuper',
      component: positionsuper
    },
    {
      path: '/restaurantsuper',
      name: 'restaurantsuper',
      component: restaurantsuper
    },
    {
      path: '/statussuper',
      name: 'statussuper',
      component: statussuper
    },
    {
      path: '/transactionsuper',
      name: 'transactionsuper',
      component: transactionsuper
    },
    {
      path: '/typeofressuper',
      name: 'typeofressuper',
      component: typeofressuper
    },
    {
      path: '/typeofservicesuper',
      name: 'typeofservicesuper',
      component: typeofservicesuper
    },
    {
      path: '/Served',
      name: 'ServedPage',
      component: ServedPage
    },
    {
      path: '/Login',
      name: 'LoginPage',
      component: LoginPage
    },
    

  ]
})
