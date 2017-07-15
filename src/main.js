import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './routes'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource);
Vue.use(Vuex)


let count = 0;
Vue.http.options.emulateJSON = true;
Vue.http.options.root = 'http://119.23.52.238/debt/';

Vue.http.interceptors.push((req, next) => {
    count++; 
    
    console.log('加载中...')
    next((res) => {
        if (--count === 0) { 
            console.log('加载成功')
        }
    });
});

Vue.http.aop = function(res, cb) {
    if (!res.ok) {
    	console.log('失败')
         
    } else if (res.data) {
        switch (res.data.ret) {
            // 正常
            case 0:
                break; 
                // 未登录
            case 10000:
                // todo
                return; 
                // 异常
            default:
                // bus.$emit('toast', {
                //     text: res.data.errmsg || '服务器忙'
                // });
                return;
        }
    }

    cb && cb();
}
const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {

//     if (to.path == '/login') {
//         sessionStorage.removeItem('user');
//     }
//     let user = JSON.parse(sessionStorage.getItem('user'));
//     if (!user && to.path != '/login') {
//         next({ path: '/login' })
//     } else {
//         next()
//     }
// })

// router.afterEach(transition => {

// });

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
