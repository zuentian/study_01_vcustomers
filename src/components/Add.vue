<template>
  <div class="add container">

      <Alert v-if="alert" v-bind:message="alert">

      </Alert>
      <h1 class="page-header">添加用户</h1>
      <form v-on:submit="addCustomer">
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
              <div>
                  
                  
                     <label for="">家庭地址</label>
                        
                        <el-checkbox-group v-model="customer.checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in customer.cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                   <div style="margin: 15px 0;"></div>
                   
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
              <button type="submit" class="btn btn-primary">添加</button>
          </div>
      </form>

  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
import Alert from './Alert'
export default {
  name: 'add',
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

            checkedCities: [],
             cities: cityOptions,
                isIndeterminate: true,
        },
        alert:""
      
    }
  },methods:{
      addCustomer(e){
          if(!this.customer.userName||!this.customer.numberPhone||!this.customer.email){
              this.alert="请添加对应的信息！";
          }else{
              this.$http.post("/api/addUser",{
                  customer:this.customer
              }).then(function(response){
                   if(response.ok){
                        this.$router.push({path:"/",query:{alert:"用户信息添加成功！"}});
                   }else{
                       alert("添加用户失败！");
                   }
                  
              })
          }
          e.preventDefault();
      },
      handleCheckedCitiesChange(value) {
        // let checkedCount = value.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
  },
  components:{
    Alert
  }
}
</script>

<style scoped>

</style>
