import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api'
Vue.use(Vuex)

//创建vuex的store
const store=new Vuex.Store({
    state:{
        // count:5
    },
    mutations:{
        // increment(state){
        //     state.count++
        // },
        // decrement(state){
        //     state.count--
        // }
    },
    //有异步的时候，需要action
    actions:{
        
        AC_Login({ dispatch, commit }, payload) {
            return login(payload).then(token => {
            commit('UPDATE_TOKEN', token)   
        })
  }
    },
    getters:{
        // getState(state){
        //     return state.count>0?state.count:0;
        // }
    }
})

export default store