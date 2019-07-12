import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api'
import {ModalPlugin} from '@/plugins'
import { setToken } from '@/utils'
Vue.use(Vuex)
Vue.use(ModalPlugin)

//  const configPlugin = (options) => {
//    Object.keys(plugins).forEach(key => {
//      Vue.use(plugins[key], options)
//    })
//  }

//创建vuex的store--状态管理
const store=new Vuex.Store({
    state:{
        // count:5
    },
    mutations:{//提交状态修改
        UPDATE_TOKEN(state, payload) {
            setToken(payload)
            console.log(payload)
            state.token = payload
          },
        SHOW_ERROR_TOAST(state, message) {
            Vue.modal.toast({
              showClose: true,
              message: message,
              type: 'error'
            })
        }
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