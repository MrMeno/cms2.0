<template>
  <div class="container" style='min-height:600px;background-color:white;padding:50px 0px'>
    <div class="row text-center">
      <div class="col col-md-2"></div>
      <div class="col col-md-8"></div>
      <div class="col col-md-2"></div>
    </div>
    <div class="row" style='padding-top:30px'>
      <div class="col col-md-2"></div>
      <div class="col col-md-8"></div>
      <div class="col col-md-2"></div>
    </div>
    <div class="row" style='padding-top:50px'>
      <div class="col col-md-12" v-if="active==1" v-cloak>
        <div class="row">
          <div class="col col-md-4 text-right" style='line-height:30px;'>
            手机号码
          </div>
          <div class="col col-md-4 text-left">
            <el-input v-model="userName" placeholder="请输入手机号" style='width:400px'></el-input>
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
            <el-button v-if='counter' type='button' @click='captcha()'>获取验证码</el-button>
            <el-button v-if='!counter' :disabled="true" type='button'>倒计时{{timer}}s</el-button>
          </div>
        </div>
        <div class="row" style='padding-top:20px'>
          <span style='color:#e40012;cursor:pointer'> *</span>
          若您无法验证手机号码，请拨打客服电话400-825-7355
        </div>
        <div class="row text-center" style='padding-top:30px'>
          <el-button type='danger' @click='next()'>下一步</el-button>
        </div>
      </div>
  
      <div class="col col-md-12" v-else-if="active==2">
        <div class="row">
          <div class="col col-md-4 text-right" style='line-height:30px'>
            请输入新密码
          </div>
          <div class="col col-md-4 text-left">
            <el-input v-model="passWord" placeholder="请输入新密码" type='password' style='width:100%'></el-input>
          </div>
        </div>
  
        <div class="row" style='padding-top:20px'>
          <div class="col col-md-4 text-right" style='line-height:30px'>
            重复密码
          </div>
          <div class="col col-md-4 text-left">
            <el-input v-model="repeatPasswd" placeholder="请重新输入密码"  type='password'  style='width:100%'></el-input>
          </div>
        </div>
        <div class="row text-center" style='padding-top:30px'>
          <el-button type='danger' @click='resetPassword()'>确定</el-button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import { checks } from '../directives/methods'
import { setCookies } from '../directives/methods'
import { getCookies } from '../directives/methods'
export default {
  data() {
    return {
      userName: '',
      userType: 2,
      active: 1,
      passWord: '',
      repeatPasswd: '',
      token: '',
      msg: '',
      counter: true,
      timer: 60
    }
  },
  methods: {
    next() {
      let self = this;
      if (self.userName == '' || self.msg == '') {
        this.$alert('请确认手机号码或验证码是否为空!', '提示', { confirmButtonText: '确定' });
      } else {
        axios.post('login/checkVerification', { userName: self.userName, verification: self.msg })
          .then(function (response) {
            if (response.data.ret == 0) {
              self.active = 2;
              self.token = response.data.msg;
            }
            else {
              self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
            }
          });
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
    captcha() {
      let self = this;
      if (self.userName == '') {
        this.$alert('请填写手机号', '提示', { confirmButtonText: '确定' });
      }
      else {
        axios.post('login/captcha?userName=' + self.userName + '&type=' + self.userType)
          .then(function (response) {
            if (response.data.ret == 0) {
              self.c_msg = response.data.msg;
              self.counter = false;     //发送短信成功
              self.timeCount();
            }
            else {
              self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
            }
          });
      }
    },
    resetPassword() {
      let self = this;
      if (self.passWord == '' || self.repeatPasswd == '') {
        self.$alert('请确认密码是否为空!', '提示', { confirmButtonText: '确定' });
      } else if (self.passWord != self.repeatPasswd) {
        self.$alert('密码不一致，请确认!', '提示', { confirmButtonText: '确定' });
      } else {
        axios.post('login/resetPassword?token='+self.token, { userName: self.userName, password: self.passWord, repeatPasswd: self.repeatPasswd})
          .then(function (response) {
            if (response.data.ret == 0) {
              self.$alert('密码修改完成', '提示', { confirmButtonText: '确定' });
            }
            else {
              self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
            }
          });
      }
    }
  }
}
</script>