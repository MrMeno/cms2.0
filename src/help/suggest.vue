<template>
    <div class="container-fluid" style='padding-top:10px;min-height:600px'>
        <div class="row text-center">
           <div class="col col-md-2 col-md-offset-1" style='background-color:white'>
        <div class="row " style='border-top:dashed 1px #eee;padding:20px'>
          <div class="col col-md-4 el-tree-node__content text-center">
               <img src="../../public/svg/help.svg" style='width:30px' alt="">
          </div>
          <div class="col col-md-8 el-tree-node__content text-left">
         <a href="/help" style="text-decoration: none">关于我们</a>
          </div>
        </div>
        <div class="row" style='border-top:dashed 1px #eee;padding:20px'>
           <div class="col col-md-4 el-tree-node__content text-center">
               <img src="../../public/svg/job.svg" style='width:30px' alt="">
          </div>
          <div class="col col-md-8 el-tree-node__content text-left">
            <a href="/help/job" style="text-decoration: none">加入我们</a>
          </div>
        </div>
        <div class="row" style='border-top:dashed 1px #eee;padding:20px'>
           <div class="col col-md-4 el-tree-node__content text-center">
               <img src="../../public/svg/news.svg" style='width:30px' alt="">
          </div>
          <div class="col col-md-8 el-tree-node__content text-left">
            <a href="/help/news" style="text-decoration: none">公司新闻</a>
          </div>
        </div>
        <div class="row" style='border-top:dashed 1px #eee;padding:20px'>
           <div class="col col-md-4 el-tree-node__content text-center">
               <img src="../../public/svg/link.svg" style='width:30px' alt="">
          </div>
          <div class="col col-md-8 el-tree-node__content text-left">
            <a href="/help/links" style="text-decoration: none">友情链接</a>
          </div>
        </div>
        <div class="row" style='border-top:dashed 1px #eee;padding:20px'>
           <div class="col col-md-4 el-tree-node__content text-center">
               <img src="../../public/svg/suggset.svg" style='width:30px' alt="">
          </div>
          <div class="col col-md-8 el-tree-node__content text-left">

            <a href="/help/suggest" style="text-decoration: none">意见反馈</a>
          </div>
        </div>
        <div class="row" style='border-top:dashed 1px #eee;padding:20px'>
           <div class="col col-md-4 el-tree-node__content text-center">
               <img src="../../public/svg/connect.svg" style='width:30px' alt="">
          </div>
          <div class="col col-md-8 el-tree-node__content text-left">
            <a href="/help/connect" style="text-decoration: none">联系我们</a>
          </div>
        </div>
      </div>
      <div class="col col-md-8">
        <div class="row" style='min-height: 600px'>
          <div class="col col-md-12" style='background-color:white;padding:20px;width:98%;float:right'>
            <div class="row text-left">
              <div class="col col-md-11 col-md-offset-1">
                <h4>
                  <strong style="padding:5px;">
                    意见反馈
                  </strong>
                </h4>
              </div>
            </div>
                        <div class="row">
                            <div class="co col-md-1"></div>
                            <div class="col col-md-11 text-left">
                                <p style="color:silver;font-size:13px">
                                    您对新版媒大媒小有任何意见，或使用中遇到的问题，请在本页面反馈。我们会每天关注并不断优化产品，为您提供更好的服务!
                                </p>
                                <div class="row">
                                  <div class="col col-md-11">
                                        <br>
                                    <p>
                                        <strong>反馈内容</strong>
                                    </p>
                                    <el-input v-model="content" :autosize="{ minRows: 4, maxRows: 10}" type='textarea' placeholder="我们非常乐意受到您使用网站过程中的感受和意见！"></el-input>
                                    <br>
                                    <br>
                                    <p>
                                        <strong>联系方式</strong>（选填）
                                    </p>
                                    <br>
                                    <el-input v-model="contactWay" placeholder="手机号码邮箱QQ号均可" style='width:100%'></el-input>
                                    <br>
                                    <br>
                                    <el-button type='danger' @click='postOpi()'>提交反馈</el-button>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { getCookies } from '../directives/methods'
export default {
    data() {
        return {
            contactWay: '',
            content: ''
        }
    },
    methods: {
        postOpi() {
            let token = getCookies('access_token');
            if (token == null) {
                this.$alert('请登录后操作!', '提示', { confirmButtonText: '确定' });
                return;
            } else {
                let self = this;
                if (self.content == '') {
                    this.$alert('请确认反馈内容是否为空!', '提示', { confirmButtonText: '确定' });
                } else if (self.contactWay == '') {
                    this.$alert('请确认联系方式是否为空!', '提示', { confirmButtonText: '确定' });
                } else {
                  var data={content: self.content, contactWay: self.contactWay};
                    axios.post('/home/suggest', data)
                        .then(function (response) {
                          console.log(response)
                            if (response.data.ret == 0) {
                                self.content = '';
                                self.contactWay = '';
                                self.$alert("反馈信息已收到,非常感谢你的建议！", '提示', { confirmButtonText: '确定' });
                            }
                            else {
                                self.$alert("网络异常", '提示', { confirmButtonText: '确定' });
                            }
                        });
                }
            }
        }
    }
}
</script>