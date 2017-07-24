<template>
  <div class="item-view">
    <template>
      <div class="container-fluid" style='min-height:600px;background-color:white;padding:50px 0px'>
          <div class="row">
           <div class="col col-md-6  text-left">
              <h4 style='padding-left:20px'><strong>媒体主信息</strong></h4>
           </div>
            <div class="col col-md-5 text-right">
             <i class="glyphicon glyphicon-pencil" style='color:#83bc5f;cursor:pointer' @click='modify'>编辑</i>
           </div>
          </div>
          <div class="row" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>中文名</span>
            </div>
            <div class="col col-md-3 text-left">
                 <span v-show='!isEdit'>{{data.nameZh}}</span>
               <el-input v-show='isEdit' v-model='data.nameZh'></el-input>
            </div>

            <div class="col col-md-2 text-center">
              <span class='titles'>英文名</span>
            </div>
            <div class="col col-md-3 text-left">
                    <span v-show='!isEdit'>{{data.nameEn}}</span>
               <el-input v-show='isEdit' v-model='data.nameEn'></el-input>
            </div>
          </div>

           <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>法人</span>
            </div>
            <div class="col col-md-3">
                  <span v-show='!isEdit'>{{data.legalPerson}}</span>
               <el-input v-show='isEdit' v-model='data.legalPerson'></el-input>
            </div>

            <div class="col col-md-2 text-center">
              <span class='titles'>公司电话</span>
            </div>
            <div class="col col-md-3">
                <span v-show='!isEdit'>{{data.companyTelephone}}</span>
               <el-input v-show='isEdit' v-model='data.companyTelephone'></el-input>
            </div>
          </div>

           <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>公司邮箱</span>
            </div>
            <div class="col col-md-3">
               <span v-show='!isEdit'>{{data.companyMail}}</span>
               <el-input v-show='isEdit' v-model='data.companyMail'></el-input>
            </div>

            <div class="col col-md-2 text-center">
              <span class='titles'>公司传真</span>
            </div>
            <div class="col col-md-3">
                <span v-show='!isEdit'>{{data.companyFax}}</span>
               <el-input v-show='isEdit' v-model='data.companyFax'></el-input>
            </div>
          </div>

           <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>公司网址</span>
            </div>
            <div class="col col-md-3">
                  <span v-show='!isEdit'>{{data.companyUrl}}</span>
               <el-input v-show='isEdit' v-model='data.companyUrl'></el-input>
            </div>

            <div class="col col-md-2 text-center">
              <span class='titles'>所在城市</span>
            </div>
            <div class="col col-md-3 text-left">
                <span v-show='!isEdit'>{{data.city}}</span>
               <el-input v-show='isEdit' v-model='data.city'></el-input>
            </div>
          </div>

           <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>注册地址</span>
            </div>
            <div class="col col-md-5">
                <span v-show='!isEdit'>{{data.address1}}</span>
               <el-input v-show='isEdit' v-model='data.address1'></el-input>
            </div>
          </div>

          <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>办公地址</span>
            </div>
            <div class="col col-md-5">
               <span v-show='!isEdit'>{{data.address2}}</span>
               <el-input v-show='isEdit' v-model='data.address2'></el-input>
            </div>
          </div>


            <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>注册编号</span>
            </div>
            <div class="col col-md-3">
               {{data.registerNo}}
            </div>

            <div class="col col-md-2 text-center">
              <span class='titles'>公司类型</span>
            </div>
            <div class="col col-md-4">
               {{data.companyType}}
            </div>
          </div>

           <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>业务范围</span>
            </div>
            <div class="col col-md-9">
               {{data.businessScope}}
            </div>
          </div>


             <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>税务编号</span>
            </div>
            <div class="col col-md-3">
               {{data.taxesNo}}
            </div>

            <div class="col col-md-2 text-center">
              <span class='titles'>组织编号</span>
            </div>
            <div class="col col-md-4">
               {{data.organizationNo}}
            </div>
          </div>

           <div class="row text-left" style='padding-top:40px'>
             <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>营业执照有效期</span>
            </div>
            <div class="col col-md-3">
               {{data.licenceStartDate}}-{{data.licenceEndDate}}
            </div>
<!-- 
            <div class="col col-md-2 text-center">
              <span class='titles'>供应商状态</span>
            </div>
            <div class="col col-md-4">
               {{data.organizationNo}}
            </div> -->
          </div>
       <!--   <div class="row text-left" style='padding-top:40px'>
            <div class="col col-md-2 col-md-offset-1 text-center">
              <span class='titles'>公司描述</span>
            </div>
            <div class="col col-md-5">
            {{data.companyMail}}
            </div>
          </div> -->


           <div class="row text-left" style='padding-top:40px' v-show='isEdit'>
            <div class="col col-md-6  text-right">
              <el-button  :plain='true' @click='cancel' type="info">取消</el-button>
            </div>

            <div class="col col-md-6  text-left">
            <el-button  type="info" @click='sumbits'>确定</el-button>
            </div>
          </div>
          


      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'js-cookie'
export default {
  data() {
    return {
      data:[],
      token:'',
      role:'',
      isEdit:false
    }
  },
  mounted(){
    this.token=cookies.get('access_token',{path:'/'});
    this.getInfo();
    this.getData();
  },
  computed: {

  },
  beforeMount() {

  },
  methods: {
    getData(){
      let self=this;
      axios.get('/home/get_vendor').then(function(res){
         if(res.data.ret==0){
              self.data=res.data.data;
         }
      });
    },
    modify(){
      this.isEdit=true;
       
    },
    cancel(){
      this.isEdit=false;
    },
      getInfo(){
        let self=this;
        if(this.token!=undefined&&this.token!='undefined')
         {
          self.role=window.localStorage.getItem('role');
        }
        else{
           self.$alert('请登录后查看用户中心','提示');
           self.$router.push({path:'/main'})
        }
      },
    sumbits(){
      let self=this;
      var data={
        nameZh:self.data.nameZh,
        nameEn:self.data.nameEn,
        legalPerson:self.data.legalPerson,
        companyTelephone:self.data.companyTelephone,
        companyMail:self.data.companyMail,
        companyFax:self.data.companyFax,
        companyUrl:self.data.companyUrl,
        city:self.data.city,
        address1:self.data.address1,
        address2:self.data.address2,
        id:self.data.id
      }
      axios.post('/home/post_vendor',data).then(function(res){
               if(res.data.ret==0){
                 self.$message.success('修改成功','提示');
                 self.isEdit=false
               }
               else{
               self.$message.error('网络异常，请重试','提示')
               }
      })
    }
  }
}


</script>

<style>
    .titles{
      color:#999;
    }
    .row{
      line-height: 30px
    }
</style>
