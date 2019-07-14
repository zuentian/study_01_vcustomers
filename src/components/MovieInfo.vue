<template>
    <div class="movieInfo  container">
        <h1 class="page-header">电影信息</h1>
        <el-table :data="movieInfo"  stripe style="width: 100%" v-loading="loading" :row-style="{height:'0'}" :cell-style="{padding:'4px'}">
            <el-table-column type="index" > </el-table-column>
            <el-table-column align="center" prop="movieName" label="电影名字" width="170"></el-table-column>
            <el-table-column align="center" prop="movieCountry" label="电影出品方国家" width="170"></el-table-column>
            <el-table-column align="center" prop="movieShowTime"  label="电影上映日期" width="170"></el-table-column> 
            <el-table-column align="center" prop="movieDBScore"  label="电影豆瓣评分" width="140" :formatter="movieDBScoreFormatter"></el-table-column>
            <el-table-column align="center" prop="movieIsWatch"  label="是否已观看" width="140" :formatter="movieIsWatchFormatter"></el-table-column>
            <el-table-column align="center" prop="movieWatchTime"  label="观影时间" width="170" :formatter="movieWatchTimeFormatter"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
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
            this.$http.post("/api/MovieDataShow/queryMovieInfo",{
                page:currentPage,
                pageSize:pageSize
            }).then(res=>{
                //console.log(res);
                this.movieInfo=res.body.list;
                if(res.body.total>0){
                    this.isShowPagination=true;
                }
                this.total=res.body.total;
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
            //console.log(val)
            //console.log(this.page)
            this.pageSize=val;
            this.queryMovieInfo(this.currentPage,val);
        },
        handleCurrentChange(val) {
            //console.log(val,this.pageSize)
            this.currentPage=val;
            this.queryMovieInfo(val,this.pageSize);
        },
 
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
</style>


