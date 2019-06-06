<template>
  <div class="details container">

    <router-link to="/" class="btn btn-default">返回</router-link>
      <h1 class="page-header">
          {{customer.userName}}

          <span class="pull-right">
              <router-link v-bind:to="'/edit/'+customer.userId" class="btn btn-primary">编辑</router-link>
              <button class="btn btn-danger" v-on:click="deleteCustomer(customer.userId)">删除</button>
          </span>

          
        </h1>
      <ul class="list-group">
          <li class="list-group-item">
              <span class="glyphicon glyphicon-earphone">
                  {{customer.numberPhone}}</span></li>
          <li class="list-group-item">
              <span class="glyphicon glyphicon-envelope">
                  {{customer.email}}</span></li>
      </ul>
      <ul class="list-group">
          <li class="list-group-item">
              <span class="glyphicon glyphicon-education">
                  {{customer.education}}</span></li>
          <li class="list-group-item">
              <span class="glyphicon glyphicon-tasks">
                  {{customer.graduationSchool}}</span></li>
          <li class="list-group-item">
              <span class="glyphicon glyphicon-briefcase">
                  {{customer.profession}}</span></li>
          <li class="list-group-item">
              <span class="glyphicon glyphicon-paperclip">
                  {{customer.profile}}</span></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'customerdetails',
  data () {
    return {
      customer:""
    }
  },
  methods:{
      fetchCustomers(userId){
        this.$http.get('/api/selectUserByUserId?userId='+userId).then(function(response){
          this.customer=response.body;
        })
      },
      deleteCustomer(userId){
           this.$http.get('/api/deleteUserByUserId?userId='+userId).then(function(response){
          
          this.$router.push({path:"/",query:{alert:"用户删除成功！"}});
        })
      }
  },
  created(){
      this.fetchCustomers(this.$route.params.userId);
  }
}
</script>

<style scoped>

</style>
