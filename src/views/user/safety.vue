<template>
	<div style='padding:30px'>
		<div class="container-fluid" style='background-color: white;font-size: 14px;height:600px'>
			<div class='row' style='border-bottom:solid 1px #eee;padding: 30px'>
				<div class="col col-md-3 text-center">
					当前账号
				</div>
				<div class="col col-md-9 text-left">
					<span>{{userName}}</span>
				</div>
			</div>
			<div class='row' style='border-bottom:solid 1px #eee;padding: 30px'>
				<div class="col col-md-1" v-if="level!=''&&level!='弱'">	<i class="el-icon-circle-check bsuccess" style='color:#24db35'></i></div>
				<div class="col col-md-1" v-else>	<i class="el-icon-warning" style='color:#FF4949'></i></div>
				<div class="col col-md-2 text-left">
				登录密码
				</div>
				<div class="col col-md-7 text-left">
					<p style='color:#999'>建议您定期更换密码,设置高安全的密码可以使账号更安全</p>
				</div>
				<div class="col col-md-2 text-center">
					<a style='cursor: pointer' href="/psd"> 修改</a>
				</div>
			</div>
			<div class='row' style='border-bottom:solid 1px #eee;padding: 30px'>
				<div class="col col-md-1" v-if="telephone!=''">	<i class="el-icon-circle-check bsuccess" style='color:#24db35'></i></div>
				<div class="col col-md-1" v-else>	<i class="el-icon-warning" style='color:#FF4949'></i></div>
				<div class="col col-md-2 text-left">
					绑定手机
				</div>
				<div class="col col-md-7 text-left">
					<p style='color:#999'>{{telephone}}</p>
				</div>
				<div class="col col-md-2 text-center">
					<a style='cursor: pointer' href='/rephone'> 修改</a>
				</div>
			</div>
			<div class='row' style='border-bottom:solid 1px #eee;padding: 30px'>
				<div class="col col-md-1" v-if="email!=''&&emailStatus!=0">	<i class="el-icon-circle-check bsuccess" style='color:#24db35'></i></div>
				<div class="col col-md-1" v-else>	<i class="el-icon-warning" style='color:#FF4949'></i></div>
				<div class="col col-md-2 text-left">
					绑定邮箱
				</div>
				<div class="col col-md-7 text-left">
					<p style='color:#999' v-if="email == null">绑定邮箱后,您可以享受更多的影视剧植入方面的信息</p>
					<p style='color:#999' v-else>{{email}}</p>
				</div>
				<div class="col col-md-2 text-center" v-if="email != null">
					<p v-if="emailStatus==0"><a href="#"  @click='sendMail()'>发送激活邮件</a></p>
					<p v-if="emailStatus==0"><a href="#"  @click='activateMail()'>激活邮箱</a></p>
					<p><a href="#" @click='chageMail()'>修改邮箱</a></p>
				</div>
				<div class="col col-md-2 text-center" v-if="email == null">
					<a href="#" @click='setMail()'>立即绑定</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
export default {
	mounted() {
		this.getUserInfo();
	},
	data() {
		return {
			userName: '',
			telephone: '',
			email: '',
			emailStatus: 0,
			level:''
		}
	}, methods: {
		getUserInfo() {
			let self = this;
			axios.get('/home/user/user_info').then(function (res) {
				var info = res.data.data;
				self.userName = info.userName;
				self.telephone = info.telephone;
				self.email = info.email;
				self.emailStatus = info.emailStatus;
				self.level=info.level
			});
		}, setMail() {
			let self = this;
			this.$prompt('请输入邮箱', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				inputErrorMessage: '邮箱格式不正确'
			}).then(({ value }) => {
				axios.post('/home/user/change_email?email=' + value)
					.then(function (response) {
						if (response.data.ret == 0) {
							self.email = value;
						} else {
							self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
						}
					});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消修改'
				});
			});
		}, chageMail() {
			let self = this;
			this.$prompt('请输入邮箱', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputValue: self.email,
				inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				inputErrorMessage: '邮箱格式不正确'
			}).then(({ value }) => {
				axios.post('/home/user/change_email?email=' + value)
					.then(function (response) {
						if (response.data.ret == 0) {
							self.email = value;
							self.emailStatus = 0;
						} else {
							self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
						}
					});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});
			});
		}, activateMail() {
			let self = this;
			this.$prompt('请输入邮箱激活码', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({ value }) => {
				axios.post('/home/user/activate_email?token=' + value)
					.then(function (response) {
						if (response.data.ret == 0) {
							self.emailStatus = 1;
						} else {
							self.$message({ type: 'success',message:'邮箱激活成功' });
						}
					});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消激活'
				});
			});
		}, sendMail() {
			let self = this;
			axios.post('/home/user/send_activate_email')
				.then(function (response) {
					if (response.data.ret == 0) {
						self.$message({
							type: 'info',
							message: '邮件已发送,请注意查收!'
						});
					} else {
						self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
					}
				});
		}
	}
}
</script>