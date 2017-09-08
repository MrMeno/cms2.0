<template>
  <div class="row" style='background-color:white'>
    <!-- 导航-->
    <div class="col col-md-1">
    </div>
    <div class="col col-md-10 col-sm-10 col-lg-10 col-xs-10">
      <nav class="inner">
        <el-menu :default-active="activeIndex"  menu-trigger='click' class="el-menu-def" mode="horizontal" @select="handleSelect">
          <el-submenu index="1" class='parent-items' :unique-opened='true'   v-if='$store.state.showDrMenu'>
            <template slot="title">
              <i class="fa fa-list" aria-hidden="true"></i>
              <span class='space'>影视植入资源</span>
            </template>
            <el-menu-item class='child-item' index="1-1">
              <div class="row" @mouseover="showDiv('1')" @mouseout="hideDiv()">
                <div class="col col-md-4 text-right">
                  <i class="fa fa-television fa-lg" aria-hidden="true"></i>
                </div>
                <div class="col col-md-4">
                  <span class="space" @click="changeType(1)">
                    电视剧
                  </span>
                </div>
                <div class="col col-md-4 text-center">
                  <i class="fa fa-angle-right" aria-hidden="true">
                  </i>
                </div>
              </div>
            </el-menu-item>
            <el-menu-item class='child-item' index="1-2">
              <div class="row">
                <div class="col col-md-4 text-right">
                  <i class="fa fa-youtube-play fa-lg" aria-hidden="true"></i>
                </div>
                <div class="col col-md-4">
                  <span class="space" @click="changeType(2)">
                    电影&nbsp;&nbsp;&nbsp;<label style='font-size:12px;color:#999'>(敬请期待)</label>
                  </span>
                </div>
                <div class="col col-md-4 text-center">
          <!--         <i class="fa fa-angle-right" aria-hidden="true">
                  </i> -->
                </div>
              </div>
            </el-menu-item>
            <el-menu-item class='child-item' index="1-3">
              <div class="row">
                <div class="col col-md-4 text-right">
                  <i class="fa fa-tachometer  fa-lg" aria-hidden="true"></i>
                </div>
                <div class="col col-md-4">
                  <span class="space" @click="changeType(3)">
                    综艺&nbsp;&nbsp;&nbsp;<label style='font-size:12px;color:#999'>(敬请期待)</label>
                  </span>
                </div>
                <div class="col col-md-4 text-center">
                 <!--  <i class="fa fa-angle-right" aria-hidden="true">
                  </i> -->
                </div>
              </div>
            </el-menu-item>
            <el-menu-item class='child-item' index="1-4">
              <div class="row">
                <div class="col col-md-4 text-right">
                  <i class="fa fa-internet-explorer fa-lg" aria-hidden="true"></i>
                </div>
                <div class="col col-md-4">
                  <span class="space" @click="changeType(4)">
                    网络类型&nbsp;&nbsp;&nbsp;<label style='font-size:12px;color:#999'>(敬请期待)</label>
                  </span>
                </div>
                <div class="col col-md-4 text-center">
                <!--   <i class="fa fa-angle-right" aria-hidden="true">
                  </i> -->
                </div>
              </div>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="1" v-if='!$store.state.showDrMenu'>
            <a to="/main">影视植入资源</a>
          </el-menu-item>
          <el-menu-item index="2">
            <a href="/main">首页</a>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/detail">案例咨询</router-link>
          </el-menu-item>
          <el-menu-item index="4">技术支持</el-menu-item>
          <el-menu-item index="5">
            <router-link to="/help">关于我们</router-link>
          </el-menu-item>
          <el-menu-item index="6">
            <router-link to="/help/job">加入我们</router-link>
          </el-menu-item>
        </el-menu>
        <div class="line"></div>
        <div class="area" style='display:none' @mouseover="showDiv('1')" @mouseout="hideDiv()">
          <div class="container" style='padding-top:20px'>
            <div class="row" style='font-size:13px'>
              <!--first line -s-->
              <div class="col col-md-1" style='margin-top:6px;'>
                类型
              </div>
              <div class="col col-md-11">
                <div class="row">
                  <div class="col col-md-1" style='margin-top:6px;color:#666;'>
                     <router-link @click='hideDiv()' :to="{path:'search',query:{params:''}}">全部</router-link>
                  </div>
                  <div class="col col-md-1" v-for='data in type_data' style='margin-top:6px;color:#333;'>
                    <router-link @click='hideDiv()' :to="{path:'search',query:{params:data.name}}">{{data.name}}</router-link>
                  </div>
                </div>
              </div>
            </div>
            <!--first line -e-->
  
            <div class="row" style='font-size:13px;padding-top:10px'>
              <!--sec line -s-->
              <div class="col col-md-1" style='margin-top:6px;'>
                演员
              </div>
              <div class="col col-md-11">
                <div class="row text-center">
                  <div class="col col-md-1" style='margin-top:6px;color:#666'>
                     <router-link @click='hideDiv()' :to="{path:'search',query:{params:''}}">全部</router-link>
                  </div>
                  <div class="col col-md-1" v-for='data in dis_data.actor' style='margin-top:6px;color:#333;color:#333;'>
                    <div class='text-line'>
                      <router-link @click='hideDiv()' :to="{path:'search',query:{params:data.displayName}}">{{data.displayName}}</router-link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <!--sec line -e-->
  
            <div class="row" style='font-size:13px;padding-top:10px'>
              <!--3td line -s-->
              <div class="col col-md-1" style='margin-top:6px;'>
                导演
              </div>
              <div class="col col-md-11">
                <div class="row text-center">
                  <div class="col col-md-1" style='margin-top:6px;color:#666'>
                     <router-link @click='hideDiv()' :to="{path:'search',query:{params:''}}">全部</router-link>
                  </div>
                  <div class="col col-md-1" v-for='data in dis_data.director'  style='margin-top:6px;color:#333;'>
                    <span class='text-line'>
                       <router-link @click='hideDiv()'  :to="{path:'search',query:{params:data.displayName}}">{{data.displayName}}</router-link>
       
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!--3td line -e-->
  
            <div class="row" style='font-size:13px;padding-top:10px'>
              <!--3td line -s-->
              <div class="col col-md-1" style='margin-top:6px;'>
                编剧
              </div>
              <div class="col col-md-11">
                <div class="row text-center">
                  <div class="col col-md-1" style='margin-top:6px;color:#666'>
                     <router-link @click='hideDiv()' :to="{path:'search',query:{params:''}}">全部</router-link>
                  </div>
                  <div class="col col-md-1" v-for='data in dis_data.swriter' style='margin-top:6px;color:#333;'>
                    <span class='text-line'>
                       <router-link @click='hideDiv()' :to="{path:'search',query:{params:data.displayName}}">{{data.displayName}}</router-link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!--3td line -e-->

          </div>
        </div>
      </nav>
    </div>
    <div class="col col-md-1">
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'main-nav',
  props: [''],
  mounted() {
    let self=this;
    console.log(this.$refs)
  },
  data() {
    return {
      activeIndex: '1-1',
      tv_data: [],
      film_data: [],
      zy_data: [],
      net_data: [],
      dis_data: [],
      type_data: []
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    dataDeemo(type, staffType) {//通用数据接口
      var datas = [];
      type = (type != '') ? type : '1';
      $.ajax({
        type: "GET",
        url: "/home/lists",
        dataType: "json",
        async: false,
        data: {
          type: type,
          staffType: staffType
        },
        success: function (resquet) {
          if (resquet != null) {

            datas = resquet.data;
          } else {
            console.log('error')
          }
        }
      });
      return datas;
    },
    getType(type) {//通用类型接口
      var datas;
      $.ajax({
        type: "GET",
        url: "/home/type_lists",
        dataType: "json",
        async: false,
        data: {
          type: type
        },
        success: function (resquet) {
          if (resquet != null) {

            datas = resquet.data;
          } else {
            console.log('error')
          }
        }
      });
      return datas;
    },
    changeType(type){

    },
    showDiv(e) {//移入移出事件
      this.type_data = this.getType(e);
      if (e == '1') {
    this.tv_data.actor = this.dataDeemo('1', '1');
     this.tv_data.director = this.dataDeemo('1', '2');
     this.tv_data.swriter = this.dataDeemo('1', '3');
        this.dis_data = this.tv_data;
        this.activeIndex='1-1'
        this.showThis();
      }
      else if (e == '2') {
      this.film_data.actor = this.dataDeemo('2', '1');
     this.film_data.director = this.dataDeemo('2', '2');
     this.film_data.swriter = this.dataDeemo('2', '3');
        this.dis_data = this.film_data;
         this.activeIndex='1-2'
        this.showThis();
      } else if (e == '3') {
     this.zy_data.actor = this.dataDeemo('3', '1');
     this.zy_data.director = this.dataDeemo('3', '2');
     this.zy_data.swriter = this.dataDeemo('3', '3');
        this.dis_data = this.zy_data;
        this.activeIndex='1-3'
        this.showThis();
      } else if (e == '4') {
      this.net_data.actor = this.dataDeemo('4', '1');
      this.net_data.director = this.dataDeemo('4', '2');
      this.net_data.swriter = this.dataDeemo('4', '3');
        this.dis_data = this.net_data;
        this.activeIndex='1-4'
        this.showThis();
      }
    },
    showThis() {
      $(".area").stop().fadeTo("fast", 1, function () {
        $(this).css("display", "block");
      })
    },
    hideDiv() {
      $(".area").stop().fadeTo("fast", 0, function () {
        $(this).css("display", "none");
      })
    }
  }
}
</script>
<style>
.tips {
  text-decoration: none;
  color: black;
  padding: 5px 10px 5px 0px
}
  .text-line{
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  }
  .area{
    z-index:998;
    border-left:solid 1px #eee;
    border-bottom:solid 1px #eee;
    border-right:solid 1px #eee;
  }
</style>