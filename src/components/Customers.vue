<template>

  <div class="customers  container">

    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <h1 class="page-header">用户管理系统</h1>
    <input type="text" class="form-control" placeholder="搜索" v-model="filterInput">
    <br>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer,index) in filterBy(customers,filterInput) " :key="index">
          <td>{{customer.userName}}</td>
          <td>{{customer.numberPhone}}</td>
          <td>{{customer.email}}</td>
          <td><router-link class="btn btn-default" v-bind:to="'/customer/'+customer.userId">详情
          </router-link></td>
        </tr>
      </tbody>
    </table>

    <div class="pager" id="pager">
      <span class="form-inline">
        <select name="" id="" class="form-control" v-model="pagesize" v-on:change="showPage(pageCurrent,$event,true)" number>
          
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>

        </select>
        <span v-for="(item,index) in pageCount" :key="index">
          <a v-if="item==1" class="btn btn-default" v-on:click="showPage(1,$event)" :class="{'disabled':fDisabled}">
            首页</a>
          <a v-if="item==1" class="btn btn-default" v-on:click="showPage(pageCurrent-1,$event)" :class="{'disabled':fDisabled}">
            上一页</a>


          <span v-if="item==1" class="btn btn-default" 
           v-on:click="showPage(item,$event)">
            {{item}}
          </span>
          
          <a v-if="item==1&&item<showPagesStart-1" class="btn btn-default disabled" >
            ...
          </a>
          <span v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd&&item<=pageCount" 
          v-on:click="showPage(item,$event)"
          class="btn btn-default" >
            {{item}}
          </span>
          <a v-if="item==pageCount&&item>showPageEnd+1" class="btn btn-default disabled" >
            ...
          </a>
          <span v-if="item>1&&item==pageCount" class="btn btn-default" v-on:click="showPage(item,$event)">
            {{item}}
          </span>

          <a v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCurrent+1,$event)" :class="{'disabled':lDisabled}">
            下一页</a>
          <a v-if="item==pageCount" class="btn btn-default"  v-on:click="showPage(pageCount,$event)" :class="{'disabled':lDisabled}">
            尾页</a>
        </span>
        <span class="form-inline">
          <input type="text" style="width:60px;text-align:center" class="pageIndex form-control"/>
        </span>
        
      </span>
    </div>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'customers',
  data () {
    return {
      customers:[],
      alert:"",
      filterInput:"",
      //总项目数
      totalCount:200,
      //分页数
      pageCount:20,
      //当前页面
      pageCurrent:1,
      //分页大小
      pagesize:5,
      //显示分页按钮数
      showPages:5,
      //开始显示的分页按钮
      showPagesStart:1,
      //结束显示的分页按钮
      showPageEnd:5,
      fDisabled:false,
      lDisabled:false,

    }
  },
  methods:{
      fetchCustomers(pageCurrent,pagesize){
        this.$http.post('/api/selectUser',{
          page:pageCurrent,
          pageSize:pagesize,
        }).then(function(response){
          this.customers=response.body.list;
          this.pageCurrent=pageCurrent;
          console.log(pageCurrent);
          this.pageCount=response.body.pages;
          this.totalCount=response.body.total;
          console.log("查询结束："+this.pageCurrent+"------"+this.pageCount);


        //样式，一旦当前页数是第一页，首页和上一页无法点击，当前页数是最大页数，下一页和尾页就无法点击
        //该样式放在调取数据之后，比较容易控制 
        if(this.pageCount===1){
           this.fDisabled=true;
           this.lDisabled=true;
        }else if(this.pageCurrent===1){//span标签虽然加了span，但依然阻止不了单击事件，所以用了a标签
          
          this.lDisabled=false;
          this.fDisabled=true;
        }else if(this.pageCurrent===this.pageCount){
          
          this.fDisabled=false;
          this.lDisabled=true;
        }else{
          this.fDisabled=false;
          this.lDisabled=false;
        }
        
          
        })
      },
      filterBy(customers,value){
        return customers.filter(function(customer){
          return customer.userName.match(value);
        })
      },
      showPage:function(pageIndex,$event,forceRefresh){
        //调整分页大小，当前页数如果超出了最大页数，将当前页数调整为最大页数
        if(pageIndex>Math.ceil(this.totalCount/this.pagesize)){
          pageIndex=Math.ceil(this.totalCount/this.pagesize);
        }

        var buttons=$("#pager").find("span");
        for(var i=0;i<buttons.length;i++){
          if(buttons.eq(i).html()!=pageIndex){
            buttons.eq(i).removeClass("active");
          }else{
            buttons.eq(i).addClass("active");
          }
        }
        this.pageCurrent=pageIndex;
       
        //计算分页按钮数据
        if(this.pageCount>this.showPages){

          if(pageIndex<=(this.showPages-1)/2){
            this.showPagesStart=1;
            this.showPageEnd=this.showPages-1;
            
          }else if(pageIndex>=this.pageCount-(this.showPages-3)/2){
            this.showPagesStart=this.pageCount-this.showPages+2;
            this.showPageEnd=this.pageCount;
          }else{
            this.showPagesStart=pageIndex-(this.showPages-3)/2;
            this.showPageEnd=pageIndex+(this.showPages-3)/2;
          }
        }
        this.fetchCustomers(pageIndex,this.pagesize);

         

      }
  },
  // created(){
  //   if(this.$route.query.alert){
  //     this.alert=this.$route.query.alert;
  //   }
  //   this.fetchCustomers(this.pageCurrent,this.pagesize);
  // },
  mounted(){
    this.showPage(this.pageCurrent,null,true);
  },
  components:{
    Alert
  }
}
</script>

<style scoped>

</style>
