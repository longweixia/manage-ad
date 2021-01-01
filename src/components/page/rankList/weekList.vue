<template>
    <div class="rank-list-week-tablelist">
        <div class="container">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="周列表" prop="time">
                        <Select style="width: 200px" v-model="dateValue" clearable @on-clear="clearDate">
                            <Option v-for="item in TimeList" @click.native="changeDate(item)" :value="item.label" :key="item.label">{{ item.label }}</Option>
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
    </div>
</template>

<script>
import Pagination from './../../common/Pagination.vue';
import { PAGE_PARAMS } from './../../../utils/constants.js';
import { yearDay } from '../../../utils/helper.js';
export default {
    name: 'myArticle',
    components: {
        Pagination
    },
    data() {
        return {
            dateValue:"",
            pagination: Object.assign({}, PAGE_PARAMS),
            time: '',
            TimeList: [
              
            ],
            query: {
                endTime: '', //周结束时间

                hitListType: 0, //榜单类型 0：周榜；1：月榜；2：总榜

                listType: 0, //列表类型 默认空， 0：本周；1：近三个月周时间段；2：具体某个月份

                monthNum: '', //具体月份值

                sortType: 0, //排序 0：正序；1：倒序；

                starId: '', //明星ID

                starName: '', //明星姓名

                startTime: '' //周开始时间
            },
            table: {
                data: [
                    {
                        id: 1
                    }
                ],
                columns: [
                    {
                        title: '周时间段',
                        key: 'weekTime',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '明星',
                        key: 'starName',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '明星ID',
                        key: 'starId',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '排名',
                        key: 'rank',
                        align: 'center',
                        sortable: true,
                        minWidth: 100
                    },

                    {
                        title: '操作',
                        key: 'name',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            let clickBtn = h(
                                'div',
                                {
                                    style: {
                                        color: '#2d8cf0',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.goDetail('star', params.row);
                                        }
                                    }
                                },
                                '明星详情'
                            );
                            let fensBtn = h(
                                'div',
                                {
                                    style: {
                                        color: '#2d8cf0',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.goDetail('fensGive', params.row);
                                        }
                                    }
                                },
                                '粉丝贡献'
                            );
                            return h('div', [clickBtn, fensBtn]);
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
        this.getTimeList()
        this.loadData();
    },
    methods: {
        // 情况日期
        clearDate(){
             this.query.startTime = ''
        this.query.endTime =''
        this.dateValue =''
        },
        // 改变日期
        changeDate(date){
        this.query.startTime = date.startTime
        this.query.endTime = date.endTime
        },
        // 获取近三个月的周时间表
        getTimeList(){
            // 今天
            let today = new Date().getTime()
            let Week0 = yearDay(today)
            // 一周前
            let Week1 = yearDay(today-7*24*3600*1000)

            let Week2 = yearDay(today-7*24*3600*1000*2)
  
            let Week3 = yearDay(today-7*24*3600*1000*3)
            let Week4 = yearDay(today-7*24*3600*1000*4)
            let Week5 = yearDay(today-7*24*3600*1000*5)
            let Week6 = yearDay(today-7*24*3600*1000*6)
            let Week7 = yearDay(today-7*24*3600*1000*7)
            let Week8 = yearDay(today-7*24*3600*1000*8)
            let Week9 = yearDay(today-7*24*3600*1000*9)
            let Week10 = yearDay(today-7*24*3600*1000*10)
            let Week11 = yearDay(today-7*24*3600*1000*11)
            let Week12 = yearDay(today-7*24*3600*1000*12)
            this.TimeList = [
                {
                    label: Week1+"-"+Week0,
                    startTime: Week1,
                    endTime: Week0
                },
                {
                    label: Week2+"-"+Week1,
                    startTime: Week2,
                    endTime: Week1
                },
                {
                    label: Week3+"-"+Week2,
                    startTime: Week3,
                    endTime: Week2
                },
                
                {
                    label: Week4+"-"+Week3,
                    startTime: Week4,
                    endTime: Week3
                },
                {
                    label: Week5+"-"+Week4,
                    startTime: Week5,
                    endTime: Week4
                },
                {
                    label: Week6+"-"+Week5,
                    startTime: Week6,
                    endTime: Week5
                },
                {
                    label: Week7+"-"+Week6,
                    startTime: Week7,
                    endTime: Week6
                },
                {
                    label: Week8+"-"+Week7,
                    startTime: Week8,
                    endTime: Week7
                },
                {
                    label: Week9+"-"+Week8,
                    startTime: Week9,
                    endTime: Week8
                },
                {
                    label: Week10+"-"+Week9,
                    startTime: Week10,
                    endTime: Week9
                },
                {
                    label: Week11+"-"+Week10,
                    startTime: Week11,
                    endTime: Week10
                },
                {
                    label: Week12+"-"+Week11,
                    startTime: Week12,
                    endTime: Week11
                },
                
            ]


        },
        ok() {},
        cancel() {},
        //去详情-粉丝贡献
        goDetail(name, data) {
            if (name == 'star') {
                this.$router.push({
                    name: `${name}Detail`,
                    query: {
                        id: data.starId
                    }
                });
            } else { //贡献榜
            
            this.$router.push({
                name: `${name}Detail`,
                query: {
                    // id: data.starId,
                    data: encodeURIComponent(JSON.stringify(data))
                }
            });
            }
        },

        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.clearDate()
        },
        loadData() {
            this.query.pageNum = this.pagination.pageNum;
            this.query.pageSize = this.pagination.pageSize;
            this.axios
                .post(`/star/hitList/rankList`, this.query)
                .then((res) => {
                    this.table.data = res.data.list;
                     this.pagination.total = res.data.total&&Number(res.data.total);
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
.rank-list-week-tablelist {
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
