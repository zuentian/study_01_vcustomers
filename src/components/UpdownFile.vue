<template>
  <div class="updownFile container">
      <el-upload class="upload-demo"
        drag
        :action="uploadUrl"
        multiple
        :data="fileData"
        :before-upload="handleBeforeUpload"
        :on-change="onUploadChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         <div class="el-upload__tip" slot="tip">可上传任意文件，且文件大小不限</div>
        </el-upload>
  </div>
   
</template>

<script>
export default {
    name:'updownFile',
    data(){
        return{
            fileData:{
                filename:'',
                filesize:'',
                filetype:''
            },
            uploadUrl:'/api/uploadFile'

        }
    },methods:{
        handleBeforeUpload(file){
            console.log(file);
            this.fileData.filename=file.name;
            this.fileData.filesize=file.size;
            this.fileData.filetype=file.type;
        },
        onUploadChange(file){
            
        },
        handleSuccess(res, file, fileList){
            console.log(res);
        },
        handleError(err, file, fileList){
            this.$store.commit('SHOW_ERROR_TOAST', file.name+" 上传失败！")   
        }
        
    }
    ,
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-demo {
/deep/ input[type=file]{
    display: none !important;
}
}

.updownFile{
    margin:50px auto;
    text-align:center;
}

</style>


