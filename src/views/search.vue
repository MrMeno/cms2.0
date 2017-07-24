<template>
  <div class="container-fluid" style='padding:0px 10px;min-height:600px;margin-top:-30px'>
    <div class="row" id='nav'>
      <div class="col col-md-2" style='width:13.5%'>
        
      </div>
      <div class="col col-md-6">
         <el-select v-model="type" placeholder="请选择" @change='cData' style='margin-left:30px;height:30px;font:size:13px'>
         <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
         &nbsp; &nbsp;
         <el-tag :key="tag" type='danger' v-for="tag in chose_data" v-if="tag.value!=''"  :closable="true" :close-transition="false" @close="celChose(tag.type)">
           <span>{{tag.name}}:{{tag.value}}</span>
        </el-tag>  
      </div>
    </div>
     <div class="row" >
        <div class="col col-md-1">
          
        </div>
      <div class="col col-md-10">
        <div class="row" style='background-color:white;'>
          <div class="col col-md-12 text-center">
             <div class="row" style='border-bottom:solid 1px #eee;padding:10px'>
               <div class="col col-md-1" style='padding:10px 0px'>
                 <strong>类型</strong>
               </div>
               <div class="col col-md-10">
                  <div class="row" >
                    <div class="col col-md-1" style='padding:10px 0px'>
                      <span @click='getAll()' style='cursor:pointer' ref='fonts' class='blue_font'>全部</span>
                    </div>
                    <div class="col col-md-1" v-for='(item,index) in type_list' style='padding:10px 0px'>
                        <span style='cursor:pointer' ref='fonts_0'  @click="chose('type',item.name,index)">{{item.name}}</span>
                    </div>
                  </div>
               </div>
             </div>

               <div class="row" style='border-bottom:solid 1px #eee;padding:10px'>
               <div class="col col-md-1" style='padding:10px 0px'>
                 <strong>演员</strong>
               </div>
               <div class="col col-md-10">
                  <div class="row" >
                    <div class="col col-md-1" v-for='(item,index) in actor_data' style='padding:10px 0px'>
                        <span style='cursor:pointer' ref='fonts_1' @click="chose('actor',item.displayName,index)">{{item.displayName}}</span>
                    </div>
                  </div>
               </div>
             </div>

              <div class="row" style='border-bottom:solid 1px #eee;padding:10px'>
               <div class="col col-md-1" style='padding:10px 0px'>
                 <strong>导演</strong>
               </div>
               <div class="col col-md-10">
                  <div class="row" >
                    <div class="col col-md-1" v-for='(item,index) in director_data' style='padding:10px 0px;'>
                          <span style='cursor:pointer' ref='fonts_2' @click="chose('director',item.displayName,index)">{{item.displayName}}</span>
                    </div>
                  </div>
               </div>
             </div>

               <div class="row" style='border-bottom:solid 1px #eee;padding:10px'>
               <div class="col col-md-1" style='padding:10px 0px'>
                 <strong>编剧</strong>
               </div>
               <div class="col col-md-10">
                  <div class="row" >
                    <div class="col col-md-1" v-for='(item,index) in writer_data' style='padding:10px 0px'>
                        <span style='cursor:pointer' ref='fonts_3' @click="chose('writer',item.displayName,index)">{{item.displayName}}</span>
                    </div>
                  </div>
               </div>
             </div>


          </div>
        </div>



        <div class="row" style='padding:40px;background-color:white;margin-top:20px' v-if='listData.length!=0'>
               <div class="col col-md-3" v-for='item in listData' style='height:400px;cursor:pointer'>
            <div class="row" style="margin:10px;">
             <img v-bind:src="item.pic_url" class='pic_list_3'>
                 <div class="row">
                    <div class="time_counter">
                        <counter :endTime="item.deadline"></counter>
                    </div>
                </div>
                <div class="row">
                  <div class="col col-md-12 text-center">
                      <modules :labelList='item.adver_type_list'></modules>
                  </div>
                </div>
                <div class="row text-left" style='font-size:13px;padding-top:12px'>
                   <div class="col col-md-12">
                      <router-link style='padding-left:35px' :to="{path:'detailDrama',query:{id:item.id}}" v-html='item.name'></router-link>
                   </div>
                </div>
                   <div class="row text-left" style='font-size:13px;padding-top:5px;padding-left:30px;color:#999;font-size:12px'
                    v-if='item.actor_list.length!=0'>
                   <div class="col col-md-2 text-right">
                    <span class='text-line' style='padding-left:5px'> 
                     主演：
                    </span>
                   </div>
                  <div class="col col-md-10 text-left">   
                      <span class='text-line' v-for='(items,index) in item.actor_list' v-if='index<4' v-html="items.staff_name+'&nbsp;&nbsp;&nbsp;'"></span>
                   </div>
                </div>

                  <div class="row text-left" style='font-size:13px;padding-top:5px;padding-left:30px;color:#999;font-size:12px' v-else>
                   <div class="col col-md-2 text-right">
                    <span class='text-line' style='padding-left:5px'> 
                     主演：
                    </span>
                   </div>
                  <div class="col col-md-10 text-left">   
                      <span class='text-line'>暂未拟定</span>
                   </div>
                </div>
            </div>
          </div>
        </div>

        <div class="row text-center" style='padding:40px;background-color:white;margin-top:20px' v-else>
             <div class="col col-md-12">
               暂无数据
             </div>
        </div>  

      </div>
       <div class="col col-md-1">
          
        </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import counter from '../components/counter.vue';
    import modules from '../components/modules.vue';
export default {
  data(){
    return{
      listData:[],
      params:'',
      chose_data:[
            {name:'类型',type: 'type',value:''},
            {name:'演员',type:'actor',value: ''},
            {name:'导演',type:'director',value: ''},
            {name:'编剧',type:'writer',value: ''}],
      search_params:{
            actorsName:'',
            directorsName:'',
            screenwritersName:'',
            dramaTypeName:''
                    },
     loadCounterSearch:1,
     type_list:[],
     actor_data:[],
     director_data:[],
     writer_data:[],
     isCursor:true,
     type:'1',
     typeList:[{value:'1',label:'电视剧'},
               {value:'2',label:'电影'},
               {value:'3',label:'综艺'},
               {value:'4',label:'网络类型'}
     ]             
    }
  },
  mounted(){
    this.params=window.location.href.split('?')[1].split('=')[1];
    console.log(this.params)
    this.load_list_search();
    this.load_type(1);
    this.actor_data=this.getStaff(1);
    this.director_data=this.getStaff(2);
    this.writer_data=this.getStaff(3);
  },
 components:{
     counter,modules
   },
  watch:{
     $route:{
      handler:function(val,oldVal){
        var pr=val.fullPath.split('?')[1].split('=');
        console.log(pr)
        let self=this;
        if(pr[1]!=undefined){
           self.params=pr[1]
        }
        else{
           self.params=''
        }
        self.load_list_search();
      }

     },
     deep:true
  }, 
  methods:{
    load_list_search(){
      let self=this;
       var parsm = {
                    search:self.params,
                    actorsName:self.search_params.actorsName,
                    directorsName: self.search_params.directorsName,
                    screenwritersName:self.search_params.screenwritersName,
                    rows: '',
                    dramaTypeName:self.search_params.dramaTypeName,
                    page:self.loadCounterSearch,
                    type:self.type
                };
                console.log(parsm)
                 $.ajax({
                 type: "GET",
                  url: "/home/drama/solr",
                dataType: "json",
                 async: false,
                 data:parsm,
                success: function(resquet) {
                  console.log(resquet)
                if (resquet.data != null) {
                    self.listData = resquet.data;
                } else {
                    console.log('error')
                }
            }
        });
             },
       dataCut(data){
      if(data!=null&&data.length>3)
       return  data.slice(0,3)
    },
    cData(v){
         this.type=v;
         this.load_type(v);
         this.getStaff(1);
          this.getStaff(2);
           this.getStaff(3);
         this.load_list_search()

    },
    load_type(type){
        let self=this;
        $.ajax({
                type: "GET",
                url: 'home/load_type?type='+type,
                dataType: "json",
                async: false,
                success: function(request) {
                    if (request.data != null) {
                      self.type_list = request.data;

                    } else {

                    }
                }
            });
      },
      changeStyle(){

      },
      getStaff(staff){
        var datas=[];
        let self=this;
             $.ajax({
                type: "GET",
                url: 'home/staff_list?type='+self.type+'&staffType='+staff,
                dataType: "json",
                async: false,
                success: function(request) {
                    if (request.data != null && request.data.length != 0) {
                        datas = request.data;

                    } else {

                    }
                }
            });
             return datas;
      },
      initParam(){
         let self=this;
         for(var i in self.search_params){
          self.search_params[i]=''
         }
         self.params=''
      },
      getAll(){
        this.data=[];
        this.chose_data[0].value=''
        this.initParam();
        $(this.$refs.fonts).addClass('blue_font')
        $(this.$refs.fonts).parent().nextAll().children().removeClass('blue_font');
        this.load_list_search();

      },
      font_change(dom){
          dom.addClass('blue_font');
          for(var i=0;i<dom.parent().nextAll().length;i++)
          {
            $((dom.parent().nextAll())[i]).children().removeClass('blue_font')
          }
          for(var i=0;i<dom.parent().prevAll().length;i++){
            $((dom.parent().prevAll())[i]).children().removeClass('blue_font')
          }
      },
      chose(type,name,index){
        let self=this;
        switch(type)
        {
          case 'type':
             self.search_params.dramaTypeName=name;
            $(self.$refs.fonts_0[index]).addClass('blue_font');
             self.font_change($(self.$refs.fonts_0[index]));
            self.chose_data[0].value=name;
          break;
          case 'actor':
          self.search_params.actorsName=name;
            $(self.$refs.fonts_1[index]).addClass('blue_font');
             self.font_change($(self.$refs.fonts_1[index]));
              self.chose_data[1].value=name;
          break;
          case 'director':
          self.search_params.directorsName=name;
            $(self.$refs.fonts_2[index]).addClass('blue_font');
          self.font_change($(self.$refs.fonts_2[index]));
          self.chose_data[2].value=name;
          break;
          case 'writer':
          self.search_params.screenwritersName=name;
            $(self.$refs.fonts_3[index]).addClass('blue_font');
           self.font_change($(self.$refs.fonts_3[index]));
           self.chose_data[3].value=name;
          break;
        };

        this.load_list_search();
      },
      celChose(type){
        let self=this;
        switch(type)
        {
          case 'type':
          self.search_params.dramaTypeName='';
          self.chose_data[0].value='';
           $(self.$refs.fonts_0).removeClass('blue_font');
          break;
          case 'actor':
          self.search_params.actorsName='';
            self.chose_data[1].value='';
             $(self.$refs.fonts_1).removeClass('blue_font');
          break;
          case 'director':
          self.search_params.directorsName='';
            self.chose_data[2].value='';
             $(self.$refs.fonts_2).removeClass('blue_font');
          break;
          case 'writer':
          self.search_params.screenwritersName='';
             self.chose_data[3].value='';
              $(self.$refs.fonts_3).removeClass('blue_font');
          break;
        };
        this.load_list_search();
      }
  }

}
</script>

<style>
.view{
  padding: 0px
}
.pic_list_3 {
    width: 256px;
    height: 358px;
    border: solid 0px #ccc;
    padding-top:30px;
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
    top: 10%;
    position: absolute;
    opacity: 0.8;
}
.blue_font{
  color:#4b8ccb;
}
 #modes{
    position:absolute;
    bottom:30%;
    left:17.5%;
    opacity:0;
    width:256px;
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
    #nav{
      position:relative;
      top:-15px;
      text-align:left;
    }
    .cel1{
     list-style: none;
      background-color: white;
    }
    .cel1 span{
     display:block;
     width:50px;
     hieght:30px;
    }
    .cel1 li{
      display: block;
      background-color: white;

    }
    .cel2{
    list-style: none;
    background-color: white;
    display:block;
    height:30px;
    width:300px;
    }
     .cel2 li{
    padding:5px;
    float:left;
    }
    .el-select-dropdown__list li{
      float:left;
      top:0px;
    }
    .el-input__inner{
      height:30px;
      font-size:13px;
    }
</style>
<style lang='stylus'>
</style>
