<template>
    <div class="movieInfo  container">
        <h1 class="page-header">电影总览</h1>
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
        }
    },
    methods:{
        queryMovieInfo(currentPage,pageSize){
            this.loading = true;
            //console.log(currentPage,pageSize);
            this.$http.post(this.HOST+"/MovieDataShow/queryMovieInfo",{
                page:currentPage,
                pageSize:pageSize
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
            this.queryMovieInfo(this.currentPage,val);
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.queryMovieInfo(val,this.pageSize);
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
                    this.queryMovieInfo(this.currentPage,this.pageSize);
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
        }
 
    },
    mounted(){
        this.queryMovieInfo(this.currentPage,this.pageSize);
    }
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
 


</style>


