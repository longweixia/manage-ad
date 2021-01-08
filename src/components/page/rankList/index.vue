<template>
    <div>
           <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-s-check"></i> 榜单排名 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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
        <WeekList v-if="activeIndex === 0"></WeekList>
        <MonthList v-if="activeIndex === 1"></MonthList>
        <Total v-if="activeIndex === 2"></Total>
    </div>
</template>

<script>
import WeekList from './weekList';
import MonthList from './monthList';
import Total from './total';
export default {
    name: 'myArticle',
    components: {
        WeekList,
        MonthList,
        Total
    },
    data() {
        return {
            buttons: [{ name: '周榜', value: 1 }, { name: '月榜', value: 2 }, { name: '总榜', value: 3 }],
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
