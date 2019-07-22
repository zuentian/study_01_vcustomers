<template>
  <div class="movieDetail container">
    <div class="moviePicture">
      <el-button class="rollback" type="primary" icon="el-icon-d-arrow-left" plain @click="rollback">返回</el-button>
    </div>
    <ul class="list-group">
        <li class="list-group-item">
          <el-row > 
            <el-col :span="20">
               <span style="color:#111213e8;font-size:18px"><strong>{{movieName}}的全部海报和图片……(共{{moviePictureInfoBase.length}}张)</strong></span>
            </el-col>
          </el-row>
          <el-row :gutter="20"> 
            <span v-for="(item,index) in moviePictureInfoBase" :key="index">
                    <el-col :span="4">
                     <div class="outer">
                      <img   @click="handlePictureCardPreview(item.name,item.url)"  :src="item.url" class="image">
                      <p  align="center" style="word-break:break-word;">{{ item.name}}</p>
                     </div>
                    </el-col> 
            </span>
            <el-dialog  :title="moviePictureName" :visible.sync="dialogVisible" size="tiny"><img width="100%" height="100%" :src="dialogImageUrl" alt=""></el-dialog>
          
          </el-row>
           <div  class="block" text-align="center">
            <el-pagination 
                layout=" prev, pager, next, jumper"
                @current-change="handleCurrentChange" 
                :current-page="currentPage"
                :total="total">
            </el-pagination>
        </div>
        </li>
    </ul>
  </div>



</template>

<script>
export default {
  name: 'moviePicture',
  data () {
    return {
      movieId:"",
      moviePictureInfoBase:[],
      movieName:"",
      dialogImageUrl:"",
      dialogVisible:false,
      moviePictureName:"",
      currentPage:1,
      pageSize:18,
      total:0,
    }
  },
  methods:{
      queryMoviePictureDetail(currentPage,pageSize){
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.post('/api/MovieDataShow/queryMoviePictureDetail',{
          movieId:this.movieId,
          pageSize:pageSize,
          currentPage:currentPage,

        }).then(res => {
            console.log(res.body);
            this.moviePictureInfoBase=res.body.pageInfo.list;
            this.movieName=res.body.movieName;
            this.total=res.body.pageInfo.total;
        }).catch((err) => {
            this.$store.commit('SHOW_ERROR_TOAST', err.body.message);
            //this.rollback();    
        }).finally(() => {
          loading.close();
        })
      },
    rollback(){
      this.$router.go(-1);
    },
    handlePictureCardPreview(name,url) {
        this.dialogImageUrl =url;
        this.dialogVisible = true;
        this.moviePictureName=name;
    },
    handleCurrentChange(val){
      this.currentPage=val;
      this.queryMoviePictureDetail(val,this.pageSize);
    }
  },

  created(){
      this.movieId=this.$route.params.movieId;
      this.queryMoviePictureDetail(this.currentPage,this.pageSize);
  }
}
</script>

<style scoped>
.moviePicture{
    margin:22px auto;
    
}
.block{
    margin:20px auto;
    text-align:center;
}
/* img{
    width: 80px;
    height: 80px;
    margin-right: 10px;
} */
.outer {
  
      width: 100%;
      height: 100px;
      
      margin: 20px 0px;
  }
    img {
      max-width: 100%;
      max-height: 100%;
    }
</style>
