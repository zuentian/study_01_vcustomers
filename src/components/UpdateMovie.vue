<template>
    <div class="updateMovie container">
      
      <div class="rollback">
        <el-button type="primary" icon="el-icon-d-arrow-left" plain @click="rollback">返回</el-button>
        <!-- <router-link to="/movieInfo" type="primary"  icon="el-icon-caret-left">返回</router-link> -->
      </div>
        

        <h1 class="page-header">修改电影</h1>
        <el-form ref="MovieInfo" :model="MovieInfo" :rules="rules" v-loading.fullscreen.lock="loadingQuery" label-width="120px" label-position="right" >
            <div class="well">
                <h4>电影信息</h4>
                <el-form-item label="电影名字" prop="movieName"><el-input v-model.trim="MovieInfo.movieName"></el-input></el-form-item>
                <el-form-item label="电影英文名称" prop="movieEnglishName"><el-input v-model.trim="MovieInfo.movieEnglishName"></el-input></el-form-item>
                <el-form-item label="电影出品方国家" prop="movieCountry"><el-input v-model.trim="MovieInfo.movieCountry"></el-input></el-form-item>
                <el-form-item label="电影上映日期" prop="movieShowTime"><el-date-picker v-model="MovieInfo.movieShowTime" type="date" placeholder="选择日期"></el-date-picker></el-form-item>
                <el-form-item label="电影类型" prop="movieTypes">
                    <el-checkbox-group v-model="MovieInfo.movieTypes" :min="1" :max="3">
                        <el-checkbox v-for="selectMovieType in selectMovieTypes" :label="selectMovieType.typeCode" :key="selectMovieType.typeCode">{{selectMovieType.typeName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                
                <el-form-item label="电影豆瓣评分" prop="movieDBScore"><el-slider :max='10' :step='0.1' v-model="MovieInfo.movieDBScore" show-input ></el-slider></el-form-item>
                <el-form-item label="是否已观看" prop="movieIsWatch"><el-switch v-model="MovieInfo.movieIsWatch" active-color="#13ce66" inactive-color="#ff4949" @change='changeMovieIsWatch(MovieInfo.movieIsWatch)'></el-switch></el-form-item>
                <div v-show='MovieInfo.movieIsWatch'>
                    <el-form-item label="观看时间" prop="movieWatchTime"><el-date-picker v-model="MovieInfo.movieWatchTime"  type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker></el-form-item>
                </div>

                <el-form-item v-for="(movieRelName, index) in MovieInfo.movieRelNames"  :label="'电影相关人物' + (index+1)"  :key="movieRelName.key" :prop="'movieRelNames.' + index + '.movieRelName'">
                <el-input :style="{'width':'200px'}" v-model.trim="movieRelName.movieRelName"></el-input>
                <el-button type="primary" plain @click="addMovieRelName" icon="el-icon-plus">新增</el-button>
                <el-button type="warning" plain @click.prevent="removeMovieRelName(movieRelName)" icon="el-icon-delete" v-bind:disabled="isDisabled">删除</el-button>
                </el-form-item>


                <el-form-item label="电影简介" prop="movieContent"><el-input type="textarea"  placeholder=""  :autosize="{ minRows: 5, maxRows: 10}" v-model="MovieInfo.movieContent"></el-input></el-form-item>
                
                
                <el-form-item label="电影海报和剧照" >
                    <el-upload class="upload-moviePicture" 
                    action=""  multiple 
                    list-type="picture-card" 
                    ref="upload" 
                    :on-preview="handlePictureCardPreview" 
                    :on-remove="handleRemove"
                    :http-request="uploadFile" 
                    :auto-upload="false"
                    :on-change="changeMoviePicture"
                    :file-list="fileLists"
                    >
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog  :title="moviePicture" :visible.sync="dialogVisible" size="tiny"><img width="100%" :src="dialogImageUrl" alt=""></el-dialog>
                </el-form-item>
                
                
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="submitForm('MovieInfo')">立即修改</el-button>
                    <el-button @click="resetForm('MovieInfo')">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
        
    </div>
</template>
<script>
export default {
  name: 'updateMovie',
  data () {
    return {
      MovieInfo:{
          movieId:"",
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
      fileLists:[],
      selectMovieTypes:"",
      isDisabled:true,
      dialogVisible: false,
      dialogImageUrl: "",
      moviePicture:"",
      fileAllData:[],
      loading:false,
      loadingQuery:false,
      rules: {
        movieName: [
            { required: true, message: '请输入电影名字', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        movieCountry: [
            { required: true, message: '请输入电影出品方国家', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        movieTypes: [
            {type: 'array', required: true, message: '请至少选择一个电影类型', trigger: 'change' }
        ],
        movieShowTime: [
            
        ],
        movieWatchTime:[

        ],
      },
    pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
    },
    }
  },
  methods:{
      submitForm(formName) {
        this.fileAllData=[];
        this.loading=true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
              //console.log(this.MovieInfo);
              var fileFormData = new FormData();
              this.$refs.upload.submit();
              //fileFormData.set("files",this.fileAllData);
              //将上传文件封装在formData
              for(var i=0;i<this.fileAllData.length;i++){
                     fileFormData.append('files',this.fileAllData[i]);
              }
              //将附加的信息封装在formData中
              Object.keys(this.MovieInfo).forEach((key) => {
                fileFormData.append(key, this.MovieInfo[key]);
              });
              //将电影相关人物重新封装到一个数组里
              let movieRelNamesAll=[];
              for(var i=0;i<this.MovieInfo.movieRelNames.length;i++){
                  if(this.MovieInfo.movieRelNames[i].movieRelName!=null&&this.MovieInfo.movieRelNames[i].movieRelName!=''&&this.MovieInfo.movieRelNames[i].movieRelName!=undefined){
                      movieRelNamesAll.push(this.MovieInfo.movieRelNames[i].movieRelName);
                  }
              }
              fileFormData.set("movieRelNames",movieRelNamesAll);
              this.$http.post("/api/MovieDataShow/updateMovieData",fileFormData).then(res=>{
                this.loading = false;
                this.$notify({title: '修改成功',message: '',type: 'success'});
                this.$router.push({ path: '/movieInfo' });
                
              }).catch(err=>{
                  this.$store.commit('SHOW_ERROR_TOAST', err.body.message);  
                  this.fileAllData=[];
              }).finally(() => {
                  this.loading = false
              })
          } else {
            this.$store.commit('SHOW_ERROR_TOAST', "信息不完整，无法添加")    
            this.loading = false
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs.upload.clearFiles();//清空图片
        this.$refs[formName].resetFields();
        this.MovieInfo.movieDBScore=0;
        this.MovieInfo.movieRelNames=[{movieRelName: ''}];
      },
      loadMovieType(){
        this.$http.post('/api/MovieDataShow/queryMovieType').then(res => {
            this.selectMovieTypes=res.body;
           
        }).catch((err) => {
            this.$store.commit('SHOW_ERROR_TOAST', "电影类型获取失败")        
        }).finally(() => {
            //this.loading = false
        })
      },
      changeMovieIsWatch(value){
          if(value==false){
            this.MovieInfo.movieWatchTime="";
            this.rules.movieWatchTime="";
          }else{
            this.rules.movieWatchTime=[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }];
          }
      },
      removeMovieRelName(item) {
        if(this.MovieInfo.movieRelNames.length>1){
            var index = this.MovieInfo.movieRelNames.indexOf(item)
            if (index !== -1) {
                this.MovieInfo.movieRelNames.splice(index, 1)
            }
        }
        if(this.MovieInfo.movieRelNames.length<=1){
            this.isDisabled=true;
        }
      },
      addMovieRelName() {
        this.MovieInfo.movieRelNames.push({
          movieRelName: '',
        });
        if(this.MovieInfo.movieRelNames.length>1){
            this.isDisabled=false;
        }
        
      },
      handleRemove(file, fileList) {
       
        this.fileAllData=[];
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        this.moviePicture=file.name;
      },
      // 文件上传
    uploadFile(params) {
      this.fileAllData.push(params.file);
    },
    changeMoviePicture(file, fileList){
      
    },
    rollback(){
      this.$router.push({ path: '/movieInfo' });
    },
    //数据初始化
    loadMovieData(id){
      this.MovieInfo.movieId=id;
      this.loadingQuery=true;
      this.$http.post('/api/MovieDataShow/queryMovieDataByMovieId',{
        movieId:id
      }).then(res => {
            this.MovieInfo=res.body.list;
            this.rules.movieShowTime=[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }];//这个校验必须放在加载之后再出现，否则会报错
            if(this.MovieInfo.movieRelNames==null){
               this.MovieInfo.movieRelNames=[{movieRelName: ''}];//给个默认值
             }else if(this.MovieInfo.movieRelNames.length>1){
               this.isDisabled=false;//当电影相关人物大于一条的时候，删除按钮不能置灰
             }
            this.changeMovieIsWatch(this.MovieInfo.movieIsWatch);//为了显示校验
            this.fileLists=this.MovieInfo.files;
            this.MovieInfo.movieShowTime=new Date(res.body.list.movieShowTime);
            this.MovieInfo.movieWatchTime=new Date(res.body.list.movieWatchTime);
        }).catch((err) => {
            this.$store.commit('SHOW_ERROR_TOAST', err.body.message);
            this.rollback();    
        }).finally(() => {
          this.loadingQuery=false;
          this.loading = false
        })
    }
  },
  mounted(){
      this.loadMovieType();
      this.loadMovieData(this.$route.params.movieId);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-moviePicture {
/deep/ input[type=file]{
    display: none !important;
}
}
.rollback{
    margin:30px auto;
    text-align:left;
}
</style>