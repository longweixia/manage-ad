import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios';
import ViewUI from 'view-design';

// import style
import 'view-design/dist/styles/iview.css';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

Vue.use(ViewUI);

Vue.use(Viewer);
// axios.defaults.baseURL = 'https://123.207.120.31:18001'; //接口的基础url
axios.defaults.baseURL = 'http://123.207.120.31:18001'; //接口的基础url
// axios.defaults.baseURL = "http://192.168.20.4:18001" //本地接口的基础url
// 请求拦截
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization'); //把localStorage的token放在Authorization里
        }
        return config;
    },
    function(err) {
        Promise.reject(err);
    }
);
// 响应拦截
axios.interceptors.response.use(
    response => {
        //特殊错误处理，状态为401时为登录超时
        if (response.data.code == '401') {
            return Promise.reject(response.data.message);
            //   router.push("/login")
            //其余错误状态处理
        } else if (response.data.code == '100001' || response.data.code == '200001'||response.data.code == '300001'||response.data.code == '200002') {
            return Promise.reject(response.data.message);
            //请求成功
        } else if (response.data.code == 200) {
            //将我们请求到的信息返回页面中请求的逻辑
            return response.data;
        } else {
            return response.data;
        }
        //......
    },
    function(error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.push('/login');
                    return Promise.reject('登录失效');

                default:
                    break;
            }
        } else {
            return Promise.reject(error);
        }
    }
);
// Vue.prototype.baseUrl = process.env.API_ROOT//接口的基础url
// 改2 这里
// http://47.103.40.123:3001  服务器

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

// Vue.filter('forDate', function (value, formatString) {
//     formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
// 		return moment(value).format(formatString);

// });

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 打榜小程序`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
