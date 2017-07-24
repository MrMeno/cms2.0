<template>
  <div class="container-fluid">
     <div class="row" style='padding:50px 0px'>
     	<div class="col col-md-1">
     		
     	</div>
     	<div class="col col-md-10" style='background-color:white;min-height:600px' v-if='!f_finish'>
     		<div class="row" style='padding-top:120px;line-height:30px'>
     			<div class="col col-md-3 text-center">
     			
     			</div>
     			<div class="col col-md-6 text-center">
     				<div class="row">
     					<div class="col col-md-4 text-right">
     						您当前绑定的手机号
     					</div>
     					<div class="col col-md-4">
     						<el-input type='text' :disabled='true' style='border:solid 1px #eee' v-model='phone'></el-input>
     					</div>
     					<div class="col col-md-4 text-left">
     						 <el-button v-if='counter' type='button' @click='captcha()'>获取验证码</el-button>
                             <el-button v-if='!counter' :disabled="true" type='button'>倒计时{{timer}}s</el-button>
     					</div>
     				</div>

     					<div class="row" style='padding-top:20px'>
     					<div class="col col-md-4 text-right">
     						短信验证码
     					</div>
     					<div class="col col-md-4">
     						<el-input type='text' v-model='captcha1' placeholder='请输入验证码'></el-input>
     					</div>
     					<div class="col col-md-4 text-left">
     						
     					</div>
     				</div>

     					<div class="row" style='padding-top:10px'>
     				    <div class="col col-md-4">
     							
     				    </div>
     					<div class="col col-md-8 text-left">
     						<span style='color:red'>*</span><span style='font-size:12px;color:#999'>若无法完成短信验证，请拨打客服电话400-825-7355</span>
     					</div>
     						
     					</div>

     					<div class="row" style='padding-top:20px'>
     						<div class="col col-md-12">
     							<el-button type='danger' @click='next'>下一步</el-button>
     						</div>
     					</div>
     				</div>
     			</div>
     			<div class="col col-md-3 text-center">
     			
     			</div>
     		</div>

     		<div class="col col-md-10" style='background-color:white;min-height:600px' v-if='f_finish'>
     		<div class="row" style='padding-top:120px;line-height:30px'>
     			<div class="col col-md-3 text-center">
     			
     			</div>
     			<div class="col col-md-6 text-center">
     				<div class="row">
     					<div class="col col-md-4 text-right">
     						新手机号
     					</div>
     					<div class="col col-md-4">
     						<el-input type='text' :disabled='false' style='border:solid 1px #eee' placeholder='请输入新手机号码' v-model='rephone'></el-input>
     					</div>
     					<div class="col col-md-4 text-left">
     						 <el-button v-if='s_counter' type='button' @click='verication()'>获取验证码</el-button>
                             <el-button v-if='!s_counter' :disabled="true" type='button'>倒计时{{s_timer}}s</el-button>
     					</div>
     				</div>

     					<div class="row" style='padding-top:20px'>
     					<div class="col col-md-4 text-right">
     						短信验证码
     					</div>
     					<div class="col col-md-4">
     						<el-input type='text' placeholder='请输入验证码'></el-input>
     					</div>
     					<div class="col col-md-4 text-left">
     						
     					</div>
     				</div>

     					<div class="row" style='padding-top:10px'>
     				    <div class="col col-md-4">
     							
     				    </div>
     					<div class="col col-md-8 text-left">
     						<span style='color:red'>*</span><span style='font-size:12px;color:#999'>若无法完成短信验证，请拨打客服电话400-825-7355</span>
     					</div>
     						
     					</div>

     					<div class="row" style='padding-top:20px'>
     						<div class="col col-md-12">
     							<el-button type='danger' @click='ensure'>确定</el-button>
     						</div>
     					</div>
     				</div>
     			</div>
     			<div class="col col-md-3 text-center">
     			
     			</div>
     		</div>
     	</div>
     	<div class="col col-md-1">
     		
     	</div>
     </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import cookies from 'js-cookie'
export default {
	mounted(){
	   this.token=cookies.get('access_token');
       this.getInfo();
	},
  data() {
    return {
    	phone:'',
    	rephone:'',
    	captcha1:'',
    	captcha2:'',
    	token:'',
    	counter: true,
        timer: 60,
        s_counter: true,
        s_timer: 60,
        f_finish:false,
        ver_token:''
    }
  },
  methods: {
  	 getInfo(){
        let self=this;
        if(this.token!=undefined&&this.token!='undefined')
         {
          axios.get('/home/user/user_info').then(function(res){
            if(Number(res.data.ret)==0){
              self.phone=res.data.data.userName;                 
            }else{          
              
            }
          })
        }
        else{
           self.$alert('请登录后查看用户中心','提示');
           self.$router.push({path:'/main'})
        }
      },
        timeCount() {
      let self = this;
      setInterval(function () {
        if (self.timer > 0) {
          return self.timer--
        }
        else {
          self.counter = true;
          self.timer = 60;
        }
      }, 1000)
    },
        s_timeCount() {
      let self = this;
      setInterval(function () {
        if (self.s_timer > 0) {
          return self.s_timer--
        }
        else {
          self.s_counter = true;
          self.s_timer = 60;
        }
      }, 1000)
    },
    captcha() {
      let self = this;
      if (self.phone == '') {
        this.$alert('手机号码无效，请重新登录', '提示', { confirmButtonText: '确定' });
      }
      else{
        axios.post('/login/captcha?userName=' + self.phone + '&type=2')
          .then(function (response) {
            if (response.data.ret == 0) {
              self.counter = false;     //发送短信成功
              self.timeCount();
            }
            else {
              self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
            }
          });
      }
    },
    verication(){
    	let self = this;
      if (self.rephone == '') {
        this.$alert('请输入新手机号码', '提示', { confirmButtonText: '确定' });
      }
      else{
      	var data={userName:self.rephone,tokens:self.ver_token}
        axios.post('/home/checkToken',data)
          .then(function (response) {
            if (Number(response.data.ret) == 0) {
            	 self.s_counter = false;     //发送短信成功
                self.s_timeCount();
            	self.captcha2=response.data.msg;
                 
            }
            else {
              self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
            }
          });
      }

    },
    next(){
    	let self=this;
    	this.f_finish=true;
    	var data={userName:self.phone,verification:self.captcha1}
    	axios.post('/home/verification',data).then(function(res){
    		 if(Number(res.data.ret)==0){
    		 	self.ver_token=res.data.msg;
    		 }
    	})
    },
    ensure(){
    	let self=this;
    	var data={userName:self.rephone,verification:self.captcha2};
    	 axios.post('/home/changeTel',data)
          .then(function (response) {
            if (Number(response.data.ret) == 0) {
            	cookies.set('username',self.rephone)
            	cookies.set('access_token',response.data.msg)
            	self.$alert("手机号码修改成功",'提示',
            		{confirmButtonText:'确定',
            		callback:function()
            		{self.$router.push({path:'/userCenter/safety'})
            	}})
            	
            }
            else {
              self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
            }
          });


    }
  }
}
</script>