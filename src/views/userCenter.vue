<template>
<div class="container-fluid" style='padding-top:10px;min-height:600px'>
<div class="row text-center" id='main'>
<div class="col col-md-2 col-md-offset-1" style='background-color:white'>
  <div class="row" style='font-size:13px;color:#666;padding-bottom:20px'>
    <div class="col col-md-12">
      <div class="row"  style='padding-top:40px'>
        <div class="col col-md-12">
           <img v-bind:src="data.headImageUrl" class='headUrl' v-if="data.headImageUrl!=null&&data.headImageUrl.split('/')[3]!='null'" @click='dialogTableVisible=true' alt="">
           <img src="../../public/img/default.png" @click='dialogTableVisible=true' v-else>
           <el-dialog title="选择图片" size='small' :visible.sync="dialogTableVisible">
              <el-upload  class="upload-demo"   ref="upload" action="/home/upload" 
                        :file-list="fileList" :multiple='false' :auto-upload="false" :on-success='ups' :on-change='reseti' :before-upload="beforeAvatarUpload" accept='image'>
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传头像</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过200kB</div>
              </el-upload>
         </el-dialog>
        </div>
      </div>
      <div class='row text-center'>
            <label>{{data.userName}}</label>
        </div>
        <div class='row' style='line-height:10px;padding:30px 0px 0px 0px'>
            <div class="col col-md-6 text-right">账号安全：</div>
            <div class="col col-md-4 text-left">
                <div class="progress" v-if="data.level=='弱'" style='height:10px;'>
                    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%;height:10px">
                    </div>
                </div>
                <div class="progress" v-if="data.level=='中'" style='height:10px;'>
                    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;height:10px">
                    </div>
                </div>
                <div class="progress" v-if="data.level=='强'" style='height:10px'>
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style="width: 95%;height:10px">
                    </div>
                </div>
            </div>
            <div class="col col-md--2 text-left">
               <span>{{data.level}}</span>
            </div>
        </div>

             <div class='row' style='padding-bottom:10px'>
            <div class="col col-md-6 text-right"><span class='font_hide'>绑定手机：</span></div>
            <div class="col col-md-6 text-left">
                <label style='font-size: 10px'>{{replaceNum(data.telephone)}}</label>
            </div>
        </div> 
         <div class='row text-left' v-if="data.email != null">
            <div class="col col-md-6 text-right" ><span class='font_hide'>绑定邮箱：</span></div>
            <div class="col col-md-6 text-left">
                <label style='font-size: 10px'>已绑定</label>
            </div>
        </div> 
        <div class='row text-left' v-if="data.email == null">
            <div class="col col-md-6 text-right"><span class='font_hide'>绑定邮箱：</span></div>
            <div class="col col-md-6 text-left">
                <label><router-link to='/userCenter/safety' style='color:#ff6700'>去绑定</router-link></label>
            </div>
        </div>
    </div>
  </div>
	<div class="row" style='border-top:dashed 1px #eee;padding:20px'>
   <div class="col col-md-12">
     <el-tree :data="listdata" :accordion="false" ref="tree" :render-content="showNode"  default-expand-all
     :expand-on-click-node="true" :props="defaultProps" @node-click="handleNodeClick">
    </el-tree>
   </div> 
  </div>
</div>
<div class="col col-md-8 text-align:right" style='min-height:600px;margin:0px 10px 10px 10px'>
	<router-view style='width:99%;background-color:white;float:right'></router-view>
</div>
<div class="col col-md-2">
  
</div>
</div>
</div>
</template>
<script>
import cookies from "js-cookie"
import axios from 'axios'
import {roleSerialize} from '../directives/methods'
	export default{
    mounted(){
      let self=this;
      this.token=cookies.get('access_token',{path:'/'})
      this.username=cookies.get('username');
      this.getInfo();
      if(JSON.parse(window.localStorage.getItem('perList')).ret==0)
      {
      this.perList=JSON.parse(window.localStorage.getItem('perList')).data.resource_list;
      }
      this.$store.commit('_SET_PERMISSON',this.perList);
    },
		data(){
			 return {
        data:[],
        listdata:[],
        fileList:[],
        perList:[],
        token:'',
        dialogTableVisible:false,
        username:'',
        role:'',
        defaultProps: {
          children: 'children',
          label: 'label',
          auth:false
        }
      };
	},
	  methods: {
    getList(){
      let self=this;
        axios.get('/list.json').then(function(res){
          if(res.status==200){
          self.listdata=res.data;
           for(var i=0;i<self.perList.length;i++){
            if(self.perList[i].url=='/api/userInfo'&&self.perList[i].action=='1'){
              (self.listdata[0].children)[0].auth=false
            }
            else if(self.perList[i].url=='/api/client'&&self.perList[i].action=='1'){
               (self.listdata[1].children)[0].auth=false
            }else if(self.perList[i].url=='/api/vendor'&&self.perList[i].action=='1'){
               (self.listdata[1].children)[1].auth=false
            }
            else if(self.perList[i].url=='/api/advisory/list'&&self.perList[i].action=='1'){
               (self.listdata[2].children)[0].auth=false
            }
            else if(self.perList[i].url=='/api/product/save'&&self.perList[i].action=='2'){///
               (self.listdata[3].children)[0].auth=false
            }
              else if(self.perList[i].url=='/api/product/list'&&self.perList[i].action=='1'){///
               (self.listdata[3].children)[1].auth=false
            }    
           }
        }
        else{
          self.listdata=[];
        }
        })
    },
      handleNodeClick(data) {
      }, 
      getInfo(){
        let self=this;
        if(this.token!=undefined&&this.token!='undefined')
         {
          axios.get('/home/user/user_info').then(function(res){
            if(Number(res.data.ret)==0){
              self.data=res.data.data; 
              self.role=res.data.data.userRole;
              self.getList()               
            }else{          
              
            }
          })
        }
        else{
          self.$alert('请登录后查看用户中心','提示');
           self.$router.push({path:'/main'})

        }
      },
      reseti(file,fileList){
       // this.fileList=[file] 
      },
      showNode(h, {node,data,store}){
        let self=this;
           if(node.data.url==undefined)
           {
             return (
              <label class="nodes"><span class="squera"></span>{node.label}</label>
              )
           }
      	     else
             {
              if(node.data.auth)//需要权限验证
              {
                node.visible=false
              }
             else{
               return (
              <a href={node.data.url}>{node.label}</a>
              )

            }
             }
      },
      replaceNum(phone) {
            if (phone != null && phone != '' && phone != undefined) {
                var pre = phone.substr(0, 3);
                var next = phone.substr(7);
                var newphone = pre + '****' + next;
                return newphone;
            } else {
                return ''
            }
        },
       ups(){
        this.$message.success('头像修改成功!');
        this.dialogTableVisible=false;
        this.getInfo()
       },
        beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt = file.size / 1024<200;

        if (!(isJPG||isPNG)) {
          this.$message.error('上传头像图片只能是JPG或PNG格式!');
        }
        if (!isLt) {
          this.$message.error('上传头像图片大小不能超过 200kB!');
        }
        return (isJPG||isPNG) && isLt;
        },
        submitUpload() {
        this.$refs.upload.submit();
      }
    }
		
	}
</script>
<style>
  .nodes{
    font-size: 15px;
    font-weight: 500;
    line-height: 10px
  }
.font_hide {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.headUrl {
    width: 100px;
    height: 100px;
    border: solid 4px #eee
}
.squera{
  height:6px;
  width: 6px;
  background-color: black;
  display:inline-block;
  margin: 6px;
}
</style>
