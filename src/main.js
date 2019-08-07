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
  mode:"history",//去掉#
  base:__dirname,//当前路径
  routes:Routes
})


router.beforeEach((to,from,next)=>{
  NProgress.start()
  console.log("to",to)
  /*
  process.env可以获取系统的环境信息，比如不同的服务器，可以设置不同的NODE_ENV，然后根据NODE_ENV处理不同的需求，也能设置响应的地址和端口
  */
  //console.log("process.env.WHITE_LIST",process.env.WHITE_LIST)
  //console.log("process.env.BUILD_ENV",process.env.BUILD_ENV)
  //if (process.env.WHITE_LIST.indexOf(to.path) !== -1) { // 是否在白名单内
    //next()
  //} 
  if(!store.state.userInfo){

  }
  next()
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
