<template>
<div class="echartsShow container">
 <div  id='test' :style="{width:'500px',height:'300px'}">
 </div>
  <div  id='monthMovieCount' :style="{width:'500px',height:'300px'}">
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
  name: 'echartsShow',
  data () {
    return {
        monthMovieCountData:{
            categories:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
            data:[5, 20, 36, 10, 10, 20]
        }
    }
  },methods:{
      drawLineMovieType(){
        // 基于准备好的dom，初始化echarts实例
        let testChart = this.$echarts.init(document.getElementById('test'));
        // 绘制图表
        //movieTypeChart.resize();//调整页面，没有效果
        testChart.setOption({
           // backgroundColor: '#2c343c',//背景色
            // visualMap: {//明暗对比，貌似没什么用
            //     show: false,//true旁边会显示条形，false不显示
            //     min: 80,
            //     max: 600,
            //     inRange: {
            //          colorLightness: [0, 1]
            //     }
            // },
            title: {
                text: 'echarts案例（非真实数据）',
                left:'center'//这个是让标题居中，很奇怪！！！
                },
            series : [
                    {
                    name: '访问来源',
                    type: 'pie',//表示类型，饼状图
                    radius: '50%',
                    center:['50%','50%'],//图表的位置
                    data:[
                        {value:235, name:'视频广告'
                        //,itemStyle:{color:'#16de13'}//这个可以给每个扇形设置颜色，如果是动态的，后端应该需要传颜色过来，否则自动生成
                        },
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ],
                    //roseType: 'angle',//南丁格尔图，就是每个扇形的半径不一样
                    label: {//注释的颜色
                        normal: {
                            textStyle: {
                                //color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {//引导线颜色
                        normal: {
                            lineStyle: {
                                //color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    /*itemStyle: {//设置扇形的颜色
                        normal: {
                            //color: '#c23531',//删除之后，颜色应该是默认的，不删除，会采用明暗对比，颜色逐渐变浅（深）
                            shadowBlur: 100,//阴影大小
                            shadowColor: 'rgba(0, 255, 255, 0.5)'//更改会让图形的周围颜色变亮。阴影颜色
                        },
                        emphasis: {//鼠标的高亮样式
                            shadowBlur: 200,
                            shadowColor: '#ef0c36'
                            }
                    }*/
                }
            ]
        });
        //window.onresize = movieTypeChart.resize();本想自适应，但是没有用
        //window.onresize = function () {myChart.resize();}
      },
    //   init() {
    //          const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
    //          setTimeout(() => {
    //             window.onresize = function() {
    //                 self.chart = echarts.init(self.$refs.movieTypeChart);
    //                 self.chart.resize();
    //             }
    //          },20)
    //     }
    
    drawMonthMovieCount(){
        let monthMovieCountChart = this.$echarts.init(document.getElementById('monthMovieCount'));
        monthMovieCountChart.setOption({
            title:{
                text:'月观影量',
                //left:'center'
            },
            tooltip:{},
            legend:{data:['观影量']},
            xAxis:{
                data:[]
            },
            yAxis:{},
            series:[{
                name:'观影量',
                type:'bar',
                data:[]
            }]
        });
        monthMovieCountChart.showLoading();
        this.$http.get('/api/MovieDataShow/getMonthMovieCount').then(function(response){
          monthMovieCountChart.hideLoading();
            monthMovieCountChart.setOption({
                xAxis:{
                    data:this.monthMovieCountData.categories
                },
                series:[{
                    name:'观影量',
                    data:this.monthMovieCountData.data
                }]
            })
        }).catch((err) => {
            this.$store.commit('SHOW_ERROR_TOAST', '月观影量获取失败！！')        
        }).finally(() => {
            this.loading = false
        })
    },
  },
  created(){
     
  },mounted(){
    this.drawLineMovieType();
    this.drawMonthMovieCount();
    //this.init();
  },
}
</script>

<style scoped>
.echartsShow{
    margin:50px auto;
    text-align:center;
    width:50%;
}
</style>
