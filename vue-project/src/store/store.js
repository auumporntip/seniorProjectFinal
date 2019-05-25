import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        flavor: '',
        user:'',
        restaurant:'',
        
    },
    mutations: {
        change(state, flavor) {
            state.flavor = flavor
        }
    },
    getters: {
        flavor: state => state.flavor
      }
})