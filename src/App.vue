<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
<style lang="less">
.crumbs{
    margin-top:-20px;
    // margin-left: 5px;
    padding-left: 5px;
    
    // padding-bottom: 20px;
    // border-bottom: 10px solid #f0f0f0;;
}
.el-breadcrumb{
padding-bottom: 5px;
position: relative;
    top: -5px;
}

</style>