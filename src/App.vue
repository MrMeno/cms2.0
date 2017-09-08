<template>
  <div id="app" class='content'>
    <div class="container-fluid" style='padding:0px'>
      <div class="row" style='padding:10px;background-color:white'>
        <div class="col col-md-1">
        </div>
        <div class="col col-md-10">
          <div class="row">
            <div class="col col-md-3">
              <div class="row">
                <div class="col col-md-12 text-left">
              <router-link to='/main'><img src="../public/img/logo.png" alt=""/></router-link>
                </div>
              </div>
            </div>
            <div class="col col-md-6 text-center">
            <!--   <el-input placeholder="请输入内容" id='search' @focus='changeLength()' @blur='initWidth()' v-model='params'
               style='border:solid 1px #e40011' class='search'>
                 <el-button class='btn_search'  @click="dataDeemo('','')" slot="append" icon="search"></el-button>
              </el-input>
 -->
               <div class="row">
                 <div class="col col-md-2"></div>
                 <div class="col col-md-8">
                     <div class="input-group text-center" style='margin-top:15px'>
                     <input type="text" class="input_search" id='search' @keydown="getEnter($event)"  v-model='params'  placeholder="请输入搜索关键字">
                      <span class="input-group-btn">
                         <button class="btn_search" @click="dataDeemo('','')" id='btn_search' type="button"><i class="fa fa-search fa-lg"></i></button>
                     </span>
                </div>

                 </div>
                 <div class="col col-md-2"></div>
               </div>

            </div>
            <menuList :role='role'></menuList>
          </div>
        </div>
        <div class="col col-md-1">
        </div>
       </div>
      <main-nav ref="tree"></main-nav>
      <breadcrumb v-if='$store.state.breadcrumb.length==2'></breadcrumb> 
     </div>
     <transition>  
      <router-view class="view"></router-view>
      </transition>
     <div class="row">          
      <footers></footers>
     </div>
  </div>
</template>


<script>
  import {animate} from './directives/methods'
  import $ from 'jquery'
  import axios from 'axios'
  import footers from './components/footer.vue'
  import menuList from './components/menuList.vue'
  import breadcrumb from './components/breadcrumb.vue'
  import mainNav from './components/mainNav.vue'
  import cookies from 'js-cookie'
  export default {
    created(){},
    mounted(){
      this.token=cookies.get('access_token',{path:'/'});
      // if(window.localStorage.getItem('role')){
      this.$store.commit('SET_ROLE',window.localStorage.getItem('role'));   
      this.role=this.$store.state.role;
        // }
      this.getInfo(this.token);
      console.log(this.$refs)
      this.$refs.tree.$children["0"].$children["0"].handleClick();
  },
    data(){
      return{
        tv_data:[],
        film_data:[],
        zy_data:[],
        net_data:[],
        url:[],
        params:'',
        token:'',
        role:''
      };
    },
    computed:{
    },
    components:{
      footers,menuList,breadcrumb,mainNav
    },
    methods: {
       getEnter(e){
        if(Number(e.keyCode)==13){
          this.dataDeemo();
        }
       },

         getInfo(token){
        let self=this;
        if(token!=undefined&&token!='undefined')
         {
          axios.get('/home/user/user_info').then(function(res){
            if(Number(res.data.ret)==0){
              self.$store.commit('SET_ROLE',res.data.data.userRole);               
            }
          })
        }
      },
      changeType(type){},
      dataDeemo(){
        let self=this;
        this.$router.push({path:'/search',query:{params:encodeURI(self.params)}})
      }
         
    }
  }
</script>

<style>
  @import '../public/css/element-ui/lib/theme-default/index.css';
  @import '../public/css/bootsrap/dist/css/bootstrap.css';
  @import '../node_modules/font-awesome/css/font-awesome.css';

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Microsoft YaHei", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    background-color: #f1f2f3;
    margin: 0;
    padding-top: 0px;
    color: #34495e;
    overflow-y: scroll;

  }
  
  .content {
    text-align: center
  }
  .space{
    padding: 10px
  }
  .inner {
    text-align: center;
    width: 100%;
  }
  
  .views {
    padding: 0px;
    background-color:#f1f2f3
  }
  .parent-items ul{
    border-radius:0px!important;
    margin:0px!important;
    padding: 0px!important;
    border:solid 0px white!important;
    top:60px!important;
    z-index:999!important;
     
  }
  .text-line{
     word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;/*clip */
  }
  .child-item {
    text-align: center!important;
    width: 100%!important;
    height:80px!important;
    line-height: 50px!important;
    padding: 10px 0px!important;
    background-color: #666!important;
    color:white;
    border-bottom: solid 1px #777!important;

  }
  .child-item{
    color:white
  }
    .child-item:hover{
      color:#666!important;
      background-color: white!important;
    }
    .area{
      width:82.33%;
      height:290px;
      background-color:white;
      z-index:1;
      position:absolute;
      left:16.66%
    }
    .search{
    border-radius:0px;
    width:400px;
    margin-top:5px
    }
    .btn_search{
      background-color:#e40011!important;
      border-radius:0px!important;
      border:solid 1px #e40011!important;
      width:100px!important;
      height:35px;
      color:white!important;
      font-size:16px!important;
    }
    .input_search{
      border:solid 2px #e40011;
      width:100%;
      height:35px;
      outline: none;
      text-align: left;
      padding: 2px
    }
    .input_search::-webkit-input-placeholder{
    color: #999999;
    font-size: 13px;
    line-height: 50px;
    padding: 2px
}

</style>
