<template>
    <div class="rank-list-month-tablelist">
        <div class="container">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="选择月">
                        <Select v-model="query.monthNum" style="width: 150px" clearable @on-clear="clearDate">
                            <Option v-for="item in TimeList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="姓名" prop="starName">
                        <Input v-model="query.starName" placeholder="姓名" clearable></Input>
                    </FormItem>
                    <FormItem label="ID" prop="starId">
                        <Input type="number" v-model="query.starId" placeholder="ID" clearable></Input>
                    </FormItem>

                    <FormItem>
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </FormItem>
                </Form>
            </div>

            <Table border :columns="table.columns" :data="table.data" style="width: 100%"></Table>
            <Pagination :pagination="pagination" @on-page-size-change="loadData" @on-page-change="loadData"></Pagination>
        </div>
        <Modal v-model="modalImg" title="查看图片" @on-ok="ok" @on-cancel="cancel" width="1000">
            <div class="card-content">
                <div class="card">
                    <div class="text">首页轮播图预览</div>
                    <img :src="homeImg" />
                </div>
                <div class="card">
                    <div class="text">明星详细页预览</div>
                    <img :src="detailImg" />
                </div>
                <div class="card">
                    <div class="text">打榜弹窗预览</div>
                    <img :src="hitPopupImg" />
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import Pagination from './../../common/Pagination.vue';
import { PAGE_PARAMS } from './../../../utils/constants.js';
export default {
    name: 'myArticle',
    components: {
        Pagination
    },
    data() {
        return {
            pagination: Object.assign({}, PAGE_PARAMS),
            modalImg: false,
            homeImg: '', //首页轮播图
            detailImg: '', //详情页
            hitPopupImg: '', //打榜弹窗图
            time: '',
            TimeList: [
                // {
                //     value: '1',
                //     label: '1'
                // },
                // {
                //     value: '2',
                //     label: '2'
                // }
            ],
            query: {
                endTime: '', //周结束时间

                hitListType: 1, //榜单类型 0：周榜；1：月榜；2：总榜

                listType: 2, //列表类型 默认空， 0：本周；1：近三个月周时间段；2：具体某个月份

                monthNum: '', //具体月份值

                // pageNum: 1, //当前页码

                // pageSize: 20, //页面数量

                sortType: 0, //排序 0：正序；1：倒序；

                starId: '', //明星ID

                starName: '', //明星姓名

                startTime: '' //周开始时间
            },
            table: {
                data: [],
                columns: [
                    {
                        title: '月',
                        key: 'id',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '明星',
                        key: 'name',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: 'ID',
                        key: 'ID',
                        sortable: true,
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '排名',
                        key: 'address',
                        align: 'center',
                        sortable: true,
                        minWidth: 150
                    },

                    {
                        title: '操作',
                        key: 'name',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            let detail = h(
                                'div',
                                {
                                    style: {
                                        color: '#2d8cf0',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.goDetail();
                                        }
                                    }
                                },
                                '明星详情'
                            );
                            let fens = h(
                                'div',
                                {
                                    style: {
                                        color: '#2d8cf0',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.goDetail();
                                        }
                                    }
                                },
                                '粉丝贡献'
                            );
                            return h('div', [detail, fens]);
                        }
                    }
                ]
            },
            tableData: [
                {
                    coverImage: ''
                }
            ],
            total: 0
        };
    },
    created() {},
    mounted() {
        this.getTimeList();
        this.loadData();
    },
    methods: {
        // 清除日期
        clearDate() {
            this.query.monthNum = '';
        },
        // 获取近三个月的周时间表
        getTimeList() {
            let current = new Date().getMonth(); //当前月

            let month1 = current - 1 <= 0 ? 12 : current - 1;

            let month2 = month1 - 1 <= 0 ? 12 : month1 - 1;
            console.log(current, month1, month2);
            let month3 = month2 - 1 <= 0 ? 12 : month2 - 1;
            let month4 = month3 - 1 <= 0 ? 12 : month3 - 1;
            let month5 = month4 - 1 <= 0 ? 12 : month4 - 1;
            if (current === 0) {
                current = 1;
            }
            if (month1 === 0) {
                month1 = 1;
            }
            if (month2 === 0) {
                month2 = 1;
            }
            if (month3 === 0) {
                month3 = 1;
            }
            if (month4 === 0) {
                month4 = 1;
            }
            if (month5 === 0) {
                month5 = 1;
            }

            this.TimeList = [
                {
                    value: current
                },
                {
                    value: month1
                },
                {
                    value: month2
                },
                {
                    value: month3
                },
                {
                    value: month4
                },
                {
                    value: month5
                }
            ];
        },
        ok() {},
        cancel() {},
        //去详情
        goDetail() {
            this.$router.push({
                name: 'starDetail'
            });
        },

        // 重置
        resetForm(formName) {
            // this.$refs[formName].resetFields();
            this.query.starId = '';
            this.query.starName = '';
            this.clearDate();
        },
        loadData() {
            this.query.pageNum = this.pagination.pageNum;
            this.query.pageSize = this.pagination.pageSize;
            this.axios
                .post(`/star/hitList/rankList`, this.query)
                .then((res) => {
                    this.table.data = res.data.list;
                    this.pagination.total = res.data.total && Number(res.data.total);
                })
                .catch((err) => {
                    console.log('err', err);
                });
        },
        // 触发搜索按钮
        handleSearch() {
            this.pagination.pageNum = 1;
            // this.$set(this.query, 'pageIndex', 1);
            this.loadData();
        }
    }
};
</script>

<style lang="less">
.rank-list-month-tablelist {
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
    .card-content {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 350px;
        .card {
            width: 300px;
            height: 300px;
            margin-right: 20px;
            .text {
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            img {
                width: 100%;
                height: 100%;
                padding: 5px;
                background: #ddd;
            }
        }
    }
    .page-content {
        text-align: right;
        margin-top: 40px;
    }
    .ivu-form .ivu-form-item-label,
    .ivu-form-item-content {
        display: inline-block;
    }
}
</style>
