<template>
  <div class="updownFile container">
      <el-upload class="upload-demo"
        drag
        :action="uploadUrl"
        multiple
        :data="fileData"
        :before-upload="handleBeforeUpload"
        :on-change="onUploadChange"
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


