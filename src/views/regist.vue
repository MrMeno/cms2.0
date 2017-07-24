<template>
<div class="container" style='min-height:600px;background-color:white;padding:50px 0px'>
<div class="row text-center">
<div class="col col-md-2"></div>
<div class="col col-md-8">
<el-steps :space='250' :active="active"  finish-status="success" v-if="active!=4">
  <el-step title="创建账户"></el-step>
  <el-step title="填写个人资料"></el-step>
  <el-step title="实名认证"></el-step>
  <el-step title="完成"></el-step>
</el-steps>
</div>
<div class="col col-md-2"></div>
</div>

<div class="row" style='padding-top:30px'>
<div class="col col-md-2"></div>
<div class="col col-md-8">
<div class="row" v-if='active==1'>
<div class="col col-md-6 text-center" v-cloak>
<div v-bind:class="{a_class:b_class,b_class:a_class}" style='float:right' @click='changeType(1)'>
广告主
</div>

</div>
<div class="col col-md-6 text-center" v-cloak>
<div v-bind:class="{a_class:a_class,b_class:b_class}" style='float:left'  @click='changeType(2)'>
媒体主
</div>

</div>
</div>
</div>
<div class="col col-md-2"></div>
</div>
    <div class="row" style='padding-top:50px' v-if="active==1" v-cloak>
  <div class="col col-md-12">
    <div class="row">
      <div class="col col-md-4 text-right" style='line-height:30px'>
        手机号码
      </div>
      <div class="col col-md-4 text-left">
        <el-input v-model="userName"  placeholder="请输入手机号" style='width:100%'></el-input>
      </div>

    </div>

      <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        邮箱
      </div>
      <div class="col col-md-4 text-left">
        <el-input v-model="email"  placeholder="请填写邮箱" type='email' style='width:100%'></el-input>
      </div>
    </div>
    <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        短信验证码
      </div>
      <div class="col col-md-3 text-left">
        <el-input v-model="msg" placeholder="验证码是四位数"></el-input>
      </div>

      <div class="col col-md-1 text-left">
        <el-button v-if='counter'  type='button' @click='captcha()'>获取验证码</el-button >
        <el-button v-if='!counter' :disabled="true"  type='button'>倒计时{{timer}}s</el-button >
      </div>

    </div>

    <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        密码
      </div>
      <div class="col col-md-4 text-left">
        <el-input v-model="secNum"  placeholder="请输入密码" type='password' style='width:100%'></el-input>
      </div>
    </div>

     <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        重复密码
      </div>
      <div class="col col-md-4 text-left">
        <el-input v-model="repNum"  placeholder="请重复密码" type='password' style='width:100%'></el-input>
      </div>
    </div>

    <div class="row" style='padding-top:20px'>
       <el-checkbox v-model="checked" @click='onCheck()'>我已阅读并接受</el-checkbox><a href='/clause' target="_blank" style='color:#e40012;cursor:pointer'>《媒大媒小服务条款》</a>
      
    </div>
  </div>
</div>
<div class="row" style='padding-top:50px' v-else-if="active==2">
 <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        姓名
      </div>
      <div class="col col-md-4 text-left">
        <el-input v-model="name"  placeholder="请填写姓名" style='width:100%'></el-input>
      </div>
    </div>

     <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        职位
      </div>
      <div class="col col-md-4 text-left">
        <el-select v-model="selectJob" placeholder="请选择职位" style='width:100%'>
        <el-option
      v-for="item in jobOption"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
    </el-select>
      </div>
    </div>

     <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        联系电话
      </div>
      <div class="col col-md-4 text-left">
        <el-input v-model="phone"  placeholder="请填写电话" style='width:100%'></el-input>
      </div>
    </div>

  
</div>
<div class="row" style='padding-top:50px' v-else-if="active==3">
<div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        企业名称
      </div>
      <div class="col col-md-4 text-left">
        <el-input v-model="firm_name"  placeholder="请填写公司名称" style='width:100%'></el-input>
      </div>
    </div>

    <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        所属行业
      </div>
      <div class="col col-md-4 text-left">
          <el-select v-model="category" placeholder="公司所属行业" style='width:100%'>
        <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.nameCn"
      :value="item.id">
    </el-option>
    </el-select>
      </div>
    </div>

     <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        企业规模
      </div>
      <div class="col col-md-4 text-left">
          <el-select v-model="scale" placeholder="公司规模" style='width:100%'>
        <el-option
      v-for="item in scaleOps"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>
      </div>
    </div>

     <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        所在城市
      </div>
      <div class="col col-md-2 text-left">
          <el-select v-model="province" placeholder="选择省份" @change='getCity()' style='width:100%'>
        <el-option
      v-for="item in provinceOps"
      :key="item.id"
      :label="item.districtName"
      :value="item.id">
    </el-option>
    </el-select>
      </div>
         <div class="col col-md-2 text-left">
          <el-select v-model="city" placeholder="选择城市" style='width:100%'>
        <el-option
      v-for="item in cityOps"
      :key="item.id"
      :label="item.districtName"
      :value="item.id">
    </el-option>
    </el-select>
      </div>
    </div>

    <div class="row" style='padding-top:20px'>
      <div class="col col-md-4 text-right" style='line-height:30px'>
        法人姓名
      </div>
      <div class="col col-md-4 text-left">
        <el-input v-model="legalPerson"  placeholder="请填写法人姓名" style='width:100%'></el-input>
      </div>
    </div>


      <div class="row" style='padding-top:20px;'>
      <div class="col col-md-4 text-right">
        组织机构证明
      </div>
      <div class="col col-md-4 text-left" style='font-size:12px'>
        <p> <i class="glyphicon glyphicon-exclamation-sign" style='color:#4b8ccb;font-size:15px'></i>您提供的证件照信息我们将予以严格的加密保护</p>
        <p style='padding-left:15px'>保证此证件照仅用于注册审核</p>
      </div>
    </div>

    <div class="row" style='padding-top:20px;'>
      <div class="col col-md-2 col-md-offset-4 text-center">
        <el-upload class="avatar-uploader" ref='upload_1' action='/home/prifile' :data="{businessType:'cmsAuthClientPic'}"
         :show-file-list="true" :file-list='coverFile'  
          :auto-upload="true" list-type='picture-card'  :multiple='false'  :before-upload="beforeAvatarUpload" :on-change="getFile"
                     :on-remove="handleRemove" accept='image'>
                  <img v-if="imageUrl" id='img1' :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
         </el-upload>
      </div>
      <div class="col col-md-2 text-left" style='color:#999;font-size:12px'>
        <p style='padding-top:40px'>请使用实拍照片，扫描、ps等不能通过审核。</p>
        <p>格式为jpg，png，gif，文件大小不超过3MB</p>
      </div>
    </div>

</div>
<div class="row" style='padding-top:50px' v-else-if="active==4">
<div class="col col-md-12" >
  <div class="row" style='color:#7fc334;font-size:18px'>
    <i class="el-icon-check" style='color:#7fc334;font-size:17px'></i>感谢您注册成为媒大媒小用户！
  </div>
   <div class="row" style='padding-top:30px;color:#666'>
    我们向您注册邮箱发送了一份验证邮件，请登录您的邮箱 <span style='color:#8db3d8'>{{email}}</span> 查收
  </div>
</div>

<div class="row" style='padding-top:100px'>
  <div class="col col-md-3">
  </div>
  <div class="col col-md-6">
    <div class='contas'>
        <p style='padding-top:30px'> 资料认证审核提交成功。预计一个工作日内审核完毕</p>
        <p>审核结果会短信通知到您的注册手机上！</p>
    </div>
  </div>
  <div class="col col-md-3">
    
  </div>
</div>

<div class="row" style='padding-top:30px'>
  <div class="col col-md-12">
    <el-button type='danger'><a href='/main' style='color:white'>返回首页</a></el-button>
  </div>
</div>
</div>



<div class="row text-center" style='padding-top:20px'>
      <el-button type='danger' @click="next()" v-if='active!=4'>下一步</el-button>
    </div>
</div>


</template>
<script>
   import $ from 'jquery'
  import axios from 'axios'
  import {checks} from '../directives/methods'
  import {setCookies} from '../directives/methods'
  import {getCookies} from '../directives/methods'
  export default {
  mounted(){
    let self=this;
    if(this.$route.query.param){
        self.linkRole=this.$route.query.param;
      }
  this.active=this.getActive();
  this.catchJob();//职务
  this.catchIndu();//所属行业
  this.provinceOps=this.getCitys('province','');
  },
  created(){
  },
 ready(){

    },
  data(){
    return {
      linkRole:0,//认证类型
      userType:1,//注册类型
      active:1,//阶段
      userName:'',//用户名
      telephone:'',//电话号码
      a_class:true,//样式
      b_class:false,
      msg:'',//短信
      c_msg:'',
      secNum:'',//密码
      repNum:'',
      checked:false,//checkbox 
      firm_name:'',//公司名称
      name:'',//姓名
      email:'',//邮箱
      phone:'',//联系电话
      legalPerson:'',//法人
      city:'',//城市
      scale:'',//企业规模
      scaleOps:['1-10人','10-50人','50-100人','100-500人','500-1000人','1000人以上'],
      nickName:'',//昵称
      counter:true,//倒计时
      timer:60,
      jobOption:[],//职位
      selectJob:'',//已选职位
      options: [],//行业
      province:'',
      provinceOps:[],
      cityOps:[],
      category:'',//已选行业
      coverFile:[],
      file:[],
      imageUrl:''
    }
  },
  computed: {

  },
  components:{
  },
   watch:{
     province:function(val,oldVal){
       let self=this;
        axios.get('/home/region?type=city&id='+val).then(function(res){
           if(Number(res.data.ret==0)){
              self.cityOps=res.data.data;
             }
        });     
     }
   },
  methods: {
       next(){
         let self=this;
         var rules=self.registCheck();
         // if(self.checked)
         // {
           if(this.active==1){
                if(self.checked)
                {
                if(rules.r)//输入验证满足为true
                { 
                  self.regist();//执行登录方法并返回登录状态
                 
                }
                else{
                    self.$alert(rules.t, '提示', {
                  confirmButtonText: '确定'
                });
               return 
                }
              }
              else{
              self.$alert('您还未同意服务条款', '提示', {
               confirmButtonText: '确定'
             })
                  return
              }

            }



          if(this.active<4)
          {
            if(this.active==2)
            {
              this.save()    
              setCookies("status_"+getCookies('username'),'3',365*2);      
            }
            else if(this.active==3){
               this.save()
              setCookies("status_"+getCookies('username'),'4',365*2);
            }
          }
             this.active+=1;
            if (this.active > 3)
            {
               this.active=4;
               this.sBtn=false;
           };
         // }
         // else{
         //   self.$alert('您还未同意服务条款', '提示', {
         //       confirmButtonText: '确定'
         // })
         // }
       },
       onCheck(){
        this.checked=!this.checked;
       },
      getActive(){ 
        let self=this;
        var status=getCookies('status_'+getCookies('username'));
        var token=getCookies('access_token');
        var actives=1;
        if(status!=undefined&&token!=undefined&&token!='undefined')
        {
          if(self.linkRole!='')
          {
            actives=3;
          }
          else{actives=status;}
        
          return Number(actives)
        }
        else{
          return 1
        }
      },
    registCheck(){
      var datas={
        userName:this.userName,
        email:this.email,
        secNum:this.secNum,
        repNum:this.repNum
        };
        return checks(datas);
    },
      getPermisstionList(){
        axios.get('/home/permission').then(function(res){
                   window.localStorage.setItem("perList",JSON.stringify(res.data));
        })
      },

    regist(){
      let self=this;
      var params='?userName='+self.userName;
      params+='&type='+self.userType+
      '&password='+self.secNum+
      '&repeatPasswd='+self.repNum+
      '&email='+self.email+
      '&verification='+self.msg;
      axios.post('login/regist'+params)
            .then(function(response){
            if(response.data.ret==0){
              self.$store.commit('SET_ACCESS_TOKEN',response.data.msg);
              setCookies('access_token',response.data.msg,0.0209);
              setCookies('username',self.userName,2);
               setCookies("status_"+self.userName,'2',365*2);
               self.getPermisstionList();
              self.$alert('恭喜您已成功注册媒大媒小系统，请完善个人信息', '提示', {
               confirmButtonText: '确定',
               callback:function(){
                    self.$store.commit('SET_LOGIN_STATE',true);
                    window.location.reload();
               }});
            }
            else{
                
              setCookies("status_"+self.userName,'1',365*2);
                self.$alert(response.data.msg, '提示', {
               confirmButtonText: '确定',callback:function(){window.location.reload()}});
            }
       });           
    },
    changeType(e){
      this.userType=e;
      if(e==1){
        this.a_class=true;
        this.b_class=false;
      }
      else{
         this.a_class=false;
        this.b_class=true;
      }

    },
    catchJob(){
      let self=this;
       axios.get('/login/job').then(function(res){
       if(Number(res.data.ret)==0){
            self.jobOption=res.data.data;
       }
       else
       {
       // self.$alert(res.data.msg, '提示', {
       //          confirmButtonText: '确定'});
       }
       })
    },
     catchIndu(){
      let self=this;
       axios.get('/login/industry').then(function(res){
           if(Number(res.data.ret)==0){
           self.options=res.data.data;
       }
       else
       {
         // self.$alert(res.data.msg, '提示', {
         //       confirmButtonText: '确定'});
       }
       })
    },
    timeCount(){
      let self=this;
      setInterval(function(){
        if(self.timer>0){
          return self.timer--
        }
        else{
          self.counter=true;
          self.timer=60;
        }
      },1000)
    },
    getCitys(type,id){
      let self=this
     axios.get('/home/region?type='+type+'&id='+id).then(function(res){
         if(Number(res.data.ret)==0){
          self.provinceOps=res.data.data;
         }
     });
    },
    getCity(){
      let self=this;
        axios.get('/home/region?type=city&id='+self.province).then(function(res){
           if(Number(res.data.ret==0)){
            console.log(self.province)
              self.cityOps=res.data.data;
             }
        });
    },
    save(){
       let self=this;
       var params='';
       var data;
       var userRole=1;
       if(this.linkRole!=''){
          userRole=this.linkRole
       }
       else{
        userRole=self.userType
       }
       if(self.active==2)
       {
        params='save?phone='+self.phone;
       params+='&name='+self.name
       +'&job='+self.selectJob;
       axios.post('login/'+params)
            .then(function(response){
            if(response.data.ret==0){
                 setCookies("status",getCookies('username')+'_'+self.active,365*2);
                 self.$alert(response.data.msg, '提示', {confirmButtonText: '确定'});
            }
            else{
                 self.$alert(response.data.msg, '提示', {confirmButtonText: '确定'});
            }
            });

     }
     else if(self.active==3)
      {
       params='submitCert';
            data ={
            nameZh:self.firm_name,
            industryId:self.category,
            provinceId:self.province,
            cityId:self.city,
            legalPerson:self.legalPerson,
            scale:self.scale,
            type:userRole
           }
           console.log(data);
            axios.post('login/'+params,data)
            .then(function(response){
            if(response.data.ret==0){
                 setCookies("status",getCookies('username')+'_'+self.active,365*2);
                 self.$alert(response.data.msg, '提示', {confirmButtonText: '确定'});
            }
            else{
                 self.$alert(response.data.msg, '提示', {confirmButtonText: '确定'});
            }
            });

       }
 
    },
    captcha(){
      let self=this;
      if(self.userName==''){
          this.$alert('请填写手机号', '提示', {
          confirmButtonText: '确定'
        });
      }
      else{
      axios.post('login/captcha?userName='+self.userName+'&type=1')
            .then(function(response){
            console.log(response.data);
            if(response.data.ret==0){
                 console.log(response.data)
                   self.c_msg=response.data.msg;
                   self.counter=false;     //发送短信成功
                   self.timeCount();
            }
            else{
                 self.$alert(response.data.msg, '提示', {
          confirmButtonText: '确定'
        });
            }
            });
      }         
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
        getFile(file, fileList){
        this.coverFile=[file]
        var formData=new FormData();
        formData.append('image',file.raw)
        this.file=formData;
      }
  }
}
</script>
<style>
    .a_class{
      background-color:#d0d0d0;
      color:white;
      width:80%;
      height:100px;
      line-height: 100px;
      font-size: 16px;
      cursor: pointer
    }
    .b_class{
       background-color:#e40011;
      color:white;
      width:80%;
      height:100px;
      line-height: 100px;
      font-size: 16px;
      cursor: pointer
    }
    [v-cloak] {
  display: none;
}
.square{
  width:150px;
  height:200px;
  border:dashed 1px #aaa;
}
.contas{
  width:100%;
  height:150px;
  line-height: 30px;
  border:dashed 1px #aaa;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload{
    display:block;
    width:150px;
    height:200px;
    position:absolute;
    top:0px;
    left:8%;
    opacity:0
  }
</style>

