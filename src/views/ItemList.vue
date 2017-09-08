<template>
  <div class="news-view">
  <div class="row">
    <div class="col col-md-12">
       <div class="block">
         <el-carousel height="320px" :interval="8000">
          <el-carousel-item v-for="item in banner" :key="item" v-bind:style='{backgroundColor:getColor(item.name)}'>
            <img v-bind:src="item.image_url" class='img-responsive center-block'>
          </el-carousel-item>
         </el-carousel>
       </div>
    </div>
  </div>
    <div class="container-fluid" style='padding:0px'>
    <div class="row" style='padding-top:10px'>
     <div class="col col-md-10 col-md-offset-1 text-left">
        <strong><big>电视剧</big></strong><span style='padding:30px;line-height:0px'>最新电视剧资源</span>
     </div>
    </div>
    <div class="row">
    <div class="col col-md-10 col-md-offset-1 text-center">
        <div class="row" style='padding:0px'>
          <div class="col col-md-3 col-sm-4 col-xs-4 col-lg-3" v-for='item in listData' style='cursor:pointer;padding:0px'>
            <div class="row" style="margin:10px;">
             <img v-bind:src="item.pic_url" class='pic_list_3'>
                 <div class="row">
                    <div class="time_counter">
                        <counter :endTime="item.deadline"></counter>
                    </div>
                </div>
                <div class="row">
                   <div class="col col-md-12">
                      <modules :labelList='item.adver_type_list'></modules>
                   </div>
                </div>
                <div class="row text-left" style='font-size:13px;padding-top:12px'>
                   <div class="col col-md-12">
                      <router-link style='padding-left:30px' :to="{path:'detailDrama',query:{id:item.id}}">{{"《"+item.name+"》"}}</router-link>
                   </div>
                </div>
                 <div class="row text-left" style='font-size:13px;padding-top:5px;padding-left:30px;color:#999;font-size:12px' v-if='item.actor_list.length!=0'>
                   <div class="col col-md-2 text-right">
                    <span class='text-line' style='padding-left:10px'> 
                     主演：
                    </span>
                   </div>
                  <div class="col col-md-10 text-left">   
                      <span class='text-line' v-for='(items,index) in item.actor_list' v-if='index<4'>{{items.staff_name}}&nbsp;&nbsp;&nbsp;</span>
                   </div>
                </div>

                  <div class="row text-left" style='font-size:13px;padding-top:5px;padding-left:30px;color:#999;font-size:12px' v-else>
                   <div class="col col-md-2 text-right">
                    <span class='text-line' style='padding-left:10px'> 
                     主演：
                    </span>
                   </div>
                  <div class="col col-md-2 text-left">   
                      <span class='text-line'>暂未拟定</span>
                   </div>
                </div>
            </div>
          </div>
        </div>

    </div>
    <div class="col col-md-1"></div>    
    </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import counter from '../components/counter.vue'
  import modules from '../components/modules.vue'
export default {
  mounted(){
  this.listData =this.getList();
  this.banner=this.load_banner();
  // console.log(this.listData)
  },
 ready(){
    },
  data (){
    return {
      listData:[],
      banner:[],
      type:'1'
    }
  },
  computed: {
  },
  components:{
    counter:counter,
    modules:modules
  },
  methods: {
    getList(){
        let self=this;
      var datas=[];
        $.ajax({
            type: "GET",
            url: "/home/drama/solr",
            dataType: "json",
            async: false,
            data:{
             type:self.type,
             page:1
            },
            success: function(resquet) {
                if (resquet.data != null) {
                    datas = resquet.data;
                } else {
                    // console.log('error')
                    self.$alert("网络异常，请重试")
                }
            }
        });
      return datas;
    },
    getColor(name){
      if(name.split(',').length==2)
      {
     return name.split(',')[1]
   }
   else{
    return 'white'
   }
    },
    dataCut(data){
      if(data!=null&&data.length>3)
       return  data.slice(0,3)
    },
    load_banner(){
      let self=this;
      var datas=[];
         $.ajax({
            type: "GET",
            url: "/home/load_banner",
            dataType: "json",
            async: false,
            success: function(resquet) {
                if (resquet.data != null) {
                    datas = resquet.data;
                } else {
                }
            }
        });
         return datas;
    }
  }
}
</script>

<style scoped>
 @import '../../public/css/element-ui/lib/theme-default/index.css';
.pic_list_3 {
    width: 80%;
    height: auto;
    border: solid 2px #eee;
    padding-top:30px 0px 0px 0px;
     box-shadow: 3px 3px 8px;
}

.time_counter {
    height: 20px;
    width: 60%;
    color:white;
    font-weight:600;
    line-height:20px;
    font-size:14px;
    background-color: black;
    left: 20%;
    top: 2.5%;
    box-shadow: 2px 2px 5px;
    position: absolute;
    opacity: 0.8;
}
.news-view{
  background-color: white;
  padding-bottom:30px;
}
 #modes{
    position:absolute;
    bottom:30%;
    left:17%;
    opacity:0;
    width:74%;
    height:68px;
    word-break: keep-all;
    white-space: nowrap;
    font-size:12px;
    overflow: hidden;
    text-overflow: ellipsis;/*clip */
    color:white;
    min-height:80px;
    background-color:black

    }
    .show{
        display:block
    }
    #modes:hover{
      opacity:0.7
    }
/*   .el-carousel__item:nth-child(3){
    background-color: white;
  }
   .el-carousel__item:nth-child(4){
    background-color: #99dbd7;
  }

  .el-carousel__item:nth-child(5){
    background-color: #282828;
  }
  .el-carousel__item:nth-child(6){
    background-color: #d1d9db;
  }*/
  .block{
    height:320px;
  }

</style>
