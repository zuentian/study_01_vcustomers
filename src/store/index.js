import Vue from 'vue'
import Vuex from 'vuex'
import { login,getCurrentUser ,logout,register} from '@/api'
import {ModalPlugin} from '@/plugins'
import { setToken,getToken,removeToken } from '@/utils'
import { filterAsyncRouter } from '@/common/functions'
import { constRouterMap, asyncRouterMap } from './routes'
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
        userInfo:null,
        routers: constRouterMap,
        addRouters: [],
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
        },
        UPDATE_USER_INFO(state, payload) {
          state.userInfo = payload 
        },
        SET_ROUTERS: (state, routers) => {
          state.addRouters = routers
          state.routers = constRouterMap.concat(routers)
        },
    },
    //有异步的时候，需要action
    actions:{
        
        AC_Login({ dispatch, commit }, payload) {
            return login(payload).then(token => {
            commit('UPDATE_TOKEN', token.bodyText)   
        })
        },
        AC_GetUserInfo({ commit, state: { token } }) {
            return getCurrentUser({ token: token || getToken() }).then(response => {
              commit("UPDATE_USER_INFO", response.body)    
              return response.body
            })      
        },
        AC_GenerateRoutes({ commit }, user) {
            return new Promise(resolve => {//romise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
              const accessedRouters = filterAsyncRouter(asyncRouterMap, user)
              commit('SET_ROUTERS', accessedRouters)
              console.log("AC_GenerateRoutes",user,accessedRouters);
              resolve(accessedRouters)
            })
        },
        AC_Logout({ dispatch, commit }) {
          return logout().then(response => {
            commit("CLEAR_USER_INFO") 
          })
        },
        AC_Redirect2Login({ dispatch, commit }, targetUrl) {
               return dispatch('AC_Logout').then(response => {
                window.location.href = `#/login?targetUrl=${targetUrl?encodeURIComponent(targetUrl):encodeURIComponent(window.location.href)}`
                window.location.reload()
            })
        },
        AC_REGISTER({ dispatch, commit }, payload) {
          return register(payload).then(response => {
            window.location.reload()
        })
        },
    },
    getters:{
        // getState(state){
        //     return state.count>0?state.count:0;
        // }
    }
})

export default store