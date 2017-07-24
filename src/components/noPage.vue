<template>
<div class="container" style='padding-top:20px'>
	<div class="row" style='min-height: 700px;background-color: white;padding-top: 90px'>
	<div class="col col-md-5 text-right">
		<img src="../../public/img/404.png" alt="" >
	</div>
	<div class="col col-md-7 text-left">
		<div class="row" style='padding: 100px 70px;'>
			<p style='font-size: 18px;color:#333;font-weight: 600'><span style='color:#ff3f3f;font-size: 24px;padding-right: 5px'>Error404</span>抱歉，您要访问的页面不存在</p>
			<p style='font-size: 14px;color:#666'>有可能我们的网页正在维护或者您输入的网址不正确</p>
		   <p style='font-size: 14px;color:#666'>您可以: <el-button type="danger" @click='toMain'>返回首页</el-button>或者<a style='color:red' onClick="javascript :history.back(-1);">刷新页面</a></p>
		   <p style='font-size: 14px;color:#666'>若您长时间无法正常使用，您可以联系客服 <span style='color:#ff3f3f'>400-825-7355</span></p>
		</div>
	</div>
</div>
</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
			toMain()
			{
				this.$router.push({path:'/main'})
			}

		}
	}
</script>
<style>
	.danger-btn {
    background-color: #ff3f3f;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    width:100px;
    height: 40px;
    outline:none;
    border:solid 1px white;
    margin: 10px;
    color: white;
}

</style>
