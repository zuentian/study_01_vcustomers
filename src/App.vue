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
          <router-link to="/login"><a class="navbar-brand">用户管理登陆系统</a></router-link>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/">主页</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/addressListAdd">城市列表</router-link></li>
            <li><router-link to="/dict">数据字典</router-link></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
             <!-- <li>
                <div v-if="userInfo" class="avatar-wrapper">
                 <img class="user-avatar" :src="userInfo.avatar | compressImage(80,80)">
                 <span>{{userInfo.name}}</span>
                 <i class="el-icon-arrow-down"></i>
                </div>
             </li> -->
             <li>
               
               
            <span  style="display:block;">退出</span>
              </li>            
            <li><router-link to="/addMovie">添加电影</router-link></li>
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
//import UpdownFile from './components/UpdownFile'
//import EchartsShow from './components/EchartsShow'
import AddMovie from './components/AddMovie'
//import Login from './components/Login'
import MovieInfo from './components/MovieInfo'
import UpdateMovie from './components/UpdateMovie'
import MovieDetail from './components/MovieDetail'
import MoviePicture from './components/MoviePicture'
import MovieReport from './components/MovieReport'
import MovieReport1 from './components/MovieReport1'
import Dict from './components/Dict'
import { mapGetters } from 'vuex'


export default {
  name: 'App',
  components: {
    Customers,About,Add,CustomerDetails,Edit,
    AddressListAdd,AddMovie,MovieInfo,
    UpdateMovie,MovieDetail,MoviePicture,MovieReport,MovieReport1,Dict//,Login
  },
  computed: {
    ...mapGetters([
      //'userInfo'
    ])
  },
}
</script>

<style>
body {  padding-top: 30px; padding-bottom: 120px;}
</style>
