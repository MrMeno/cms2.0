<template>
      <div class="row" style='padding:15px 0'>
        <div class="col col-md-10 col-md-offset-1" style='color:black'>
          <el-breadcrumb separator=">" >
              <el-breadcrumb-item v-for='items in bread' :to='items.url'>{{items.name||'主页'}}</el-breadcrumb-item>
            </el-breadcrumb> 
        </div>
       </div>
</template>
<script>
     export default {
     name:'breadcrumb',
     props:[''],
     mounted(){
      
     },
     data(){
      return {
      }
     },
     computed:{
      bread:function(){
          var breads= this.$store.state.breadcrumb;
          if(breads[0].url=='/'||breads[0].url=='/noPage'){
            breads[0].url='/main';
            breads[0].name='主页'
          }
          return breads
      }
     },
     methods:{
   
         }
     }
</script>
<style>
.bre{
    font-size:12px;
    float:left;
    list-style: none
}
.bre li{
  width:30px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>