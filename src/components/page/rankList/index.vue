<template>
    <div>
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
    </div>
</template>

<script>
import WeekList from './weekList';
export default {
    name: 'myArticle',
    components: {
        WeekList
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
