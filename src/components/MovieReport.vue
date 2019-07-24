<template>
  <div class="movieReport container">

  <div  id='movieTypeCount' :style="{width:'500px',height:'300px'}">
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


export default {
  name: 'movieReport',
  data () {
    return {
      
    }
  },
  methods:{
    drawLineMovieType(){
      let movieTypeCountChart = this.$echarts.init(document.getElementById('movieTypeCount'));
      movieTypeCountChart.setOption({
      series : []
      })
      movieTypeCountChart.showLoading();
      this.$http.get('/api/MovieDataReport/getMovieTypeCount').then(function(response){
        console.log(response);
        movieTypeCountChart.hideLoading();
          movieTypeCountChart.setOption({
              series:[{
                  name:'各个电影类型数量',
                  type: 'pie',
                  radius: '55%',
                  roseType: 'angle',
                  data:response.body.data,
              }]
          })
      }).catch((err) => {
          this.$store.commit('SHOW_ERROR_TOAST', '电影类型获取失败！！')        
      }).finally(() => {
          this.loading = false
      })
    }
  },
  mounted(){
    this.drawLineMovieType();
  }
}
</script>

<style scoped>
.movieReport{
    margin:50px auto;
    text-align:center;
    width:50%;
}
</style>
