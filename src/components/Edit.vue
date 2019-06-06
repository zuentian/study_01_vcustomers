<template>
  <div class="edit container">
<Alert v-if="alert" v-bind:message="alert">

      </Alert>
      <h1 class="page-header">编辑用户</h1>
      <form v-on:submit="updateCustomer">
          <div class="well">
              <h4>用户信息</h4>
              <div class="form-group">
                  <label for="">姓名</label>
                  <input type="text" class="form-control" placeholder="userName" v-model="
                  customer.userName">
              </div>
              <div class="form-group">
                  <label for="">电话</label>
                  <input type="text" class="form-control" placeholder="numberPhone" v-model="
                  customer.numberPhone">
              </div>
              <div class="form-group">
                  <label for="">邮箱</label>
                  <input type="text" class="form-control" placeholder="email" v-model="
                  customer.email">
              </div>
              <div class="form-group">
                  <label for="">学历</label>
                  <input type="text" class="form-control" placeholder="education" v-model="
                  customer.education">
              </div>
              <div class="form-group">
                  <label for="">毕业学校</label>
                  <input type="text" class="form-control" placeholder="graduationSchool" v-model="
                  customer.graduationSchool">
              </div>
              <div class="form-group">
                  <label for="">职业</label>
                  <input type="text" class="form-control" placeholder="profession" v-model="
                  customer.profession">
              </div>
              <div class="form-group">
                  <label for="">个人简介</label>
                  <textarea class="form-control" rows="10" placeholder="请简要地说明！"  v-model="
                   customer.profile"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">编辑</button>
          </div>
      </form>

  </div>
</template>

<script>

import Alert from './Alert'
export default {
  name: 'edit',
  data () {
    return {
        customer:{
            userName:"",  
            numberPhone:"", 
            email:"", 
            education:"", 
            graduationSchool:"", 
            profession:"", 
            profile:"", 
        },
        alert:""
      
    }
  },methods:{
      fetchCustomer(userId){
        this.$http.get('/api/selectUserByUserId?userId='+userId).then(function(response){
          this.customer=response.body;
        })
      },
      updateCustomer(e){
          if(!this.customer.userName||!this.customer.numberPhone||!this.customer.email){
              this.alert="请添加对应的信息！";
          }else{
              this.$http.post("/api/editByUserId",{
                  customer:this.customer
              }).then(function(response){
                   if(response.ok){
                        this.$router.push({path:"/",query:{alert:"用户信息编辑成功！"}});
                   }else{
                       alert("编辑用户失败！");
                   }
                  
              })
          }
          e.preventDefault();
      }
  },
  created(){
      this.fetchCustomer(this.$route.params.userId);
  },
  components:{
    Alert
  }
}
</script>

<style scoped>

</style>
