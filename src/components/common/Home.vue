<template>
    <div class="wrapper">
        
        <div class="top-logo">
            <div class="logo"></div>

            <!-- <img src="./logosider.png" /> -->
        </div>
       
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{ 'content-collapse': collapse }">
           
            <!-- <v-tags></v-tags> -->
            <div class="content">
                  <v-head></v-head>
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        // bus.$on('tags', msg => {
        //     let arr = [];
        //     for (let i = 0, len = msg.length; i < len; i++) {
        //         msg[i].name && arr.push(msg[i].name);
        //     }
        //     this.tagsList = arr;
        // });
    }
};
</script>
<style lang="less" scoped>
.top-logo {
    width: 202px;
    height: 70px;
    padding: 10px 20px;
    background-color: rgb(50, 65, 87);
    .logo {
        width: 167px;
        height: 48px;
        line-height: 50px;

    
        // padding: 5px;
        // background: url("./logosider.png");
        // background:url("./logosider.png") no-repeat 4px 5px ;
        background: url(./logosider.png) center center / cover no-repeat;
        background-color: rgb(50, 65, 87);
        // background-size: cover;
        // img{
        //     width:100%;
        //     height: 100%;
        // }
    }
}
</style>
