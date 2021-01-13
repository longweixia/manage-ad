<template>
    <div>
           <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>热力设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
          <div class="container">
        <Button
            class="btn"
            :type="activeIndex == i ? 'primary' : 'default'"
            @click="changeTable(i)"
            v-for="(item, i) in buttons"
            :key="i"
            >{{ item.name }}</Button
        >
        <!-- 表格区 -->
        <!-- 周榜 -->
        <Choujiang v-if="activeIndex === 0"></Choujiang>
        <SignIn v-if="activeIndex === 1"></SignIn>
        <Video v-if="activeIndex === 2"></Video>
        <Share v-if="activeIndex === 3"></Share>
    </div>
    </div>
</template>

<script>
import Choujiang from './choujiang';
import SignIn from './signIn';
import Video from './video';
import Share from './share';
export default {
    name: 'myArticle',
    components: {
        Choujiang,
        SignIn,
        Video,
        Share
    },
    data() {
        return {
            buttons: [{ name: '抽奖', value: 1 }, { name: '签到', value: 2 }, { name: '看视频', value: 3 },{ name: '分享微信', value: 3 }],
            activeIndex: 0
        };
    },
    created() {},
    mounted() {},
    methods: {
        // 切换表格
        changeTable(i) {
            this.activeIndex = i;
        },
        ok() {},
        cancel() {}
    }
};
</script>

<style lang="less" scoped>
.btn {
    margin-right: 10px;
    margin-bottom: 20px;
    
}
</style>
