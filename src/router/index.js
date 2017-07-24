import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import mainPage from '../views/ItemList.vue'
import detailPage from '../views/ItemView.vue'
import psdPage from '../views/psd.vue'
import rephonePage from '../views/user/pswmod.vue'
import registPage from '../views/regist.vue'
import userPage from '../views/userCenter.vue'
import infoPage from '../views/user/userInfo.vue'
import proPage from '../views/user/proManage.vue'
import pubPage from '../views/user/pubMedia.vue'
import help from '../help/help.vue'
import job from '../help/job.vue'
import news from '../help/news.vue'
import links from '../help/links.vue'
import connect from '../help/connect.vue'
import suggest from '../help/suggest.vue'
import safety from '../views/user/safety.vue'
import detailDrama from '../views/detailDrama.vue'
import dramaList from '../views/dramaList.vue'
import advisory from '../views/advisory.vue'
import firmPage from '../views/user/firmInfo.vue'
import  mediaInfoPage from '../views/user/mediaInfo.vue'
import edmPage from '../views/user/edMedia.vue'
import searchPage from '../views/search.vue'
import notFoundPage from '../components/noPage.vue'
import errPage from '../components/errPage.vue'
import clausePage from '../views/perm.vue'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes: [{
            path: '/',

            redirect: '/main',
               meta: {
                auth: false,
                name:'主页'
            }
        },
        {
            path: '/main',
            component: mainPage,
               meta: {
                auth: false,
                 name:'主页'
            }
        },
        {
            path: '/psd',
            component: psdPage,
            meta: {
                auth: false,
                 name:'修改密码'
            }
        },
        {
            path: '/regist',
            component: registPage,
            meta: {
                auth: false,
                 name:'注册'
            }
        },{
            path: '/rephone',
            component: rephonePage,
            meta: {
                auth: true,
                 name:'修改手机'
            }
        },{
            path: '/clause',
            component: clausePage,
            meta: {
                auth: false,
                 name:'注册协议'
            }
        }, {
            path: '/detail',
            component: detailPage,
            meta: {
                auth: false,
                 name:'案例咨询'
            }
        },
        {
            path: '/detailDrama',
            component: detailDrama,
            meta: {
                auth: true,
                 name:'影视剧详情'
            }
        },
        {
            path:'/search',
            component:searchPage,
            meta:{
                auth:true,
                 name:'搜索'
            }

        },
         {
            path:'/noPage',
            component:notFoundPage,
            meta:{
                auth:false,
                 name:''
            }

        },
           {
            path: '/errPage',
            component: errPage,
            meta: {
                auth: false,
                 name:''
            }
        },
        {
            path: '/userCenter',
            component: userPage,
            meta: {
                auth: true,
                 name:'用户中心'
            },
            children: [{
                path: '',
                component: infoPage,
                meta: {
                auth: true,
                 name:'用户信息'
            }
            },
            {
                path: '/userCenter/info',
                component: infoPage,
                meta: {
                auth: true,
                 name:'用户信息'
            }
            },
            {
                path: '/userCenter/proManage',
                component: proPage,
                meta: {
                auth: true,
                 name:'暂无'
            }
            },
            {
                path: '/userCenter/pubMedia',
                component: pubPage,
                meta: {
                auth: true,
                 name:'发布媒体'
            }
            },
            {
                path: '/userCenter/edMedia',
                component: edmPage,
                meta: {
                auth: true,
                 name:'编辑媒体'
            }
            },
             {
                path: '/userCenter/dramaList',
                component: dramaList,
                meta: {
                auth: true,
                 name:'影视剧列表'
            }
            },
            {
                path: '/userCenter/firmInfo',
                component: firmPage,
                meta: {
                auth: true,
                 name:'广告主信息'
            }
            },{
                path: '/userCenter/mediaInfo',
                component: mediaInfoPage,
                meta: {
                auth: true,
                 name:'媒体主信息'
            }
            }, {
                path: '/userCenter/safety',
                component: safety,
                meta: {
                auth: true,
                 name:'安全中心'
            }
            },{
                path:'/userCenter/advisory',
                component:advisory,
                meta: {
                auth: true,
                 name:'咨询列表'
            }
            }
            ]
        }, {
            path: '/help',
            component: help,
            meta: {
                auth: false,
                 name:'关于我们'
            }
        }, {
            path: '/help/job',
            component: job,
            meta: {
                auth: false,
                 name:'加入我们'
            }
        }, {
            path: '/help/news',
            component: news,
            meta: {
                auth: false,
                 name:'公司新闻'
            }
        }, {
            path: '/help/links',
            component: links,
            meta: {
                auth: false,
                 name:'友情链接'
            }
        }, {
            path: '/help/connect',
            component: connect,
            meta: {
                auth: false,
                 name:'联系我们'
            }
        }, {
            path: '/help/suggest',
            component: suggest,
            meta: {
                auth: false,
                 name:'意见反馈'
            }
        }
        ]
    });
}

/*<!-- 字符串 -->
<router-link to="home">Home</router-link>

<!-- 渲染结果 -->
<a href="home">Home</a>

<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'home'">Home</router-link>

<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>*/