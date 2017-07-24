import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import mutations from './mutations'
import getters from './getters'
import { getPermission } from '../util/permit'
import Cookies from 'js-cookie';

Vue.use(Vuex)
export function createStore() {
    return new Vuex.Store({
        state: {
            login: !(Cookies.get('access_token')==undefined),
            admin: false,
            items: {},
            cookies:'',
            user: '',
            showDrMenu: true,//是否显示下拉列表
            access_token: Cookies.get('access_token',{path:'/'})||'',
            permission: [],
            url:['/main'],
            breadcrumb:[],
            role:''
        },
        mutations,
        getters
    })
}