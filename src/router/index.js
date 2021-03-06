import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        redirect: '/starList'
    },
    {
        path: '/',
        component: () =>
            import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            // {
            //     path: '/dashboard',
            //     component: () =>
            //         import ( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
            //     meta: { title: '系统首页' }
            // },
            {
                path: '/myArticle',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/MyArticle.vue'),
                meta: { title: '文章列表' }
            },
            {
                path: '/comment',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/Comment.vue'),
                meta: { title: '文章评论' }
            },
            {
                path: '/starList',
                name: "starList",
                component: () =>
                    import('../components/page/starList.vue'),
                meta: { title: '明星列表' }
            },
            {
                path: '/starDetail',
                name: "starDetail",
                component: () =>
                    import('../components/page/starDetail.vue'),
                meta: { title: '明星详情' }
            },
            {
                path: '/rankList',
                name: "rankList",
                component: () =>
                    import('../components/page/rankList/index.vue'),
                meta: { title: '榜单排名' }
            },
            {
                path: '/fensGiveDetail',
                name: "fensGiveDetail",
                component: () =>
                    import('../components/page/rankList/fensGive/index.vue'),
                meta: { title: '粉丝贡献' }
            },
            {
                path: '/fenManage',
                name: 'fenManage',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/fenManage.vue'),
                meta: { title: '注册粉丝' }
            },
            {
                path: '/addfenManage',
                name: 'addfenManage',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/addfenManage.vue'),
                meta: { title: '自建粉丝' }
            },
            {
                path: '/givRecord',
                name: 'givRecord',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/givRecord.vue'),
                meta: { title: '赠送记录' }
            },
            {
                path: '/hotSetting',
                name: 'hotSetting',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/hotSetting/index.vue'),
                meta: { title: '热力设置' }
            },
            {
                path: '/banner',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/Banner.vue'),
                meta: { title: '轮播设置' }
            },
            {
                path: '/resource',
                name: 'resource',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/resource/index.vue'),
                meta: { title: '资源管理' }
            },
            {
                path: '/addResouce',
                name: 'addResouce',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/resource/addResouce.vue'),
                meta: { title: '添加资源' }
            },
            {
                path: '/account',
                component: () =>
                    import( /* webpackChunkName: "dashboard" */ '../components/page/account/index.vue'),
                meta: { title: '账号管理' }
            },

            // {
            //     path: '/comment',
            //     component: () =>
            //         import ( /* webpackChunkName: "dashboard" */ '../components/page/Comment.vue'),
            //     meta: { title: '榜单排名' }
            // },
            // {
            //     path: '/appList',
            //     component: () =>
            //         import ( /* webpackChunkName: "dashboard" */ '../components/page/AppList.vue'),
            //     meta: { title: '应用列表' }
            // },

            // {
            //     path: '/editArticle',
            //     name: "EditArticle",
            //     component: () =>
            //         import ( /* webpackChunkName: "dashboard" */ '../components/page/EditArticle.vue'),
            //     meta: { title: '修改文章' }
            // },
            // {
            //     path: '/sidebarAdImg',
            //     name: "EidebarAdImg",
            //     component: () =>
            //         import ( /* webpackChunkName: "dashboard" */ '../components/page/SidebarAdImg.vue'),
            //     meta: { title: '侧边图' }
            // },
            // {
            //     path: '/friendLink',
            //     name: "FriendLink",
            //     component: () =>
            //         import ( /* webpackChunkName: "dashboard" */ '../components/page/FriendLink.vue'),
            //     meta: { title: '友情链接' }
            // },
            // {
            //     path: '/icon',
            //     component: () =>
            //         import ( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
            //     meta: { title: '自定义图标' }
            // },
            // {
            //     path: '/table',
            //     component: () =>
            //         import ( /* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
            //     meta: { title: '基础表格' }
            // },
            // {
            //     path: '/tabs',
            //     component: () =>
            //         import ( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
            //     meta: { title: 'tab选项卡' }
            // },
            // {
            //     path: '/form',
            //     component: () =>
            //         import ( /* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
            //     meta: { title: '基本表单' }
            // },
            // {
            //     // 富文本编辑器组件
            //     path: '/editor',
            //     component: () =>
            //         import ( /* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
            //     meta: { title: '富文本编辑器' }
            // },
            // {
            //     // markdown组件
            //     path: '/markdown',
            //     name: "Markdown",
            //     component: () =>
            //         import ( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
            //     meta: { title: 'markdown编辑器-文章' }
            // },
            // {
            //     // markdown组件
            //     path: '/markdownApp',
            //     name: "MarkdownApp",
            //     component: () =>
            //         import ( /* webpackChunkName: "markdown" */ '../components/page/MarkdownApp.vue'),
            //     meta: { title: 'markdown编辑器-应用' }
            // },
            {
                // 图片上传组件
                path: '/upload',
                component: () =>
                    import( /* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                meta: { title: '文件上传' }
            },
            // {
            //     // vue-schart组件
            //     path: '/charts',
            //     component: () =>
            //         import ( /* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
            //     meta: { title: 'schart图表' }
            // },
            // {
            //     // 拖拽列表组件
            //     path: '/drag',
            //     component: () =>
            //         import ( /* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
            //     meta: { title: '拖拽列表' }
            // },
            // {
            //     // 拖拽Dialog组件
            //     path: '/dialog',
            //     component: () =>
            //         import ( /* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
            //     meta: { title: '拖拽弹框' }
            // },
            // {
            //     // 国际化组件
            //     path: '/i18n',
            //     component: () =>
            //         import ( /* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
            //     meta: { title: '国际化' }
            // },
            {
                // 权限页面
                path: '/permission',
                component: () =>
                    import( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                meta: { title: '权限测试', permission: true }
            },
            {
                path: '/404',
                component: () =>
                    import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '/403',
                component: () =>
                    import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: { title: '403' }
            },
            // {
            //     path: '/donate',
            //     component: () =>
            //         import ( /* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
            //     meta: { title: '支持作者' }
            // }
        ]
    },
    {
        path: '/login',
        component: () =>
            import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '*',
        redirect: '/404'
    }
    ]
});