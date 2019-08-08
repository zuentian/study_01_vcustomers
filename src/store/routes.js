import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes as pages } from './pages'
import { Layout } from '@/common/views'

Vue.use(VueRouter)

const rootPath = ''

const routes = [
  {
    name: '401',
    path: '/401',
    hidden: true,
    component: r => require(['@/common/views/error/401'], r)
  },
].map(route => {
  route.path = rootPath + route.path
  return route
})

export const constRouterMap = routes

export const asyncRouterMap = pages.map(item => {
  item.component = Layout
  return item
})

export const router = new VueRouter({
  routes: routes
})
