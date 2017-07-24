<template>
	 <div class="container-fluid" style='padding-top:10px' v-loading.fullscreen.lock="fullscreenLoading">
	 	<div class="row" >
	 		<div class="col col-md-2">
	 			
	 		</div>
	 		<div class="col col-md-8">
               <div class="row" style='padding:30px;background-color:white;'>
               	  <div class="col col-md-4">
               	  	<img :src="data.pic_url"  class='pic' alt="">
               	  </div>
               	  <div class="col col-md-4">
               	  	  <div class="row">
               	  	  	<div class="col col-md-12 text-left">
               	  	  		<h3>{{data.name}}</h3>
               	  	  	</div>
               	  	  </div>

               	  	   <div class="row" style='padding-top:10px'>
               	  	  	<div class="col col-md-4 text-left">
               	  	  		<span class="silver">导演</span>
               	  	  	</div>
               	  	     <div class="col col-md-6 text-left" v-if='director.length!=0'>
                          <span v-for='(s,index) in data.director_list'>
                            <span>{{ s.staff_name+(index!=(data.director_list.length-1)?'/':'') }}</span>
                          </span>
                        </div>
                       <div class="col col-md-6 text-left" v-else>
                          <span>暂未拟定</span>
                        </div> 
               	  	  </div>

               	  	     <div class="row" style='padding-top:10px'>
               	  	  	<div class="col col-md-4 text-left">
               	  	  		<span class="silver">编剧</span>
               	  	  	</div>
               	  	  	<div class="col col-md-6 text-left" v-if='writer.length!=0'>
               	  	  		<span v-for='(s,index) in data.screenwriter_list'>
               	  	  			<span>{{ s.staff_name+(index!=(data.screenwriter_list.length-1)?'/':'') }}</span>
               	  	  		</span>
               	  	  	</div>
                         <div class="col col-md-6 text-left" v-else>
                          <span>暂未拟定</span>
                        </div> 
               	  	  </div>
                       

               	  	     <div class="row" style='padding-top:10px'>
               	  	  	<div class="col col-md-4 text-left">
               	  	  		<span class="silver">主演</span>
               	  	  	</div>
               	  	  	<div class="col col-md-6 text-left" v-if='actor.length!=0' >
               	  	  		<span v-for='(s,index) in data.actor_list'>
               	  	  			<span>{{ s.staff_name+(index!=(data.actor_list.length-1)?'/':'') }}</span>
               	  	  		</span>
               	  	  	</div>
                        <div class="col col-md-6 text-left" v-else>
                          <span>暂未拟定</span>
                        </div> 
               	  	  </div>
               	  	    <div class="row" style='padding-top:10px'>
               	  	  	<div class="col col-md-4 text-left">
               	  	  		<span class="silver">出品公司</span>
               	  	  	</div>
               	  	  	<div class="col col-md-6 text-left">
               	  	  		<span v-for='(s,index) in data.companyList'>
               	  	  			<span>{{ s.companyName+(index!=(data.companyList.length-1)?'/':'') }}</span>
               	  	  		</span>
               	  	  	</div>
               	  	  </div>

               	  	      <div class="row" style='padding-top:10px'>
               	  	  	<div class="col col-md-4 text-left">
               	  	  		<span class="silver">类型</span>
               	  	  	</div>
               	  	  	<div class="col col-md-6 text-left">
               	  	  		<span v-for='(s,index) in data.drama_type_list'>
               	  	  			<span>{{ s.drama_type_name+(index!=(data.drama_type_list.length-1)?'/':'') }}</span>
               	  	  		</span>
               	  	  	</div>
               	  	  </div>

               	  	     <div class="row" style='padding-top:10px'>
               	  	  	<div class="col col-md-4 text-left">
               	  	  		<span class="silver">开机时间</span>
               	  	  	</div>
               	  	  	<div class="col col-md-6 text-left">
               	  	  		<span>{{data.begin_shoot_date}}</span>
               	  	  	</div>
               	  	  </div>

                      <div class="row" style='padding-top:10px'>
               	  	  	<div class="col col-md-4 text-left">
               	  	  		<span class="silver">上映时间</span>
               	  	  	</div>
               	  	  	<div class="col col-md-6 text-left">
               	  	  		<span>{{data.release_date}}</span>
               	  	  	</div>
               	  	  </div>

               	  	  <div class="row" style='padding-top:20px'>
               	  	  	<div class="col col-md-6 text-left">
               	  	  		 <a class="btn-group" role="group" aria-label="..." :href='hostName+id' v-if='data.attractInvestment'>
                                <button type="button" class="btn" style='background-color: #2581d8;color:white;'><span class="glyphicon glyphicon-arrow-down"></span></button>
                                <button type="button" class="btn" style='background-color: #5098e0;color:white;'>招商方案
                                </button>
                            </a>
               	  	  	</div>
               	  	  	<div class="col col-md-6 text-left">
               	  	  		<a href='#ader' name='ader'>
               	  	  			<el-button :plain="true" style='width:122px' type="info">咨询</el-button>
               	  	  		</a>
               	  	  	</div>
               	  	  </div>


               	  </div>
               	  <div class="col col-md-4">
               	  	   <div class="row" style="padding-top:150px">
                        <div class="time_counter">
                        <counter :endTime="data.deadline"></counter>
                       </div>
                      </div>
               	  </div>
               </div>

               <div class="row" style='padding-top:20px'>
                   <div class="col col-md-12">                   	
                   	   <div class="row text-left" style="background-color: white;padding-top: 20px">
                     <div class="col col-md-12">
                     <div class="row" style='padding-left: 20px'>
                    <div class="col col-md-12">
                    <strong style="border-bottom:solid 2px black">项目优势</strong>
                      </div>
                   </div>
                   <div class="row" style='padding: 20px'>
                         <div class="col col-md-12 text-left">
                    <p style='line-height: 30px' v-html='data.plot'></p>
                        </div>
                       </div>
                        </div>
                   </div>
                   </div>
               </div>
               
                <div class="row" style='padding-top:20px'>
                   <div class="col col-md-12">                   	
                   	   <div class="row text-left" style="background-color: white;padding-top: 20px">
                     <div class="col col-md-12">
                     <div class="row" style='padding-left: 20px'>
                    <div class="col col-md-12">
                    <strong style="border-bottom:solid 2px black">故事梗概</strong>
                      </div>
                   </div>
                   <div class="row" style='padding: 20px'>
                         <div class="col col-md-12 text-left">
                    <p style='line-height: 30px' v-html='data.synopsis'></p>
                        </div>
                       </div>
                        </div>
                   </div>
                   </div>
               </div>

                <div class="row" style='padding-top:20px'>
                   <div class="col col-md-12">                   	
                   	   <div class="row text-left" style="background-color: white;padding-top: 20px">
                     <div class="col col-md-12">
                     <div class="row" style='padding-left: 20px'>
                    <div class="col col-md-12">
                    <strong style="border-bottom:solid 2px black">植入品类</strong>
                      </div>
                   </div>
                   <div class="row" style='padding: 20px'>
                         <div class="col col-md-1 text-center" v-for="s in data.adver_type_list" style="padding-bottom: 20px">
                           <span class="label-1" v-html="s.adver_type_name"></span>
                           </div>
                       </div>
                        </div>
                   </div>
                   </div>
               </div>

               <div class="row" style="padding-top:20px;margin-bottom:20px;">
               <div class="col col-md-12">
                 <div class="row" style='background-color: white;padding-top: 20px'>
                 	<div class="col col-md-12">
                 		 <div class="row" style="padding-left: 20px;padding-top: 20px;">
                <div class="col col-md-12  text-left">
                    <strong style="border-bottom:solid 2px black">联系我们</strong>
                </div>
            </div>
            <div class="row">
                <div class="col col-md-12">
                    <div style='padding: 20px;text-align: center'>
                        <img src="../../public/img/map.png" style='width: 90%;height:auto'>
                    </div>
                </div>
            </div>
            <div class="row text-left" style="padding-left: 20px;padding-top: 20px;line-height: 30px">
                <div class="col col-md-1">
                </div>
                <div class="col col-md-4">
                    <div class="row">
                        <div class="col col-md-1 text-right">
                            <img src="../../public/svg/telephone.svg">
                        </div>
                        <div class="col col-md-11">
                            电话：400-825-7355
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-1">
                            <img src="../../public/svg/fax.svg" alt="">
                        </div>
                        <div class="col col-md-11">
                            传真：021-52342628
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-1">
                            <img src="../../public/svg/mail.svg" alt="">
                        </div>
                        <div class="col col-md-11">
                            邮箱：service@maxmedia.com
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-1">
                            <img src="../../public/svg/position.svg" alt="">
                        </div>
                        <div class="col col-md-11">
                            地址：上海市黄浦区打浦桥路1号金玉兰广场2010室
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-1">
                            <img src="../../public/svg/alarm.svg" alt="">
                        </div>
                        <div class="col col-md-11">
                            工作日：09:00-18:00 其他时间请留言
                        </div>
                    </div>
                </div>
                <div class="col col-md-1">
                </div>
                <div class="col col-md-5" id='ader' name='ader'>
                    <div class="form-group">
                        <div class="row">
                            <div class="col col-md-6">
                                <el-input type="text" placeholder="姓名" v-model="name"></el-input>
                            </div>
                            <div class="col col-md-6">
                                 <el-input type="text" placeholder="手机" v-model="phone"></el-input>
                            </div>
                        </div>
                        <div class="row" style='padding-top:20px'>
                            <div class="col col-md-12">
                                <el-input type="text" placeholder="品牌名称" v-model='dramaName' ></el-input>
                            </div>
                        </div>
                        <div class="row" style='padding-top:20px'>
                            <div class="col col-md-12">
                                 <el-input type="textarea" placeholder="植入需求" v-model='demand'></el-input>
                            </div>
                        </div>
                        <div class="row" style='padding-top:20px'>
                            <div class="col col-md-12">
                                <el-button @click='submits'>提交</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-md-1">
                </div>
            </div>
        </div>
                 	</div>
                 </div>
               </div>
	 		</div>
	 		<div class="col col-md-2">
	 			
	 		</div>
	 	</div>
	 </div>
</template>
<script>
import axios from 'axios'
import counter from '../components/counter.vue'
	export default{
		mounted(){
			this.loadData();
			    setTimeout(() => {
                   this.fullscreenLoading = false;
                  }, 1000);
            
		},
		data(){
			return{
				id:this.$route.query.id,
				data:[],
				fullscreenLoading: true,//loading 动画
				name:'',
				phone:'',
				dramaName:'',
				demand:'',
				hostName:'/home/download?id=',
        actor:[],
        director:[],
        writer:[]
			}
		},
		components:{
         counter
		},
		methods:{
			loadData(){
				let self= this;
             axios.get('/home/detail/drama?id='+this.id).
             then(function(res){
                if(res.data.ret==0){
                      self.data=res.data.data;
                      self.actor=res.data.data.actor_list;
                      self.director=res.data.data.director_list;
                      self.writer=res.data.data.screenwriter_list
                }
                else if(res.data.ret=='2002'){
                	self.$alert('页面内容需要登录后才能查看','提示')
                  self.$router.push({path:'/main'})
                }
             })
			},
			toDetailCop(){

			},
			submits(){
				let self=this;
				var data= { name:this.name, phone:this.phone, dramaId: this.id, demand:this.demand, dramaName:this.dramaName}
                axios.post('/home/advisory',data).then(function(res){
                         if(res.data.ret==0){

                              self.$alert('提交成功','提示')
                         }
                         else{
                               self.$alert("网络异常",'提示')
                         }
                })
			}
		}
	}
</script>
<style>
	.pic{
		width: 250px;
		height:350px;
	}
	.silver{
		color:#c6c6c6;
	}
	.time_counter {
    height: 40px;
    width: 60%;
    color:white;
    font-weight:600;
    line-height:40px;
    font-size:14px;
    background-color: black;
    left: 20%;
    top: 50%;
    position: absolute;
    opacity: 0.8;
}
.label-1 {
    display: block;
    padding: 1px;
    background-color: #f5f5f5;
    color: #4497d6;
    font-size: 12px
}
</style>