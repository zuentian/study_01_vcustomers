<template>
  
<div class="movieDetail container">
      
      <div class="button">
        <el-button class="rollback" type="primary" icon="el-icon-d-arrow-left" plain @click="rollback">返回</el-button>
        <el-button class="edit" type="primary" icon="el-icon-edit" plain @click="edit">编辑</el-button>
      </div>
      <div>
        <h2> <strong>{{MovieInfo.movieName}}({{titleMovieYear}}) </strong></h2>
      </div>


      <ul class="list-group">
          <li class="list-group-item">
            
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                <span class="svg-container svg-container_login"><svg-icon icon-class="movieEnglishName" font-size="20px"/></span> 
                <span style="font-size:18px;font-family:微软雅黑">电影名：</span>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                <span  v-if="MovieInfo.movieEnglishName==''" :style="rondomColor">{{MovieInfo.movieName}}</span>
                <span  v-else :style="rondomColor">{{MovieInfo.movieName}} / {{MovieInfo.movieEnglishName}}</span>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                <span class="svg-container svg-container_login"><svg-icon icon-class="movieCountry" font-size="20px"/></span> 
                <span style="font-size:18px;font-family:微软雅黑">制片国家/地区：</span>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                <span :style="rondomColor">{{MovieInfo.movieCountry}}</span>
                </div>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                <span class="svg-container svg-container_login"><svg-icon icon-class="movieDate" font-size="20px"/></span> 
                <span style="font-size:18px;font-family:微软雅黑">上映日期：</span>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                <span :style="rondomColor">{{MovieInfo.movieShowTime}}</span>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                <span class="svg-container svg-container_login"><svg-icon icon-class="movieDBScore" font-size="20px"/></span> 
                <span style="font-size:18px;font-family:微软雅黑">豆瓣评分：</span>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                <el-rate :max="10" v-if="this.movieDBScoreValue==0" v-model="movieDBScoreValue" disabled show-score :text-color="movieDBScoreColor" score-template="暂无评分"></el-rate>
                <el-rate :max="10" v-else v-model="movieDBScoreValue" disabled show-score :text-color="movieDBScoreColor" score-template="{value}"></el-rate>
                </div>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                <span class="svg-container svg-container_login"><svg-icon icon-class="movieType" font-size="20px"/></span> 
                <span style="font-size:18px;font-family:微软雅黑">电影类型：</span>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                <span :style="rondomColor">{{movieTypeAll}}</span>
                </div>
                </el-col>
            </el-row>
          </li>
      </ul>

      <ul class="list-group" v-if="this.movieRelPersons.length>0">
          <li class="list-group-item">
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                <span class="svg-container svg-container_login"><svg-icon icon-class="movieRelPerson" font-size="20px"/></span> 
                <span style="font-size:18px;font-family:微软雅黑">电影相关人物：</span>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                <span v-for="(item,index) in movieRelPersons" :key="index">
                  <el-row>
                    <el-col :span="8">
                    <span :style="rondomColor">{{item.movieRelName}}</span>
                    </el-col>
                  </el-row>
                </span>
                </div>
                </el-col>
            </el-row>
          </li>
      </ul>
      
      <ul class="list-group">
          <li class="list-group-item">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                  <span class="svg-container svg-container_login"><svg-icon icon-class="movieContent" font-size="20px"/></span> 
                  <span style="font-size:18px;font-family:微软雅黑">电影简介：</span>
                  </div>
                </el-col>
              </el-row>
              <article :style="rondomColor">
              &emsp;{{MovieInfo.movieContent}} 
              </article>
          </li>
      </ul>
      <ul class="list-group">
          <li class="list-group-item">
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">
              <span class="svg-container svg-container_login"><svg-icon icon-class="movieWatch" font-size="20px"/></span> 
              <span style="font-size:18px;font-family:微软雅黑">我的观影情况：</span>
              </div>
            </el-col>
            <el-col :span="4" v-if="MovieInfo.movieIsWatch">
              <el-tag :style="rondomColor">已观看</el-tag>
            </el-col>
            <el-col :span="4" v-else>
              <el-tag type="info" :style="rondomColor">未观看</el-tag>
            </el-col>
          </el-row>
          
          <el-row v-if="MovieInfo.movieIsWatch">
            <el-col :span="4">
              <div class="grid-content bg-purple">
              <span class="svg-container svg-container_login"><svg-icon icon-class="movieWatchTime" font-size="20px"/></span> 
              <span style="font-size:18px;font-family:微软雅黑">我的观影时间：</span>
              </div>
            </el-col>
            <el-col :span="4">
              <el-tag :style="rondomColor">{{MovieInfo.movieWatchTime}}</el-tag>
            </el-col>
          </el-row>
        </li>
      </ul>

      
      <ul class="list-group" v-if="this.moviePictureInfo.length>0">
          <li class="list-group-item">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                <span class="svg-container svg-container_login"><svg-icon icon-class="picture" font-size="20px"/></span> 
                <span style="font-size:18px;font-family:微软雅黑">电影海报和剧照(<router-link :to="{path:'/moviePicture/'+this.MovieInfo.movieId}">全部图片{{moviePictureInfoBaseCount}}张</router-link>)：
                </span>
                </div>
              </el-col>
            </el-row>
            <el-carousel :interval="4000"  type="card" height="400px">
                  <el-carousel-item v-for="(item,index) in moviePictureInfo" :key="index">
                  <h3 align="center">{{ item.name}}</h3>
                  <img style="width: 100%; height: auto;" :src="item.url" class="image">
                  </el-carousel-item>
            </el-carousel>
          </li>
      </ul>
</div>
</template>

<script>
export default {
  name: 'movieDetail',
  data () {
      return {
          MovieInfo:{
              movieId:"",
              movieName:"",
              movieEnglishName:"",
              movieCountry:"",
              movieTypes:[],
              movieDBScore:"",
              movieContent:"",
              movieShowTime:"",
              movieIsWatch:false,
              movieWatchTime:"",
              movieRelNames: [{
                movieRelName: ''
              }],
           },
           titleMovieYear:"",
           rondomColor:"",
           movieDBScoreValue:0,
           movieDBScoreColor:"",
           movieTypeAll:"",
           movieRelPersons:"",
           moviePictureInfo:[],
           moviePictureInfoBaseCount:"",
      }
  },
  methods:{
    queryMovieDetail(id){
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.get('/api/MovieDataShow/queryMoviDetailByMovieId?movieId='+id).then(res => {
            this.MovieInfo=res.body.MovieBasicInfo;
            this.titleMovieYear=res.body.titleMovieYear;
            this.movieDBScoreValue=res.body.movieDBScoreValue;
            this.movieTypeAll=res.body.movieTypeAll;
            if(res.body.movieRelPersons.length>0){
              this.movieRelPersons=res.body.movieRelPersons;
            }
            this.MovieInfo.movieIsWatch=res.body.movieIsWatch;
            this.MovieInfo.movieWatchTime=res.body.movieWatchTime;
            this.moviePictureInfo=res.body.moviePictureInfoBase;
            this.moviePictureInfoBaseCount=res.body.moviePictureInfoBaseCount;
            //console.log(res.body);
        }).catch((err) => {
            this.$store.commit('SHOW_ERROR_TOAST', err.body.message);
            this.rollback();    
        }).finally(() => {
          loading.close();
        })
    },
    rollback(){
       this.$router.push({ path: '/movieInfo' });
    },
    edit(){
      this.$router.push({path: '/updateMovie/'+this.MovieInfo.movieId});
    }
    
  },
  created(){
      this.MovieInfo.movieId=this.$route.params.movieId;
      this.queryMovieDetail(this.$route.params.movieId);
      var r=Math.floor(Math.random()*256);
      var g=Math.floor(Math.random()*256);
      var b=Math.floor(Math.random()*256);
      this.rondomColor="color:"+"rgb("+r+','+g+','+b+")"+";font-size:18px";
      this.movieDBScoreColor="rgb("+r+','+g+','+b+")";
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"  scoped>
.button{
    margin:22px auto;
    
}
.edit{
     float: right;
}
.el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  
.el-col {
  border-radius: 4px;
}
 
//  .bg-purple {
//      background: #d3dce6;
//    }
  // .bg-purple-light {
  //   background: #e5e9f2;
  // }
  //  .grid-content {
  //    border-radius: 4px;
  //    min-height: 36px;
  //  }
</style>
