<template>
  <div class="movieReport container">
    
      <div  id='movieTypeCount'  :style="{width:'100%',height:'400%'}" >
      </div>
      <div id="movieCountryCount" :style="{width:'100%',height:'400%'}">

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
  name: 'movieReport',
  data () {
    return {
      movieTypeData:"",
      selectMovieTypeNowIndex:-1,
      selectMovieTypeBeforeIndex:-1,
    }
  },
  methods:{
    //画电影类型的图表
    drawLineMovieType(){
      let movieTypeCountChart = this.$echarts.init(document.getElementById('movieTypeCount'),'infographic');
      movieTypeCountChart.setOption({
        title: {
                  text: '电影类型数量占比图(单位：部)',
                  left:'center',//这个是让标题居中，很奇怪！！！
                  textStyle :{
                      fontSize  :24,
                  } 
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        
        calculable:true,
        series : [],
      
      })
      movieTypeCountChart.showLoading();
      this.$http.post('/api/MovieDataReport/getMovieTypeCount',
      {
        selectShowMax:5,
      }
      ).then(function(response){
        //console.log(response);
        this.movieTypeData=response.body.data;
        movieTypeCountChart.hideLoading();
          movieTypeCountChart.setOption({
            
              legend: {
                  orient : 'vertical',
                  x : 'left',
                  data:response.body.data.name,
                  selected:response.body.selectShowMap,
              },
              series:[{
                  name:'电影类型',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  //roseType: 'angle',
                  data:this.movieTypeData,
                  label: {
                      normal: {
                      show: true,
                      textStyle: {
                          fontSize: 20,
                          fontStyle :'normal',
                          fontFamily :'Microsoft YaHei'
                        }
                      },
                  },
                  labelLine: {
                    lineStyle: {
                        //color: 'rgba(255, 255, 255, 0.3)',
                        //type:'dotted',
                        //curveness :0.9
                    },
                    length:60 
                  },

              }],
          })
      }).catch((err) => {
          this.$store.commit('SHOW_ERROR_TOAST', '电影类型获取失败！！')        
      }).finally(() => {
          movieTypeCountChart.hideLoading();
      })
      let that = this;//不用这个转换一下就无法获取到data里的数据，理由是this的指向变了,用箭头函数,或者用一个变量缓存this
      movieTypeCountChart.on('click',function (params) {//此处点击之后扇形会分开，也会合上
          that.selectMovieTypeBeforeIndex=that.selectMovieTypeNowIndex;
          that.selectMovieTypeNowIndex=params.dataIndex;
          if(that.selectMovieTypeNowIndex>=0){
            if(that.movieTypeData[that.selectMovieTypeNowIndex].selected){//当点击现在的扇形，会合上或者关上
                that.$set(that.movieTypeData[that.selectMovieTypeNowIndex], 'selected', false)
            }else{
                that.$set(that.movieTypeData[that.selectMovieTypeNowIndex], 'selected', true)
            }
          }
          if(that.selectMovieTypeBeforeIndex>=0){
            if(that.movieTypeData[that.selectMovieTypeBeforeIndex].selected){
                that.$set(that.movieTypeData[that.selectMovieTypeBeforeIndex], 'selected', false)
            }else{
                that.$set(that.movieTypeData[that.selectMovieTypeBeforeIndex], 'selected', true)
            }
          }
          if(that.selectMovieTypeBeforeIndex==that.selectMovieTypeNowIndex){//当点击一个已经开过的扇形就会合上
            if(that.movieTypeData[that.selectMovieTypeNowIndex].selected){
                that.$set(that.movieTypeData[that.selectMovieTypeNowIndex], 'selected', false)
                that.selectMovieTypeNowIndex=-1;
            }else{
                that.$set(that.movieTypeData[that.selectMovieTypeNowIndex], 'selected', true)
                that.selectMovieTypeNowIndex=-1;
            }
          }
          movieTypeCountChart.setOption({
                series: [{
                  data: that.movieTypeData
               }]
            })

      });
    },
    //画电影出品地区的图表
    drawLineMovieCountry(){
      let movieCountryChart = this.$echarts.init(document.getElementById('movieCountryCount'),'shine');
      movieCountryChart.setOption({
        title: {
                  text: '电影出品地数量占比图(单位：个)',
                  left:'center',
                  textStyle :{
                      fontSize  :24,
                  } 
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient : 'vertical',
          x : 'right',
          data:["直接访问"],
        },
        calculable:true,
        series : [{
            name:'电影出品地',
            type:'pie',
            radius : [20, 110],
            center : ['50%', '50%'],
            roseType : 'radius',
            width: '40%',       // for funnel
            max: 40, 
            data:[]
        }]
      })
      movieCountryChart.showLoading();
      this.$http.post('/api/MovieDataReport/getMovieCountryCount',{}
      ).then(function(response){

        console.log(response);
        movieCountryChart.hideLoading();
        movieCountryChart.setOption({
          series : [{
            data:[{value:335, name:'直接访问'}]
          }]
        })

      }).catch((err) => {
          this.$store.commit('SHOW_ERROR_TOAST', '电影出品地区获取失败！！')   
               
      }).finally(() => {
          movieCountryChart.hideLoading();
      })




    }
  },
  mounted(){
    this.drawLineMovieType();
    this.drawLineMovieCountry();
  }
}
</script>

<style scoped>
.movieReport{
     margin:21px auto;
    
}
#movieTypeCount{
    margin:21px 0px;
}

#movieCountryCount{
    margin:50px 0px;
}

</style>
