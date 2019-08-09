<template>
  <div class="movieReport1 container">
     <div class="button">
        <el-button class="rollback" type="primary" icon="el-icon-d-arrow-left" plain @click="rollback">返回</el-button>
      </div>
      <div  id='movieDBScore'  :style="{width:'100%',height:'400%'}" >
      </div>

      <div>
        <el-drawer  :loading="showTableLoading"  :title="scoreStartAndEnd+'分段内'+showSeriesName+'详细信息'" :style="{'font-size':'20px'}" :visible.sync="showTable" direction="rtl" size="30%"> 
          
         
          <el-table :data="movieData" height="800px">
            <el-table-column  type="index" width="50"> </el-table-column>
            <el-table-column property="movieName" label="电影名字" width="250"></el-table-column>
            <el-table-column property="movieCountry" label="电影制片地区" width="150"></el-table-column>
            <el-table-column property="movieDBScore" label="电影豆瓣评分"></el-table-column>
          </el-table>
        </el-drawer>
      </div>

  </div>
</template>

<script>

// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
//引入右上角下载图片等等一系列的toolbox的功能
require('echarts/lib/component/toolbox')

require('echarts/theme/dark.js')
require('echarts/theme/infographic')
require('echarts/theme/shine')
require('echarts/theme/vintage')

require('echarts/theme/roma')



export default {
  name: 'about',
  data () {
    return {
      DBScoreIndex:"",
      countryIndex:"",
      showTableLoading:false,
      showTable:false,
      scoreStartAndEnd:"",
      showSeriesName:"",
      movieData:[],
      series:[],
    }
  },
  methods:{
    rollback(){
       this.$router.push({ path: '/' });
    },
    drawLineMovieCountryCount(){
       let movieDBScoreChart = this.$echarts.init(document.getElementById('movieDBScore'),'dark');
       movieDBScoreChart.setOption({
              title : {
                text: '各个评分分段电影数量',
                subtext: '',
                textStyle :{
                      fontSize  :24,
                } 
              },
              tooltip : {
                 // trigger: 'axis'
              },
              toolbox: {//可以实现保存、还原、改变成折线图或者柱状图
                show : true,
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              
       })
       movieDBScoreChart.showLoading();
       this.$http.post('/api/MovieDataReport/getMovieDBScoreCount',{}
       ).then(function(response){
         console.log(response);
         for(var i=0;i<response.body.movieCountryArray.length;i++){
          this.series.push({
            name:response.body.movieCountryArray[i],
                  type:'bar',
                  //barWidth:'50%',
                  markPoint : {
                    data : [
                        {type : 'max', name: '最大值',symbolSize:60},
                        {type : 'min', name: '最小值',symbolSize:60}
                    ]
                  },
                  markLine : {
                      data : [
                          {type : 'average', name: '平均值'}
                      ]
                  },
                  data:response.body.movieValueArray[i],
          });
          
         }
         console.log(this.series);
         movieDBScoreChart.setOption({
           
                legend: {
                    data:response.body.movieCountryArray
                },
                calculable : true,
                xAxis : [{
                    type : 'category',
                    data : response.body.movieScoreArray
                }],
                yAxis : [{
                    type : 'value'
                }],
                series:this.series,
                // series : [{
                //   name:'全球电影',
                //   type:'bar',
                //   //barWidth:'50%',
                //   markPoint : {
                //     data : [
                //         {type : 'max', name: '最大值',symbolSize:60},
                //         {type : 'min', name: '最小值',symbolSize:60}
                //     ]
                //   },
                //   markLine : {
                //       data : [
                //           {type : 'average', name: '平均值'}
                //       ]
                //   },
                //   data:response.body.value0,
                // },
                // {
                //   name:'中国大陆电影',
                //   type:'bar',
                //   //barWidth:'50%',
                //   markPoint : {
                //     data : [
                //         {type : 'max', name: '最大值',symbolSize:60},
                //         {type : 'min', name: '最小值',symbolSize:60}
                //     ]
                //   },
                //   itemStyle:{
                //   //通常情况下：
                //     normal:{  
                //         color: '#B5C334',
                //       }
                //   },
                //   //鼠标悬停时：
                //   emphasis: {
                //       shadowBlur: 10,
                //       shadowOffsetX: 0,
                //       shadowColor: 'rgba(0, 0, 0, 0.5)'
                //   },
                //   markLine : {
                //       data : [
                //           {type : 'average', name: '平均值'}
                //       ]
                //   },
                //   data:response.body.value1,
                // },
                // {
                //   name:'美国电影',
                //   type:'bar',
                //   //barWidth:'50%',
                //   markPoint : {
                //     data : [
                //         {type : 'max', name: '最大值',symbolSize:60},
                //         {type : 'min', name: '最小值',symbolSize:60}
                //     ]
                //   },
                //   itemStyle:{
                //   //通常情况下：
                //     normal:{  
                //         color: '#0cec53',
                //       }
                //   },
                //   //鼠标悬停时：
                //   emphasis: {
                //       shadowBlur: 10,
                //       shadowOffsetX: 0,
                //       shadowColor: 'rgba(0, 0, 0, 0.5)'
                //   },
                //   markLine : {
                //       data : [
                //           {type : 'average', name: '平均值'}
                //       ]
                //   },
                //   data:response.body.value2,
                // },
                // {
                //   name:'日本电影',
                //   type:'bar',
                //   //barWidth:'50%',
                //   markPoint : {
                //     data : [
                //         {type : 'max', name: '最大值',symbolSize:60},
                //         {type : 'min', name: '最小值',symbolSize:60}
                //     ]
                //   },
                //   itemStyle:{
                //   //通常情况下：
                //     normal:{  
                //         color: '#e00a56',
                //       }
                //   },
                //   //鼠标悬停时：
                //   emphasis: {
                //       shadowBlur: 10,
                //       shadowOffsetX: 0,
                //       shadowColor: 'rgba(0, 0, 0, 0.5)'
                //   },
                //   markLine : {
                //       data : [
                //           {type : 'average', name: '平均值'}
                //       ]
                //   },
                //   data:response.body.value3,
                // },
                // {
                //   name:'韩国电影',
                //   type:'bar',
                //   //barWidth:'50%',
                //   markPoint : {
                //     data : [
                //         {type : 'max', name: '最大值',symbolSize:60},
                //         {type : 'min', name: '最小值',symbolSize:60}
                //     ]
                //   },
                //   itemStyle:{
                //   //通常情况下：
                //     normal:{  
                //         color: '#0d17f9',
                //       }
                //   },
                //   //鼠标悬停时：
                //   emphasis: {
                //       shadowBlur: 10,
                //       shadowOffsetX: 0,
                //       shadowColor: 'rgba(0, 0, 0, 0.5)'
                //   },
                //   markLine : {
                //       data : [
                //           {type : 'average', name: '平均值'}
                //       ]
                //   },
                //   data:response.body.value4,
                // }
                // ]
         
         })
         let that=this;
         movieDBScoreChart.on('click',function (params) {
           //console.log("params",params);
           if(params.componentType=="series"){
             that.scoreStartAndEnd=params.name;
             that.showSeriesName=params.seriesName;
             that.showTable=true;
             that.showTableLoading=true;
             that.DBScoreIndex=params.dataIndex;
             that.countryIndex=params.componentIndex;
             that.$http.post("/api/MovieDataReport/getMovieDBScoreDetailInfo",{
                countryIndex:that.countryIndex,
                DBScoreIndex:that.DBScoreIndex,
             }).then(res=>{
               that.movieData=res.body;
             }).catch(err=>{
               that.$store.commit('SHOW_ERROR_TOAST', err.body.message)  ;     
             }).finally(() => {
               this.showTableLoading=false;
             })

           }
           

         })
       }).catch((err) => {
          this.$store.commit('SHOW_ERROR_TOAST', '电影评分数量获取失败！！')        
       }).finally(() => {
          movieDBScoreChart.hideLoading();
       })

    },
  },
  mounted(){
    this.drawLineMovieCountryCount();
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"   scoped>
.movieReport1{
     margin:21px auto;
    
}
.el-drawer{
/deep/  .el-drawer__header span {
    
  font-size: 30px !important;
}
}

</style>
