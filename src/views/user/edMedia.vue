<template>
	<div class="container-fuild" style='padding:20px'>
		<div class="row">
			<div class="col col-md-12">
				<div class="row" style='padding-top:20px'>
			      <div class="col col-md-12 text-left">
				<span class='t1'>编辑媒体信息</span>
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
				<el-input style='width:90%' v-model='data.name' placeholder='请输入影视剧名称'></el-input>
			   </div>
			   <div class="col col-md-6 text-left">	
                 <el-select v-model="dramaType" style='width:90%'  multiple filterable placeholder="请选择类型" :loading="loading">
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
				 <el-date-picker v-model="deadline" type="datetime" placeholder="选择日期">
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
				<el-input type='textarea' :autosize="{ minRows: 5, maxRows: 10}"  v-model="advantage"  style='width:95%'><el-tag></el-tag></el-input>
			</div>
		  </div>

		        <div class="row" style='padding-top:20px'>
			<div class="col col-md-6 text-left">
				<span class='t2'>故事梗概</span>
			</div>
		   </div>


		     <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-left">
				<el-input type='textarea'  :autosize="{ minRows: 5, maxRows: 10}" v-model="introduction"  style='width:95%'><el-tag></el-tag></el-input>
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
				    <el-upload class="upload-demo" ref="upload_3"  action="/home/upload" 
                       :on-remove="handleRemove" :file-list="planFile" :on-change="getFile3" :auto-upload="false"> 
                     <a>上传招商方案</a>       
               </el-upload>
			</div>
		  </div>

		    <div class="row" style='padding-top:10px'>
			<div class="col col-md-12 text-center">
			<el-button type='danger' @click='submitAll'>保存修改</el-button>
			</div>
		  </div>
		</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default{
	data(){
		return{
			name:'',
			id:this.$route.query.id,
			loading:false,
			data:[],
			dramaType:[],
			dramaTypeList:[],
			director:[],
			directorList:[],
			directorOps:[],
			actor:[],
			actorList:[],
			actorOps:[],
			writer:[],
			writerList:[],
			writerOps:[],
			area:[],
			areaList:[],
			advantage:'',
			introduction:'',
			 mediaType:'',
            medias:[
             {label:'电视',value:1},
             {label:'电影',value:2},
             {label:'综艺',value:3},
             {label:'网络类型',value:4}],
			language:[],
			languageList:[],
			adver:[],
			adverList:[],
			companyList:[],
			company:[],
			platList:[],
			plat:[],
			platOps:[],
			startDate:'',
			endDate:'',
			deadline:'',
		    list: {a:[],b:[],c:[],d:[],//select2临时搜索的中间数据
              e:[],f:[],g:[],h:[],i:[],j:[]},
            imageUrl:'',
            imageUrl2:'',
            params:{id:'',doType:0},
            coverFile:[],
            listFile:[],
            planFile:[],
            serverUrl:'',
            serverUrl2:''
		}
	},
	mounted(){
      this.getData();
      this.directorList=this.getDATA('director');
 	    this.actorList=this.getDATA('actor');
 	    this.writerList=this.getDATA('writer');
 	    this.areaList=this.getDATA('area');
 	    this.languageList=this.getDATA('language');
 	    this.adverList=this.getDATA('adver');
 	     this.dramaTypeList=this.getDATA('drama');
       this.companyList=this.getDATA('company');
       this.platList=this.getDATA('plat');
       console.log(this.platList)
	},
	methods:{
		getData(){
			let self=this;
             axios.get('/home/media?id='+self.id).then(function(res){
                   console.log(res)
                   if(Number(res.data.ret)==0)
                   {
                   	self.data=res.data.data;
                   	self.name=self.data.name;
                   	   if(self.data.dramaTypes!=null)self.dramaType=self.data.dramaTypes.split(',')
                        else self.dramaType=self.data.dramaTypeList.map(function(item)
                        	{return item.drama_type_id })
                        if(self.data.directors!=null)self.director=self.data.directors.split(',')
                        else self.director=self.data.directorList.map(function(item)
                        	{return item.staff_name }) 
                        if(self.data.screenwriters!=null)self.writer=self.data.screenwriters.split(',')
                        else self.writer=self.data.screenwriterList.map(function(item)
                        	{return item.staff_name })  
                        if(self.data.actors!=null)self.actor=self.data.actors.split(',')
                        else self.actor=self.data.actorList.map(function(item)
                        	{return item.staff_name })  
                        if(self.data.areaId!=null)self.area=self.data.areaId.split(',')[0]
                        else self.area=self.data.areaList.map(function(item)
                        	{return item.id }) 
                        	  if(self.data.languageId!=null)self.language=self.data.languageId.split(',')[0]
                        else self.language=self.data.languageId 	
                        if(self.data.companyId!=null)self.company=self.data.companyId.split(',')
                        else self.company=self.data.companyList.map(function(item)
                        	{return item.companyId }) 
                        self.mediaType=self.data.type;
                         self.plat=self.data.platformList.map(function(item)
                        	{return item.name })  	
                        	self.startDate=self.data.beginShootDate;
                        	//var endD=new Date(self.data.releaseDate);
                        	self.endDate=self.data.releaseDate	 
                        	self.deadline=self.data.deadline	 
                        if(self.data.adverTypes!=null)self.adver=self.data.companyId.split(',')
                        else self.adver=self.data.adverTypeList.map(function(item)
                        {return item.adver_type_id}) 
                        self.advantage=self.data.plot;	
                        self.introduction=self.data.synopsis;
                        self.imageUrl=self.data.picUrl;	
                        self.imageUrl2=self.data.detailPicUrl;
                   }
             })
		},
	 getDATA(type){//获取staff数据
            	let self=this;
             var arrList=new Array();
            	if(type=='director')
            	{
                 axios.get('/home/select?type=2').then(function(res){
                  console.log(res);
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
         saveUrl(response,file,fileList){
        let self=this;
        console.log(response)
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
        console.log(file, fileList);
      },
       getFile(file, fileList){
        this.imageUrl='';
        this.coverFile=[file];
        // this.sumits();
        console.log(file)
      },
      sumits(){
        this.$refs.upload_1.submit()
      },
      getFile2(file, fileList){
        this.listFile=[file];
         this.imageUrl2='';
       console.log(file, fileList);
      },
       getFile3(file, fileList){
        this.planFile=[file]
       console.log(file, fileList);
      },
      // submitAll(){
      // 	let self=this;
      // 	var data={
      // 	  actors:this.actor.join(','),//演员
      //     screenwriters:this.writer.join(','),//编剧
      //     companyId:this.company.join(','),//公司
      //     languageId:this.language,//语言
      //     areaId:this.area,//地区
      //     beginShootDate:self.format(self.startDate),//开机时间
      //     releaseDate:self.format(self.endDate),//上映时间
      //     synopsis:this.introduction,//故事梗概
      //     plot:this.advantage,//项目优势
      //     dramaTypes:this.dramaType.join(','),//题材类型
      //     adverTypes:this.adver.join(','),//植入品类
      //     type:this.mediaType,//媒体类型
      //     labels:[],//便签
      //     investmentPlan:this.planFile,//招商方案
      //     deadline:self.format(self.deadline),//
      //     picUrl:this.serverUrl,//封面图片
      //     detailPicUrl:this.serverUrl2,//海报
      //     id:self.id
      // 	}
      // 	var fd=new FormData();
      // 	fd.append('data',data);
      // 	    axios.post('/home/updateMedia',fd).then(function(res){
      //        if(res.data.ret==0)
      //        {
      //         console.log(res);      
      //         self.$nextTick(function(){
      //            self.params.id=res.data.msg;
      //          })
      //          self.$alert("修改媒体信息成功","提示");
              
      //        }
      //      else{
      //       self.$alert("修改媒体信息失败","提示");
      //      }
      //    });

      // }
     submitAll(){
         var self=this;
        var id='';
        Date.prototype.Format=function (fmt) {
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
       	var val = Date.parse(self.startDate);
          var newDate = new Date(val);
        date1=newDate.Format('yyyy-MM-dd')
       }
       if(self.endDate!=''){
       	var val = Date.parse(self.endDate);
          var newDate = new Date(val);
        date2=newDate.Format('yyyy-MM-dd')
       }
       if(self.deadline!=''){
       	var val = Date.parse(self.deadline);
          var newDate = new Date(val);
        date3=newDate.Format('yyyy-MM-dd hh:mm:ss')
       }
        var data={
          name:this.name,
          id:self.id,
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
          deadline:date3,//截止日期
          picUrl:this.serverUrl,//封面图片
          detailPicUrl:this.serverUrl2//海报
        }
        console.log(data);
         axios.post('/home/updateMedia',data).then(function(res){
             if(res.data.ret==0)
             {            
                 id=res.data.msg;
                 if(self.planFile.length>0)
                 {
                 var fd=new FormData();
                 fd.append('file',self.planFile[0].raw);
                 axios.post('/home/attract?id='+id,fd).then(function(ress){
                      if(res.data.ret==0){
                           self.$alert('媒体信息修改成功', {
                            callback: action => {
                                 self.$router.push({path:'/userCenter/dramaList'});
                            }
                           })
                      }
                      else{
                        self.$alert('修改失败')
                      }
                 })
               }
               else{
                self.$alert('媒体信息修改成功', {
                            callback: action => {
                                 self.$router.push({path:'/userCenter/dramaList'});
                            }
                           })
               }
             }
           else{
            self.$alert('修改失败')
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