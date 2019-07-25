<template>
  <div class="movieReport1 container">
     <div class="button">
        <el-button class="rollback" type="primary" icon="el-icon-d-arrow-left" plain @click="rollback">返回</el-button>
      </div>
      <div  id='movieDBScore'  :style="{width:'100%',height:'400%'}" >
      </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      
    }
  },
  methods:{
    rollback(){
       this.$router.push({ path: '/movieInfo' });
    },
  }
}
</script>

<style scoped>
.movieReport1{
     margin:21px auto;
    
}
</style>
