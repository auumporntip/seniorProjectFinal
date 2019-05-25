import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        accountId:'',
        name:'',
        restaurantId:'',
        selectedRestaurant:'',
        restaurantName:''
    },
    mutations: {
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
        accountId: state=> state.accountId,
        name: state=>state.name,
        restaurantId: state => state.restaurantId,
        restaurantName: state => state.restaurantName,
        selectedRestaurant: state => state.selectedRestaurant
      }
})