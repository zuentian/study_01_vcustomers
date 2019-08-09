// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Customers from './components/Customers'
import About from './components/About'
import VueResource from 'vue-resource'
import Routes from './routes'
import $ from 'jquery'
import './icon'
import Vuex from 'vuex'

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'

import store from './store'//状态管理

import NProgress from 'nprogress'//进度条
import 'nprogress/nprogress.css'



Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.prototype.$echarts=echarts

Vue.prototype.HOST = '/api'
//设置路由
const router =new VueRouter({
  //这种history模式不能刷新，一刷新，然后就找不到页面，
  //要有当前页面的刷新功能，还要有直接通过链接跳转到指定页面的功能，显然history模式是不符合要求的，所以还得用hash模式
  //mode:"history",//去掉#
  base:__dirname,//当前路径
  routes:Routes
})


router.beforeEach((to,from,next)=>{
  NProgress.start()
  console.log("to",to)

  if (/\/http/.test(to.path)) {// http直接跳到 bn
    let url = to.path.split('http')[1]
    console.log("url",url);
    window.location.href = `http${decodeURIComponent(url)}`
} {

  /*
  process.env可以获取系统的环境信息，比如不同的服务器，可以设置不同的NODE_ENV，然后根据NODE_ENV处理不同的需求，也能设置响应的地址和端口
  */
  //console.log("process.env.BUILD_ENV",process.env.BUILD_ENV)
  if (process.env.WHITE_LIST.indexOf(to.path) !== -1) { // 是否在白名单内,设置white_list里的值，可以让/login不会校验
    next()
  } else{
    console.log("userInfo",store.state.userInfo);
    if(!store.state.userInfo){//如果内存里没有userInfo，可以根据Token值获取用户信息
      store.dispatch('AC_GetUserInfo').then(user => {
        return store.dispatch('AC_GenerateRoutes', user)
      }).then((routers) => {
        //router.addRoutes(routers)
        next({...to, replace: true})
      }).catch(err => {
        console.log('错误就跳转登录页面');
        store.dispatch('AC_Redirect2Login')
      })
    }else {// 存在说明登录正常跳转
      next()
    }
  }
}

})

router.afterEach(()=>{
  NProgress.done()
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router : router,
  store:store//注入store
})
