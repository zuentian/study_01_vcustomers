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

import store from './store'


Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Vuex)

//设置路由
const router =new VueRouter({
  mode:"history",//去掉#
  base:__dirname,//当前路径
  routes:Routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router : router,
  store:store//注入store
})
