import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        accountId:'',
        name:'',
        restaurantId:'',
        selectedRestaurant:'',
        restaurantName:'Select your restaurant',
        //menu page
        menu:{},
        selectedMenu:null,
        category:{},
        checkCategory:''
        //menu 
    },
    mutations: {
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
        setAccount(state,accountId){
            state.accountId = accountId
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
        }
    },
    getters: {
        //menu page
        menu: state=> state.menu,
        selectedMenu: state=> state.selectedMenu,
        category: state=> state.category,
        checkCategory: state=> state.checkCategory,
        //menu
        accountId: state=> state.accountId,
        name: state=>state.name,
        restaurantId: state => state.restaurantId,
        restaurantName: state => state.restaurantName,
        selectedRestaurant: state => state.selectedRestaurant
      }
})