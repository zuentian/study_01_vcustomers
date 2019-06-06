<template>
  <div class="add container">
      <h1 class="page-header">城市列表</h1>
      <h4>新增城市</h4>
       <el-input type="text" v-bind:style="{'width':width+'%','border':border,'border-radius':radius}" placeholder="请输入一级城市" v-model.trim="first"  >
      </el-input>
      <el-input type="text" v-bind:style="{width:width+'%'}" placeholder="请输入二级城市" v-bind:disabled="secondFlag" v-model.trim="second" required >
      </el-input>
      <el-input type="text" v-bind:style="{width:width+'%'}" placeholder="请输入三级城市" v-bind:disabled="thridFlag" v-model.trim="thrid"  >
      </el-input>
      <button type="submit" class="btn btn-primary" v-on:click="addAddressList">添加</button> 
      
      
      <div class="block">
        <h4>城市展示</h4>
        <el-cascader v-model="value" :options="options"  
        expand-trigger="hover"
         @change="handleChange">
        </el-cascader>
      </div>
  </div>
</template>
<script>
export default {
  name: 'add',
  data () {
    return {
      width:30,
      first:"",
      second:"",
      thrid:"",
      secondFlag:true,
      thridFlag:true,
      border:"",
      radius:"",
      options:[],
      value:[]
    }
  },methods:{
      addAddressList(){
          
          if(this.first==""){
              this.border="red 2px solid";
              this.radius="5px";
          }else{
              
              this.$http.post("/api/addAddressList",{
                 first:this.first,
                 second:this.second,
                 thrid:this.thrid
              }).then(function(response){
                  //console.log(response);
                  if(response.bodyText=="success"){
                    this.$message({
                            message: '添加成功！',
                            type: 'success'
                    });
                    this.query();
                  }else if(response.bodyText=="repeat"){
                    this.$message({
                            message: '添加重复！',
                            type: 'warning'
                    });
                  }else{
                    this.$message.error('添加失败');
                  }
              })
          }
          
      },
      query(){
        this.$http.post("/api/queryAddressList",{}).then(function(response){
          //console.log(response.body);
          //this.options=this.clearChildren(response.body);
          this.options=response.body;
        })
      },
      //清除末尾空的children,现处理已放在后端
      clearChildren(arr){
        for(let i=0;i<arr.length;i++){
          if(!arr[i].children.length){
            arr[i].children=null;
          }else{
            this.clearChildren(arr[i].children);
          }
        }
        return arr;
      },
      handleChange(value) {
        console.log(value);
      }
      
  },
  watch:{
      'first':function(newVal){
          if(newVal!=""){
              this.secondFlag=false;
          }else{
              this.secondFlag=true;
              this.second="";
          }
          if(newVal!=""){
              this.border="";
              this.radius="";
          }
      },
      'second':function(newVal){
          if(newVal!=""){
              this.thridFlag=false;
          }else{
              this.thridFlag=true;
              this.thrid="";
          }
      }
  },
  mounted(){
    this.query();
  }
}
</script>

<style scoped>

</style>
