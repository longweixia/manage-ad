<template>
    <div>
           <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>  榜单排名 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class="containerManage">
             <div class="btn-area">
        <Button
            class="btn"
            :type="activeIndex == i ? 'primary' : 'default'"
            @click="changeTable(i)"
            v-for="(item, i) in buttons"
            :key="i"
            >{{ item.name }}</Button
        >
        </div>
        <!-- 表格区 -->
        <!-- 周榜 -->
        <div class="table-area">
        <WeekList v-if="activeIndex === 0"></WeekList>
        <MonthList v-if="activeIndex === 1"></MonthList>
        <Total v-if="activeIndex === 2"></Total>
        </div>
         </div>
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
.btn-area{
// margin-left: 30px;
}
.btn {
    margin-right: 10px;
    margin-bottom: 20px;
    
}
.table-area{
    // margin-top: -30px;
    // margin-top: -30px;
}
</style>
