<template>
<div class="row" style='background-color:#f7f7f7;padding:50px;line-height:30px'>
    <div class="col col-md-12">
        <div class="row">
            <span class="tips"><router-link to='/help'>关于我们</router-link></span>
            <span class="tips"><router-link to='/help/job'>加入我们</router-link></span>
            <span class="tips"><router-link to='/help/news'>公司新闻</router-link></span>
            <span class="tips"> <router-link to='/help/links'>友情链接</router-link></span>
            <span class="tips"> <router-link to='/help/suggest'>意见反馈</router-link></span>
            <span class="tips"><router-link to='/help/connect'>联系我们</router-link></span>
        </div>
        <div class="row" style="color:#999">
            电话：400-825-7355
        </div>
        <div class="row" style="color:#999">
            传真：021- 52342628
        </div>
        <div class="row" style="color:#999">
            邮箱：service@meidameixiao.com
        </div>
        <div class="row" style="color:#999">
            地址：上海市黄浦区打浦路1号金玉兰广场2010室
        </div>
        <div class="row" style="color:#999">
            苏ICP备15058811号-1|营业执照|
        </div>
        <div class="row" style="color:#999">
            Copyright &nbsp;©meidameixiao&nbsp;2015;All Rights Reserved
        </div>
    </div>
</div>
</template>
<script>
     export default {
     name:'footers',
     props:['']
     }
</script>
<style>
.tips {
    text-decoration: none;
    color: black;
    padding: 5px 10px 5px 0px
}
.tips a{
    color:black;
    cursor:pointer;
}
</style>