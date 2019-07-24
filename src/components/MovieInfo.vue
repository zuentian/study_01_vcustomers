<template>
    <div class="movieInfo  container">
        <h1 class="page-header">电影总览</h1>

         <ul class="list-group">
          <li class="list-group-item">
            <el-row :gutter="10">
              <el-col  :span="2" style="text-align:center">
                  <span style="line-height:30px;font-size:16px;font-family:微软雅黑">电影名字：</span>
              </el-col>
              <el-col :span="5" >
                  <el-input v-model="movieName" clearable  size="small"></el-input>
              </el-col>
              <el-col  :span="2" style="text-align:center">
                  <span style="line-height:30px;font-size:16px;font-family:微软雅黑">电影上映：</span>
              </el-col>
              <el-col :span="8">
                   <el-date-picker  v-model="movieShowTimeStartAndEnd" size="small" type="daterange" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" :default-value="new Date()">  </el-date-picker>
              </el-col>
              <el-col  :span="2" style="text-align:center">
                  <span style="line-height:30px;font-size:16px;font-family:微软雅黑;text-align:center">豆瓣评分：</span>
              </el-col>
              <el-col :span="2">
                  <el-input v-model="movieDBScoreStart" clearable  size="small"></el-input>
              </el-col>
              <el-col :span="1" style="width:37px;text-align:center">
                 <span style="line-height:30px;font-size:16px;font-family:微软雅黑;text-align:center">~</span>
              </el-col>
              <el-col :span="2">
                  <el-input v-model="movieDBScoreEnd" clearable  size="small"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col  :span="2" style="text-align:center">
                  <span style="line-height:30px;font-size:16px;font-family:微软雅黑">出品地名：</span>
              </el-col>
              <el-col :span="5" >
                  <el-input v-model="movieCountry" clearable  size="small"></el-input>
              </el-col>
              <el-col  :span="2" style="text-align:center">
                  <span style="line-height:30px;font-size:16px;font-family:微软雅黑">电影观影：</span>
              </el-col>
              <el-col :span="8">
                   <el-date-picker  v-model="movieWatchTimeStartAndEnd" size="small" type="daterange"  value-format="yyyy-MM-dd"  start-placeholder="开始日期" end-placeholder="结束日期" :default-value="new Date()">  </el-date-picker>
              </el-col>
              <el-col  :span="2" style="text-align:center">
                  <span style="line-height:30px;font-size:16px;font-family:微软雅黑">是否观看：</span>
              </el-col>
              <el-col :span="5" >
                  <el-select v-model="movieIsWatch" placeholder="请选择" clearable  size="small"> <el-option  v-for="item in options" :key="item.value"  :label="item.label"  :value="item.value"></el-option></el-select>
              </el-col>
            </el-row>
            
            <el-row :gutter="20">
              <el-col  :span="12" style="text-align:center">
                <el-button type="info" icon="el-icon-refresh"  @click="reset">重置</el-button>
              </el-col>
              <el-col  :span="4" style="text-align:center">
                <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
              </el-col>
            </el-row>
            
          </li>
         </ul>


        <el-table :data="movieInfo"   style="width: 100%" v-loading="loading" :row-style="{height:'0'}" :cell-style="{padding:'4px'}" :cell-class-name="changeColor"
                @row-dblclick="movieDetailData">
            <el-table-column type="index" > </el-table-column>
            <el-table-column align="center" prop="movieName" label="电影名字" width="170"></el-table-column>
            <el-table-column align="center" prop="movieCountry" label="电影出品方国家" width="170"></el-table-column>
            <el-table-column align="center" prop="movieShowTime"  label="电影上映日期" width="170"></el-table-column> 
            <el-table-column align="center" prop="movieDBScore"  label="电影豆瓣评分" width="140" :formatter="movieDBScoreFormatter"></el-table-column>
            <el-table-column align="center" prop="movieIsWatch"  label="是否已观看" width="140" :formatter="movieIsWatchFormatter"></el-table-column>
            <el-table-column align="center" prop="movieWatchTime"  label="观影时间"  sortable width="170" :formatter="movieWatchTimeFormatter"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="updateMovieData(scope.row)"   @click.stop="updateMovieDataVisible = true" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click.stop="deleteMovieDataVisible = true" @click="deleteMovieData(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div v-show="isShowPagination" class="block" text-align="center">
            <el-pagination 
                @size-change="handleSizeChange"  
                @current-change="handleCurrentChange" 
                :current-page="currentPage"
                :page-sizes="[5,10,20, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'movieInfo',
    data () {
        return {
            movieInfo:[],
            loading:false,
            total:0,
            isShowPagination:false,
            currentPage:1,
            pageSize:10,
            movieName:"",
            movieShowTimeStartAndEnd:"",
            movieDBScoreStart:"",
            movieDBScoreEnd:"",
            movieWatchTimeStartAndEnd:"",
            movieCountry:"",
            options: [{value: 'true',label: '是'}, {value: 'false',label: '否'}],
            movieIsWatch: '',

        }
    },
    methods:{
        queryMovieInfo(){
            this.loading = true;
            //console.log(currentPage,pageSize);
            let movieShowTimeStart="";
            let movieShowTimeEnd="";
             if(this.movieShowTimeStartAndEnd!=null){
                 movieShowTimeStart=this.movieShowTimeStartAndEnd[0];
                 movieShowTimeEnd=this.movieShowTimeStartAndEnd[1];
             }
            let movieWatchTimeStart="";
            let movieWatchTimeEnd="";
            if(this.movieWatchTimeStartAndEnd!=null){
                 movieWatchTimeStart=this.movieWatchTimeStartAndEnd[0];
                 movieWatchTimeEnd=this.movieWatchTimeStartAndEnd[1];
             }
            this.$http.post(this.HOST+"/MovieDataShow/queryMovieInfo",{
                page:this.currentPage,
                pageSize:this.pageSize,
                movieName:this.movieName,
                movieShowTimeStart:movieShowTimeStart,
                movieShowTimeEnd:movieShowTimeEnd,
                movieDBScoreStart:this.movieDBScoreStart,
                movieDBScoreEnd:this.movieDBScoreEnd,
                movieWatchTimeStart:movieWatchTimeStart,
                movieWatchTimeEnd:movieWatchTimeEnd,
                movieCountry:this.movieCountry,
                movieIsWatch:this.movieIsWatch,
            }).then(res=>{
                this.movieInfo=res.body.list;
                //console.log(res.body.count);
                if(res.body.count>0){
                    this.isShowPagination=true;
                }
                this.total=res.body.count;
            }).catch(err=>{
                this.$store.commit('SHOW_ERROR_TOAST', err.body.message || err.body)    
            }).finally(() => {
                  this.loading = false
            })
        },
        movieDBScoreFormatter(row, column, cellValue){
            if(cellValue==0){
                return "暂无";
            }else{
                return cellValue;
            }
        },
        movieIsWatchFormatter(row, column, cellValue){
            if(cellValue=='false'){
                return "否";
            }else{
                return "是";
            }
        },
        movieWatchTimeFormatter(row, column, cellValue){
            if(cellValue==''||cellValue==null||cellValue==undefined){
                return "暂无";
            }else{
                return cellValue;
            }
        },
        handleSizeChange(val) {
            this.pageSize=val;
            this.queryMovieInfo();
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.queryMovieInfo();
        },
        updateMovieData(row){
            this.$router.push({path: '/updateMovie/'+row.movieId});
        },
        movieDetailData(row, event, column){

            this.$router.push({path:'/movieDetail/'+row.movieId});
        },
        changeColor({ row, column, rowIndex, columnIndex }){
            //console.log(row, column, rowIndex, columnIndex );
            if(rowIndex%3==0){
                return "color1";
            }else if(rowIndex%3==1){
                return "color2";
            }else if(rowIndex%3==2){
                return "color3";
            }

        },
        deleteMovieData(row) {
            this.$confirm('此操作将永久删除该电影信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.loading = true;
                console.log("movieId",row.movieId);
                this.$http.post('/api/MovieDataShow/deleteMoviDetailByMovieId',{
                    movieId:row.movieId,
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.queryMovieInfo();
                }).catch((err) => {
                    this.$store.commit('SHOW_ERROR_TOAST', err.body.message);  
                }).finally(() => {
                   this.loading = false
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        query(){
            this.queryMovieInfo();
        },
        reset(){
            this.movieName="";
            this.movieShowTimeStartAndEnd="";
            this.movieDBScoreStart="";
            this.movieDBScoreEnd="";
            this.movieWatchTimeStartAndEnd="";
            this.movieCountry="";
            this.movieIsWatch="";
        }
 
    },
    mounted(){
        this.queryMovieInfo();
    },
    
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.block{
    margin:20px auto;
    text-align:center;
}
.movieInfo{//这个父级必须选择最外层的class
/deep/ .color1{//deep和后面class名字要隔开
  background: rgb(248, 206, 206) !important;

}
/deep/ .color2{
  background: #f7a4ec !important;
}
/deep/ .color3{
  background: #a1f3b5 !important;
}
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
 
</style>


