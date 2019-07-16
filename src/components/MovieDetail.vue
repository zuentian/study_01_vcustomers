<template>
  
<div class="movieDetail container">
      
      <div class="rollback">
        <el-button type="primary" icon="el-icon-d-arrow-left" plain @click="rollback">返回</el-button>
        <!-- <router-link to="/movieInfo" type="primary"  icon="el-icon-caret-left">返回</router-link> -->
      </div>
      <div>
        <h2>{{MovieInfo.movieName}}({{movieYear}})</h2>
      </div>
</div>
</template>

<script>
export default {
  name: 'movieDetail',
  data () {
      return {
          MovieInfo:{
              movieName:"",
              movieEnglishName:"",
              movieCountry:"",
              movieTypes:[],
              movieDBScore:0,
              movieContent:"",
              movieShowTime:"",
              movieIsWatch:false,
              movieWatchTime:"",
              movieRelNames: [{
                movieRelName: ''
              }],
           },
           movieYear:"",

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
            this.MovieInfo=res.body;
            console.log(res.body);
        }).catch((err) => {
            this.$store.commit('SHOW_ERROR_TOAST', err.body.message);
            //this.rollback();    
        }).finally(() => {
          loading.close();
        })
    },
    rollback(){
       this.$router.push({ path: '/movieInfo' });
    }
  },
  created(){
      this.queryMovieDetail(this.$route.params.movieId);
  }
}
</script>

<style scoped>
.rollback{
    margin:30px auto;
    text-align:left;
}
</style>
