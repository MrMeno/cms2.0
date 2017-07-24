export default {
    SET_ACCESS_TOKEN: (state, token) => {
        state.access_token = token
    },
    SET_Menu: (state, vbool) => {
        state.showDrMenu = vbool
    },
      _SET_PERMISSON: (state, arr) => {
        state.permission = arr
    },
    SET_LOGIN_STATE: (state, vbool) => {
        state.login = vbool
    },
    SET_BREAD: (state, path) => {
        state.breadcrumb = path
    },
     SET_ROLE: (state, a) => {
        state.role = a
    },
     SET_URL: (state, path) => {
     	var type=path.split('_')[1];
        var routeUrl=path.split('_')[0];
        if(type==1){
            state.url.push(routeUrl);
        }
        else{
            state.url=['/main'];
        }
    }
}