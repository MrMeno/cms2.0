<template>
	<div  class='container-fluid'  style='padding:30px;min-height:600px;line-height:30px'>
		<div class="row" style='padding-top:20px'>
			<div class="col col-md-12 text-left"></div>
		</div>


		<div class="row" style='padding-top:30px'>
			<div class="col col-md-1">
				
			</div>
			<div class="col col-md-2 text-left">
				<span class='t2'>昵称：</span>
			</div>
			<div class="col col-md-6 text-left">
				<el-input style='width:90%' v-model="nickName"></el-input>
			</div>
		</div>


		<div class="row" style='padding-top:30px'>
			<div class="col col-md-1">
				
			</div>
			<div class="col col-md-2 text-left">
				<span class='t2'>账号：</span>
			</div>
			<div class="col col-md-6 text-left">
				<span>{{userName}}</span>
			</div>
		</div>


		<div class="row" style='padding-top:30px'>
			<div class="col col-md-1">
				
			</div>
			<div class="col col-md-2 text-left">
				<span class='t2'>性别：</span>
			</div>
			<div class="col col-md-6 text-left">
				<el-radio-group v-model="sex">
					<el-radio :label="1">女</el-radio>
					<el-radio :label="0">男</el-radio>
					<el-radio :label="2">未知</el-radio>
				</el-radio-group>
			</div>
		</div>


		<div class="row" style='padding-top:30px'>
			<div class="col col-md-1">
				
			</div>
			<div class="col col-md-2 text-left">
				<span class='t2'>手机号码：</span>
			</div>
			<div class="col col-md-6 text-left">
				<el-input style='width:90%' v-model="telephone"></el-input>
			</div>
		</div>

		<div class="row" style='padding-top:30px'>
			<div class="col col-md-1">
				
			</div>
			<div class="col col-md-2 text-left">
				<span class='t2'>邮箱：</span>
			</div>
			<div class="col col-md-4 text-left" v-if="email != null">
				<el-input style='width:90%' v-model="email" :disabled="true"></el-input>
			</div>
			<div class="col col-md-5 text-left">
				<a href="/userCenter/safety">立即设置</a>
			</div>
		</div>


		<div class="row" style='padding-top:30px'>
			<div class="col col-md-1">
				
			</div>
			<div class="col col-md-2 text-left">
				<span class='t2'>公司地址：</span>
			</div>
			<div class="col col-md-5 text-left">
				<div class="row">
					<div class="col col-md-4 text-left">
					<el-select v-model="provinceId"  name="provinceId" placeholder="请选择" @change="selectProvince">
						<el-option v-for="item in provinceOptions" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="col col-md-4 text-left">
					<el-select v-model="cityId" name="cityId" placeholder="请选择" @change="selectCity">
						<el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="col col-md-4 text-left">
					<el-select v-model="districtId" name="districtId" placeholder="请选择">
						<el-option v-for="item in districtOptions" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				</div>
			</div>
		</div>
	
		<div class="row" style='padding-top:30px'>
			<div class="col col-md-1">
				
			</div>
			<div class="col col-md-2 text-left">
				<span class='t2'>详细地址：</span>
			</div>
			<div class="col col-md-6 text-left">
				<el-input type="textarea" v-model="addr" style='width:90%'></el-input>
			</div>
		</div>

		<div class="row" style='padding-top:30px'>
			<div class="col col-md-1">
				
			</div>
			<div class="col col-md-10 text-center">
				<el-button type='primary' @click='save()'>保存</el-button>
			</div>
		</div>

	</div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
export default {
	mounted() {
		 this.provinceOptions = this.getData("province", null);
		this.getUserInfo();
	},
	data() {
		return {
			nickName: '',
			userName: '',
			email: '',
			telephone: '',
			sex: 2,
			addr: '',
			provinceId: '',
			cityId: '',
			districtId: '',
			emailStatus: 0,
			provinceOptions: [],
			cityOptions: [],
			districtOptions: []
		}
	}, methods: {
		getUserInfo() {
			let self = this;
			axios.get('/home/user/user_info').then(function (res) {
				if(Number(res.data.ret)==0){
					var info = res.data.data;
				self.nickName = info.nickName;
				self.userName = info.userName;
				self.email = info.email;
				self.telephone = info.telephone;
				self.addr = info.addr;
				self.sex = info.sex;
				self.emailStatus = info.emailStatus;
				self.provinceId = info.provinceId;
				self.cityId = info.cityId;
				self.districtId = info.districtId;
				}
			});
		},
		getData(type, id) {
			let self = this;
			var arrList = new Array();
			var url = "/home/region?type=" + type;
			if (id != null) {
				url += "&id=" + id;
			}
			axios.get(url).then(function (res) {

				if (res.status == 200 && res.data.ret == 0) {
					var datas = res.data.data;
					for (var i = 0; i < datas.length; i++) {
						var obj = { id: datas[i].id, name: datas[i].districtName };
						arrList.push(obj);
					}
				}
				if (type == 'district') {
					self.districtOptions = arrList;
					self.districtOptions.map(function (item) {
						return { value: item.id, label: item.name }
					});
				} else if (type == 'city') {
					self.cityOptions = arrList;
					self.cityOptions.map(function (item) {
						return { value: item.id, label: item.name }
					});
				} else if (type == 'province') {
					self.provinceOptions = arrList;
					self.provinceOptions.map(function (item) {
						return { value: item.id, label: item.name }
					});
				}
			});
			return arrList;
		}, selectProvince(query) {
			if(this.provinceId != null){
				this.getData("city", this.provinceId);
			}
		}, selectCity(query) {
			if(this.cityId != null){
				this.getData("district", this.cityId);
			}
		}, save() {
			let self = this;
			var user = { nickName: self.nickName, telephone: self.telephone, addr: self.addr, sex: self.sex, provinceId: self.provinceId, cityId: self.cityId, districtId: self.districtId };
			axios.post('/home/user/user_post_info', user)
				.then(function (response) {
					if (response.data.ret == 0) {
						self.$alert("更新成功!", '提示', { confirmButtonText: '确定' });
					} else {
						self.$alert(response.data.msg, '提示', { confirmButtonText: '确定' });
					}
				});
		}
	}
}
</script>