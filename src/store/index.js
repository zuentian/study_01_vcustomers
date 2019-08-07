import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api'
import {ModalPlugin} from '@/plugins'
import { setToken,getToken,removeToken } from '@/utils'
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
        token:null,
        userInfo:1,
    },
    mutations:{//提交状态修改
        UPDATE_TOKEN(state, payload) {
            setToken(payload)
            state.token = payload
          },
        CLEAR_USER_INFO(state,payload){
            removeToken()
            state.userInfo=null
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
            commit('UPDATE_TOKEN', token.bodyText)   
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