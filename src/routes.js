import Login from './views/Login.vue'
import NotFound from './views/404.vue' 
import Home from './views/Home.vue' 
import Main from './views/Main.vue'
import UserCenter from './views/user/user-center.vue'
import OrderList from './views/order/order-list.vue'
import OrderInfo from './views/order/order-info.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home, 
        iconCls: 'el-icon-message',//图标样式class
        name:'菜单',
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/users', component: UserCenter, name: '人员管理' },
            { path: '/order-list', component: OrderList, name: '用户订单' },
            { path: '/order-info', component: OrderInfo ,name: '用户订单',hidden: true },
        ]
    },
    {
        path: '/uer-center',
        component: UserCenter,
        name: '',
        hidden: true
    }  
];

export default routes;