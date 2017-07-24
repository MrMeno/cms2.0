<template>
 <div class="col col-md-3 text-right">
                <el-dropdown style='padding-top:30px'  v-if="access_token!='undefined'&&access_token!=undefined">
                  <span class="el-dropdown-link">
                 {{userName}} <i class="el-icon-caret-bottom el-icon--right"></i>
                 </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="show1">
                <i class="fa fa-user-circle" aria-hidden="true">
                </i>
                <span class='space'><router-link :to="{path:'/regist',query:{param:1}}">认证为广告主</router-link></span>
                </el-dropdown-item>
                <el-dropdown-item v-if="show2">
                <i class="fa fa-file-video-o" aria-hidden="true">
                </i>
                <span class='space'><router-link :to="{path:'/regist',query:{param:2}}">认证为媒体主</router-link></span>
                </el-dropdown-item>
          <!--       <el-dropdown-item>
                <i class="fa fa-list-alt" aria-hidden="true">
                </i>
                <span class='space'>我的订单</span>
                </el-dropdown-item> -->
                <el-dropdown-item>
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <span class='space'><router-link to="/userCenter">个人中心</router-link></span>
                </el-dropdown-item>
              <!--  <el-dropdown-item>
               <i class="fa fa-user-plus" aria-hidden="true"></i>
               <span class='space'>帮助中心</span>
               </el-dropdown-item> -->
               <el-dropdown-item>
               <i class="fa fa-sign-out" aria-hidden="true"></i>
               <span class='space' @click='logout()'>退出</span>
               </el-dropdown-item>
               </el-dropdown-menu>
          </el-dropdown>
          <div class="row" style='padding-top:30px;font-size:13px' v-else>
          <div class="col col-md-6 text-right" style='cursor:pointer'><a @click="dialogVisible = true">登录</a></div>
          <div class="col col-md-6 text-left" style='cursor:pointer'><router-link to='/regist'><span>注册</span></router-link></div>
          </div>
          <div class="row">
            <div class="col col-md-12">  
              <el-dialog title="登录" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
                        <span class='dialog-body'>
                            <div class="row">
                              <div class="col col-md-2 text-right">
                                用户名
                              </div>
                              <div class="col col-md-10">
                                <el-input v-model='userName' style='width:90%'></el-input>
                              </div>
                            </div>

                             <div class="row"  style='padding-top:30px'>
                              <div class="col col-md-2 text-right">
                                密码
                              </div>
                              <div class="col col-md-10">
                                <el-input v-model='password' type='password' style='width:90%'></el-input>
                              </div>
                            </div>
                        </span>
                        <span slot="footer" class="dialog-footer">
                          <div class="row">
                            <div class="col col-md-5 col-md-offset-1 text-left">
                              <router-link to='/regist' style='font-size:12px'><span @click='dialogVisible = false'>立即注册</span></router-link>
                            </div>
                             <div class="col col-md-4 col-md-offset-1 text-right">
                              <router-link style='font-size:12px' to='/psd'><span @click='dialogVisible = false'>忘记密码</span></router-link>
                            </div>
                          </div>
                          <div class="row" style='padding-top:30px'>
                            <div class="col col-md-6 text-right">
                              <button class='btn btn-default' @click="dialogVisible = false">取消</button>
                          
                            </div>
                            <div class="col col-md-6 text-left">
                              <button class="btn btn-danger" @click="logins">登录</button>
                            </div>
                          </div>
                      </span>
                 </el-dialog>
            </div>
          </div>
       </div>
</template>
<script>
import axios from 'axios'
 import cookies from 'js-cookie'
     export default {
     name:'menuList',
     props:['role'],
     updated(){
       this.show1=((this.getRole().length==1)&&(this.role!='client'));//媒体主或者游客
       this.show2=((this.getRole().length==1)&&(this.role!='vendor'));//广告主主或者游客
     },
     mounted(){
         this.userName=cookies.get('username');
       this.access_token=cookies.get('access_token',{path:'/'})
      if(this.access_token!=undefined)
      {
         if(cookies.get('status_'+this.userName)==1||cookies.get('status_'+this.userName)==undefined)
         {       
               cookies.set('status_'+this.userName,2,2*365)
         }
      }
     },
     data(){
       return{
         userName:'',
         password:'',
         dialogVisible: false,
         access_token:'',
         show1:false,
         show2:false
       }
     },
     methods:{
      getRole(){
        if(this.role){
       return this.role.split(',');
     }
     else return ''
      },
       logout(){
          let self=this;
          this.$confirm('将要退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
         }).then(() => {      
         axios.post('/login/logout?access_token='+cookies.get('access_token',{path:'/'}))
         .then(function(res){
            if(Number(res.data.ret)==0){
               cookies.remove('access_token',{path:'/'});
               localStorage.removeItem('perList');
               localStorage.clear();
               self.$alert("退出登录成功", '登录', {
               confirmButtonText: '确定',
               callback:function(){
                 window.location.reload();
               }});
            }
            else if(Number(res.data.ret)==-1){
               self.$alert("用户不存在", '登录', 
                 {confirmButtonText: '确定'}                 
               )}
            else{
                 self.$alert("网络异常，请重试", '登录', 
                 {confirmButtonText: '确定'}                 
               )}
         })
         
        }).catch(() => {         
        });

       },
      handleClose(done){
       done()
      },

       getInfo(token){
        let self=this;
        if(token!=undefined&&token!='undefined')
         {
          axios.get('/home/user/user_info').then(function(res){
            if(Number(res.data.ret)==0){
              window.localStorage.setItem('role',res.data.data.userRole);
              self.$store.commit('SET_ROLE',res.data.data.userRole);               
            }else{          
              
            }
          })
        }
      },
      getPermisstionList(){
        axios.get('/home/permission?access_token='+cookies.get('access_token',{path:'/'})).then(function(res){
                   window.localStorage.setItem("perList",JSON.stringify(res.data));
                   window.location.reload();
        })
      },

      logins(){
        let self=this;
       var username=this.userName;
       var params='?userName='+username
          +'&password='+this.password;
           axios.post('/login/login'+params).
           then(function(res){
              if(res.data.ret==0)
                {
                  self.dialogVisible=false;
                  cookies.set('access_token',res.data.msg, { expires: 1/48,path:'/' });
                  cookies.set('username',username,{ expires: 1*365*2,path:'/' });
                  self.$store.commit('SET_ACCESS_TOKEN',res.data.msg);
                  self.getPermisstionList();
                  self.getInfo(res.data.msg);
                }
              else
              {
                 self.dialogVisible=false;
                 self.$alert("网络异常，请重试", '登录', 
                 {confirmButtonText: '确定'}       
                 )
              }
           });


      }
     }
     }
</script>
<style>
  @import '../../public/css/bootsrap/dist/css/bootstrap.css';
</style>