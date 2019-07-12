<template>
  <div id="app">
  <nav class="navbar navbar-inverse navbar-fixed-top">
  <!--<nav class="navbar navbar-inverse">-->
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/login">用户管理系统</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/">主页</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/addressListAdd">城市列表</router-link></li>
             <li><router-link to="/updownFile">文件上传</router-link></li>
             <li><router-link to="/echartsShow">Echarts展示</router-link></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/add">添加用户</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Customers from './components/Customers'
import About from './components/About'
import Add from './components/Add'
import CustomerDetails from './components/CustomerDetails'
import Edit from './components/Edit'
import AddressListAdd from './components/AddressListAdd'
import UpdownFile from './components/UpdownFile'
import EchartsShow from './components/EchartsShow'
//import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Customers,About,Add,CustomerDetails,Edit,AddressListAdd,UpdownFile,EchartsShow//,Login
  }
}
</script>

<style>
body {  padding-top: 30px; padding-bottom: 120px;}
</style>
