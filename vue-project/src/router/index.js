import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
// import MenuPage from '@/Pages/MenuPage'
import LoginPage from '@/Pages/LoginPage'
import TestAxios from '@/Pages/TestAxios'
import TransactionPage from '@/Pages/TransactionPage'
import NotificationPage from '@/Pages/NotificationPage'
import StaticPage from '@/Pages/StaticPage'
import OrderedPage from '@/Pages/OrderedPage'
import EmployeePage from '@/Pages/EmployeePage'
import SignupPage from '@/Pages/SignupPage'
import CreateRestaurant from '@/Pages/CreateRestaurant'
import EditProfilePage from '@/Pages/EditProfilePage'
import TypeOfServicePage from '@/Pages/TypeOfServicePage'
import TypeOfServiceMenu from '@/Pages/TypeOfServiceMenu'
import AddCategory from '@/Pages/AddCategory'
import Restaurant from '@/Pages/Restaurant'
import MenuPage from '@/Pages/Menu/MenuPage'

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
    }, {
      path: '/test',
      name: 'TestAxios',
      component: TestAxios
    }, {
      path: '/Transaction',
      name: 'TransactionPage',
      component: TransactionPage
    }, {
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
      path: '/AddCategory',
      name: 'AddCategory',
      component: AddCategory
    },
    {
      path: '/Restaurant',
      name: 'Restaurant',
      component: Restaurant
    },




  ]
})
