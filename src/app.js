import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './util/filters'
import axios from 'axios'
import Cookies from 'js-cookie'
import Elements from '../public/css/element-ui'
import{Notification} from '../public/css/element-ui'
import getUrl from './directives/methods'

 Vue.use(Elements);
// mixin控制title显示
// Vue.mixin(titleMixin);

// 遍历加载全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const store = createStore();
const router = createRouter();


axios.interceptors.request.use(//请求拦截
    config => {
      var  access_token=Cookies.get('access_token',{path:'/'});
         if(access_token==undefined||access_token=='undefined'){
          localStorage.clear();
         }
         return config 
    },
    err => {
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function(res){
        if(Number(res.data.ret)==3001){
          Notification.error({
          message: res.data.msg
         })
          router.push({path:'/main'});
        }
        return res;
          },function(err){
         return Promise.reject(error);
     })
      router.beforeEach((to, from, next) => {
        const auth=to.meta.auth; 
        var token=Cookies.get('access_token');
        var bread=new Array();
        bread.push({url:from.fullPath,name:from.meta.name});
        if(to.path=='/main'||to.path=='/'){
          bread.splice(0,1);
        }
        if(to.path==from.path){
          bread.splice(0,1);
          bread.push({url:'/main',name:'主页'});
        } 
         bread.push({url:to.path,name:to.meta.name});
         store.commit('SET_BREAD',bread);
           if (to.path != '/main') 
               {
                store.commit('SET_Menu', false);//除主页外不显示植入的下拉列表
                  store.commit('SET_URL',to.path+'_1');//
              }
             else
             {
                  store.commit('SET_Menu', true);
                  store.commit('SET_URL',to.path+'_2');
             } 
             if(auth){
              Cookies.remove('access_token');
               Cookies.set('access_token',token,{ expires: 1/48, path: '/' })
             }
           next()
       });
// g构建即时store router工厂
export function createApp() {
    sync(store, router)
    const app = new Vue({
        router,
        store,
        render: h => h(App),
        data:{
            eventHub: new Vue()
        }
    });
    return {app,router,store}
}


