<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资源管理</el-breadcrumb-item>
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
            <StarList v-if="activeIndex === 0"></StarList>
            <Week v-if="activeIndex === 1"></Week>
            <Month v-if="activeIndex === 2"></Month>
        </div>
    </div>
</template>

<script>
import StarList from './starList';
import Week from './week';
import Month from './month';

export default {
    name: 'myArticle',
    components: {
        StarList,
        Week,
        Month
    },
    data() {
        return {
            buttons: [
                { name: '明星资源', value: 1 },
                { name: '周榜奖励', value: 2 },
                { name: '月榜奖励', value: 3 }
            ],
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
