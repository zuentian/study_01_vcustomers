<template>
<div class="echartsShow container">
 <div  id='movieType' :style="{width:'500px',height:'300px'}">
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
    }
  },methods:{
      drawLineMovieType(){
        // 基于准备好的dom，初始化echarts实例
        let movieTypeChart = this.$echarts.init(document.getElementById('movieType'));
        // 绘制图表
        //movieTypeChart.resize();
        movieTypeChart.setOption({
           // backgroundColor: '#2c343c',//背景色
            visualMap: {//明暗对比，貌似没什么用
                show: false,//true旁边会显示条形，false不显示
                min: 80,
                max: 600,
                inRange: {
                     colorLightness: [0, 1]
                }
            },
            title: {
                text: '您的观影类型',
                left:'center'//这个是让标题居中，很奇怪！！！
                },
            series : [
                    {
                    name: '访问来源',
                    type: 'pie',//表示类型，饼状图
                    radius: '55%',
                    data:[
                        {value:235, name:'视频广告'
                        //,itemStyle:{color:'#16de13'}//这个可以给每个扇形设置颜色，如果是动态的，后端应该需要传颜色过来，否则自动生成
                        },
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ],
                    roseType: 'angle',
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
                    itemStyle: {//设置扇形的颜色
                        normal: {
                            //color: '#c23531',//删除之后，颜色应该是默认的，不删除，会采用明暗对比，颜色逐渐变浅（深）
                            shadowBlur: 100,//阴影大小
                            shadowColor: 'rgba(0, 255, 255, 0.5)'//更改会让图形的周围颜色变亮。阴影颜色
                        },
                        emphasis: {//鼠标的高亮样式
                            shadowBlur: 200,
                            shadowColor: '#ef0c36'
                            }
                    }
                }
            ]
        });
        //window.onresize = movieTypeChart.resize();本想自适应，但是没有用
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
  },
  created(){
     
  },mounted(){
    this.drawLineMovieType();
    //this.init();
  },
}
</script>

<style scoped>
.echartsShow{
    margin:50px auto;
    text-align:center;
}
</style>
