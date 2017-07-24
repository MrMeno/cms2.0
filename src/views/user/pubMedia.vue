<template>
	<div style='padding:30px'>
		<div class="row" style='padding-top:20px'>
			<div class="col col-md-12 text-left">
				<span class='t1'>发布媒体</span>
			</div>
		</div>
		<div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>影视剧名称</span>
			</div>
			<div class="col col-md-6 text-left">
				<span class='t2'>题材类型</span>
			</div>
		</div>

		  <div class="row" style='padding-top:10px'>
			<div class="col col-md-6 text-left">
				<el-input style='width:90%' v-model='name' placeholder='请输入影视剧名称'></el-input>
			</div>
			<div class="col col-md-6 text-left">	
            <el-select v-model="dramaType" style='width:90%' multiple filterable placeholder="请选择类型" :loading="loading">
                 <el-option  v-for="item in dramaTypeList"   :key="item.value"  :label="item.label"  :value="item.value">
             </el-option>
           </el-select>
			</div>
		  </div>

			<div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>导演</span>
			</div>
			<div class="col col-md-6 text-left">
				<span class='t2'>编剧</span>
			</div>
		   </div>

		   <div class="row" style='padding-top:10px'>
			<div class="col col-md-6 text-left">
	       <el-select v-model="director" style='width:90%' multiple filterable allow-create  remote placeholder="请选择导演"  
         :remote-method="remoteDirector"  :loading="loading">
                 <el-option  v-for="item in directorOps"   :key="item.value"  :label="item.label"  :value="item.value">
             </el-option>
           </el-select>
			</div>
			<div class="col col-md-6 text-left">
				   <el-select v-model="writer" style='width:90%' multiple filterable allow-create  remote placeholder="请选择编剧"  
           :remote-method="remoteWriter"  :loading="loading">
                 <el-option  v-for="item in writerOps"   :key="item.value"  :label="item.label"  :value="item.value">
             </el-option>
           </el-select>
			</div>
		  </div>

		  	  <div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>主演</span>
			</div>
		   </div>


		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-left">
				 <el-select v-model="actor" style='width:95%' multiple filterable allow-create  remote placeholder="请选择主演"  :remote-method="remoteActor"  :loading="loading">
                 <el-option  v-for="item in actorOps"   :key="item.value"  :label="item.label"  :value="item.value">
             </el-option>
           </el-select>
			</div>
		  </div>

		  <div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>制片地区</span>
			</div>
			<div class="col col-md-6 text-left">
				<span class='t2'>语言</span>
			</div>
		   </div>

		   <div class="row" style='padding-top:10px'>
			<div class="col col-md-6 text-left">
				<el-select v-model="area" style='width:90%' filterable placeholder="请选择地区">
				 <el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
               </el-select>
			</div>
			<div class="col col-md-6 text-left">
				<el-select v-model="language" style='width:90%' filterable placeholder="请选择语言">
				 <el-option v-for="item in languageList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
               </el-select>
			</div>
		  </div>

        <div class="row" style='padding-top:20px'>
      <div class="col col-md-6 text-left">
        <span class='t2'>出品公司</span>
      </div>
      <div class="col col-md-6 text-left">
        <span class='t2'>媒体类型</span>
      </div>
       </div>

         <div class="row" style='padding-top:10px'>
      <div class="col col-md-6 text-left">
        <el-select v-model="company" style='width:90%' multiple filterable remote placeholder="请选择出品公司" :remote-method="remoteCompany">
         <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
               </el-select>
      </div>
      <div class="col col-md-6 text-left">
        <el-select v-model="mediaType" style='width:90%' filterable placeholder="请选择媒体类型">
          <el-option v-for="item in medias"  :key="item.value"   :label="item.label"  :value="item.value">
               </el-option>
               </el-select>
      </div>
      </div>

		    	  <div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>播放平台</span>
			</div>
		   </div>


		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-left">
					 <el-select v-model="plat" style='width:95%' multiple filterable  remote placeholder="请选择平台"  :remote-method="remotePlat"  :loading="loading">
                 <el-option  v-for="item in platOps"   :key="item.value"  :label="item.label"  :value="item.value">
             </el-option>
           </el-select>
			</div>
		  </div>

		  <div class="row" style='padding-top:20px'>
			<div class="col col-md-3 text-left">
				<span class='t2'>开机时间</span>
			</div>
			<div class="col col-md-3 text-left">
				<span class='t2'>上映时间</span>
			</div>
        <div class="col col-md-3 text-left">
        <span class='t2'>截止日期</span>
      </div>
		   </div>

		   <div class="row" style='padding-top:10px'>
			<div class="col col-md-3 text-left">
				 <el-date-picker v-model="startDate" type="date" placeholder="选择日期" >
                  </el-date-picker>
			</div>
			<div class="col col-md-3 text-left">
				 <el-date-picker v-model="endDate" type="date" placeholder="选择日期">
                  </el-date-picker>
			</div>

      <div class="col col-md-3 text-left">
         <el-date-picker v-model="deadline"  type="datetime" placeholder="选择日期">
                  </el-date-picker>
      </div>
		  </div>

		   	  <div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>植入品类</span>
			</div>
		   </div>


		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-left">
				<el-select v-model="adver" style='width:95%' multiple filterable  placeholder="请选择植入品类">   
				 <el-option v-for="item in adverList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
               </el-select>
			</div>
		  </div>

		  	  <div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>项目优势</span>
			</div>
		   </div>


		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-left">
				<el-input type='textarea'  v-model="advantage"  style='width:95%'><el-tag></el-tag></el-input>
			</div>
		  </div>


 	          <div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>故事梗概</span>
			</div>
		   </div>


		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-left">
				<el-input type='textarea' v-model="introduction"  style='width:95%'><el-tag></el-tag></el-input>
			</div>
		  </div>

		<div class="row" style='padding-top:20px'>
			 <div class="col col-md-12 text-left">
				 <span class='t2'>封面图片（格式为jpg，png，gif文件，大小不超过3MB、424*600像素）</span>
			 </div>
		</div>


		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-left">
				<el-upload class="avatar-uploader" ref='upload' action='/home/file'  :data="{businessType:'cmsDramaPic'}" 
         :show-file-list="true" :file-list='coverFile'  
          :auto-upload="true"  list-type='picture-card'  :before-upload="beforeAvatarUpload" :on-change="getFile"
                     :on-remove="handleRemove" accept='image' :on-success='saveUrl'>
                  <img v-if="imageUrl"  :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
         </el-upload>

			</div>
		  </div>

		   <div class="row" style='padding-top:20px'>
			<div class="col col-md-12 text-left">
				<span class='t2'>相关宣传照（格式为jpg，png，gif文件，大小不超过3MB、424*600像素）</span>
			</div>
		   </div>

		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-left">
				<el-upload class="avatar-uploader" ref='upload' action="/home/file" :data="{businessType:'cmsDramaDetailPic'}" 
         :show-file-list="true" list-type="picture-card"  :file-list='listFile' :auto-upload="true" 
          :before-upload="beforeAvatarUpload" :on-change="getFile2" :on-success='saveUrl2'>
                   <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
			</div>
		  </div>

		   <div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>招商方案</span>
			</div>
		   </div>

		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-1 text-right">		
				  <span class='el-icon-upload2'></span>
           
			</div>
			<div class="col col-md-2 text-left">
				    <el-upload class="upload-demo" ref="upload_3"  action="home/attract" 
                       :on-remove="handleRemove" :file-list="planFile"  :on-change="getFile3" :auto-upload="false"> 
                     <a>上传招商方案</a>       
               </el-upload>
			</div>
		  </div>
		  <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-center">
			<el-button type='danger' @click='submitAll'>确认提交</el-button>
			</div>
		  </div>
	</div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
export default{
    mounted() {
 	    let self=this;  
 	    this.directorList=this.getDATA('director');
 	    this.actorList=this.getDATA('actor');
 	    this.writerList=this.getDATA('writer');
 	    this.areaList=this.getDATA('area');
 	    this.languageList=this.getDATA('language');
 	    this.adverList=this.getDATA('adver');
 	     this.dramaTypeList=this.getDATA('drama');
       this.companyList=this.getDATA('company');
       this.platList=this.getDATA('plat');
    },
    components:{
    },
	data(){//以后把select2数据，临时数据，选中数据封装成一个大的类
		return {
			name:'',
			type:'',
      mediaType:'',
      medias:[
      {value:1,label:'电视剧'},
      {value:2,label:'电影'},
      {value:3,label:'综艺'},
      {value:4,label:'网络类型'}],
			list: {a:[],b:[],c:[],d:[],//select2临时搜索的中间数据
        e:[],f:[],g:[],h:[],i:[],j:[]},
      loading: false,
      deadline:'',
      dramaType:[],
      dramaTypeList:[],
			director:[],//选中的数据
			directorOps:[],//查询出的临时数据
			directorList:[],//存放根数组数据
			writer:[],
			writerOps:[],
			writerList:[],  		
			actor:[],
			actorOps:[],
			actorList:[],
			area:'',
      params:{id:'',doType:0},
			areaList:[],
			language:'',
			languageList:[],
      company:[],
      companyList:[],

      companyOps:[],
      plat:[],
      platOps:[],
      platList:[],    
			startDate:'',
			endDate:'',
			adver:[],
			adverList:[],
			imageUrl:'',
      serverUrl:'',
      serverUrl2:'',
      imageUrl2:'',
		  advantage:'',
		  introduction:'',
      inputVisible: false,
      inputValue: '',
      coverFile:[],
      listFile:[],
      planFile:[]
		}
	},
   watch:{//值变化之后执行此方法监听
   
   },
	methods:{
          getDATA(type){//获取staff数据
            	let self=this;
             var arrList=new Array();
            	if(type=='director')
            	{
                 axios.get('/home/select?type=2').then(function(res){
                 	if(res.status==200){
                 		var datas=res.data; 
                 		for(var i=0;i<datas.length;i++)
                 		{
                 			var oj={name:datas[i].text,id:datas[i].id};
                 			arrList[i]=oj;
                 		}
                 		 self.list.a = self.directorList.map(function(item)//最好能在mounted中赋值，但是axios必须是同步，否则无法获取到值
	    	            {
	    		           return{value: item.id, label: item.name }
	    	             });
                 	}
                 	else{
                 		self.$alert("网络异常，请重试")
                 	}
                  });
            	}
               else if(type=='actor'){
                    axios.get('/home/select?type=1').then(function(res){
                	if(res.status==200){
                 		var datas=res.data;
                 		for(var i=0;i<datas.length;i++)
                 		{
                 			var oj={name:datas[i].text,id:datas[i].id};//{id:datas[i].id,name:datas[i].nameZh}
                 			arrList.push(oj);
                 		}
                 		self.actorList=arrList;
                 		 self.list.b = self.actorList.map(function(item)//最好能在mounted中赋值，但是axios必须是同步，否则无法获取到值
	    	            {
	    		           return{value: item.id, label: item.name }
	    	             });

                 	}
                  });
                 }
               else if(type=='writer')
                {
            	  axios.get('/home/select?type=3').then(function(res){
               	if(res.status==200){
                 		var datas=res.data; 
                 		for(var i=0;i<datas.length;i++)
                 		{
                 			var oj={id:datas[i].id,name:datas[i].text}
                 			arrList.push(oj);
                 		}
                 		self.writerList=arrList;
                 		 self.list.c = self.writerList.map(function(item)//最好能在mounted中赋值，但是axios必须是同步，否则无法获取到值
	    	            {
	    		           return{value: item.id, label: item.name }
	    	             });
                 	}
                  });
                }
                else {
                 axios.get('/home/select?type='+type).then(function(res){
                  if(res.status==200){
                    var datas=res.data;

                    for(var i=0;i<datas.length;i++)
                    {
                      var oj={label:datas[i].text,value:datas[i].id}
                      arrList.push(oj);
                   }

                    if(type=='company'){//通用接口获取数据，需要remote的接口在此添加声明
                       self.companyList=arrList;
                        self.list.i = self.companyList.map(function(item)
                        {
                         return{value: item.value, label: item.label }
                        });
                    }
                    else if(type=='plat'){
                      self.platList=arrList;
  
                     self.list.j = self.platList.map(function(item)
                    {
                     return{value:item.value , label:item.label}
                     });
                    }
                 }
              });
                }
                return arrList;
          },

      // getUserInfo(){
      //       axios.get('/home/user/user_info').then(function(res){
      //            console.log(res.data)
      //        });
      // },
        remoteDirector(query) {
         if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.directorOps = this.list.a.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.directorOps = [];
        }
      },
       remoteActor(query) {
         if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.actorOps = this.list.b.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.actorOps = [];
        }
      },
      remoteCompany(query){
                   if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.companyOps = this.list.i.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.companyOps = [];
        }
      },
      saveUrl(response,file,fileList){
        let self=this;
        if(Number(response.ret)==0)
           {self.serverUrl=response.msg;}
         else{
            
         }
      },
      saveUrl2(response,file,fileList){
        let self=this;
        if(Number(response.ret)==0)
           {self.serverUrl2=response.msg;}
         else{
            
         }
      },
         remotePlat(query){
            if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.platOps = this.list.j.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.platOps = [];
        }
      },
       remoteWriter(query) {
         if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.writerOps = this.list.c.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.writerOps = [];
        }
      },
       handleAvatarSuccess(res, file) {//图片上传方法
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        //const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleRemove(file, fileList) {
      },
      getFile(file, fileList){

        this.coverFile=[file];
        // this.sumits();
      },
      sumits(){
        this.$refs.upload_1.submit()
      },
      getFile2(file, fileList){
        this.listFile=[file];
      },
       getFile3(file, fileList){
        this.planFile=[file]
      },
      submitAll(){
        var self=this;
        var id='';
        Date.prototype.Format = function (fmt) { //author: meizz 
       var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
        };
       if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
       for (var k in o)
       if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
       }
       var date1='';
       var date2='';
       var date3='';
       if(self.startDate!=''){
        date1=self.startDate.Format('yyyy-MM-dd')
       }
       if(self.endDate!=''){
        date2=self.endDate.Format('yyyy-MM-dd')
       }
       if(self.deadline!=''){
        date3=self.deadline.Format('yyyy-MM-dd hh:mm:ss')
       }

        var data={
          name:this.name,
          actors:this.actor.join(','),//演员
          screenwriters:this.writer.join(','),//编剧
          directors:this.director.join(','),
          companyId:this.company.join(','),//公司
          languageId:this.language,//语言
          areaId:this.area,//地区
          planPlatformId:this.plat.join(','),
          beginShootDate:date1,//开机时间
          releaseDate:date2,//上映时间
          synopsis:this.introduction,//故事梗概
          plot:this.advantage,//项目优势
          dramaTypes:this.dramaType.join(','),//题材类型
          adverTypes:this.adver.join(','),//植入品类
          type:this.mediaType,//媒体类型
          deadline:date3,//
          picUrl:this.serverUrl,//封面图片
          detailPicUrl:this.serverUrl2//海报
        }
         axios.post('/home/uploadMedia',data).then(function(res){
             if(res.data.ret==0)
             {            
                 id=res.data.msg;
                 if(self.planFile.length>0)
                 {
                 var fd=new FormData();
                 fd.append('file',self.planFile[0].raw);
                 axios.post('/home/attract?id='+id,fd).then(function(ress){
                      if(ress.data.ret==0){
                           self.$alert('媒体发布成功', {
                            callback: action => {
                                 self.$router.push({path:'/userCenter/dramaList'});
                            }
                           })
                      }
                      else{
                        self.$alert('媒体发布失败')
                      }
                 })
               }
               else{
                self.$alert('媒体发布成功')
               }
             }
           else{
            self.$alert('媒体发布失败')
           }
         });
         
      }
	}
}
</script>
<style>
	.t1{
		border-left:2px solid #e40011;
		font-size: 15px;
	}
	.t2{
          font-size: 13px;
          color:#999;
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
   .el-upload__input{
  	display: none
  }

</style>