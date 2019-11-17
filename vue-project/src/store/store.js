import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        account:'',
        name:'',
        restaurantId:'',
        selectedRestaurant:'',
        restaurantName:'Select your restaurant',
        //menu page
        menu:[],
        selectedMenu:null,
        category:{},
        checkCategory:'',
        //menu 
        employee: {},
        position: [],
        //employee
        
        notification:0
    },
    mutations: {
        setNotification(state,notification){
            state.notification = notification
        },
        //menu page
        setMenu(state,menu){
            state.menu = menu
        },
        setCategory(state,category){
            state.category=category
        },
        setSelectedMenu(state,selectedMenu){
            state.selectedMenu = selectedMenu
        },
        setCheckCategory(state,checkCategory){
            state.checkCategory = checkCategory
        },
        //menu
        setAccount(state,account){
            state.account = account
        },
        setName(state,name){
            state.name = name
        },
        setRestaurantId(state, restaurantId) {
            state.restaurantId = restaurantId
        },
        setSelectedRestaurant(state,selectedRestaurant){
            state.selectedRestaurant = selectedRestaurant
        },
        setRestaurantName(state,restaurantName){
            state.restaurantName = restaurantName
        },
        //employee
        setEmployee(state,employee){
            state.employee = employee
        },
        setPosition(state, position){
            state.position = position
        }
    },
    getters: {
        notification: state => state.notification,
        //menu page
        menu: state=> state.menu,
        selectedMenu: state=> state.selectedMenu,
        category: state=> state.category,
        checkCategory: state=> state.checkCategory,
        //menu
        account: state=> state.account,
        name: state=>state.name,
        restaurantId: state => state.restaurantId,
        restaurantName: state => state.restaurantName,
        selectedRestaurant: state => state.selectedRestaurant,
        //Employee
        employee: state=> state.employee,
        position: state => state.position,
      }
})