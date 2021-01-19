<template>
    <div class="rank-list-week-tablelist">
    <div class="container" style="border:none">
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
                        minWidth: 150
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
                        minWidth: 150
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
                        minWidth: 200,
                        render: (h, params) => {
                            let clickBtn = h(
                                'span',
                                {
                                    style: {
                                        color: '#2d8cf0',
                                        cursor: 'pointer',
                                        margin:'10px'
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
                                'span',
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
        // this.loadData();
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
        getWeekDate(){
            
            let nowData = new Date();
                //获取今天的是周几
                let currentDay = nowData.getDay();
                //把currentDay == 0赋值给周日
                if(currentDay == 0){
                    currentDay = 7
                }
                // 获取周一的时间戳
                let monDayTime = nowData.getTime() - (currentDay - 1) * 24 * 60 * 60 * 1000;
                console.log("周一是" + new Date(monDayTime).getDate() + "号");
                // 获取周日的时间戳
                let sunDayTime = nowData.getTime() + (7 - currentDay) * 24 * 60 * 60 * 1000;
                console.log("周日是" + new Date(sunDayTime).getDate() + "号");
            
            //   return new Date(monDayTime).getDate()
              return monDayTime
        },
        getWeekDateint(){
            
            let nowData = new Date();
                //获取今天的是周几
                let currentDay = nowData.getDay();
                //把currentDay == 0赋值给周日
                if(currentDay == 0){
                    currentDay = 7
                }
                // 获取周一的时间戳
                let monDayTime = nowData.getTime() - (currentDay - 1) * 24 * 60 * 60 * 1000;
                console.log("周一是" + new Date(monDayTime).getDate() + "号");
                // 获取周日的时间戳
                let sunDayTime = nowData.getTime() + (7 - currentDay) * 24 * 60 * 60 * 1000;
                console.log("周日是" + new Date(sunDayTime).getDate() + "号");
            
                        // 获取本周周一的具体时间
                console.log("周一 " + new Date(monDayTime).toLocaleDateString());
                // 获取本周周日的具体时间
                console.log("周末" + new Date(sunDayTime).toLocaleDateString());
                // 获取当前时间的具体时间
                // console.log("当前时间" +new Date(monDayTime).toLocaleTimeString());
 
              return [yearDay(monDayTime),yearDay(sunDayTime)]
        },
        // 获取近三个月的周时间表
        getTimeList(){
        
            // 判断今天在哪一周，拿到今天所在的周开始时间安和结束时间
            let today = this.getWeekDate()
            // 拿到
            let Week0 = yearDay(today)  //周一
            let Weekend =yearDay(today-1*24*3600*1000) //上周日
            // 一周前周一
            let Week1 = yearDay(today-7*24*3600*1000)
            let Week1end = yearDay(today-8*24*3600*1000)

            let Week2 = yearDay(today-7*24*3600*1000*2)
            let Week2end = yearDay(today-7*24*3600*1000*2-24*3600*1000)
  
            let Week3 = yearDay(today-7*24*3600*1000*3)
            let Week3end = yearDay(today-7*24*3600*1000*3-24*3600*1000)

            let Week4 = yearDay(today-7*24*3600*1000*4)
            let Week4end = yearDay(today-7*24*3600*1000*4-24*3600*1000)

            let Week5 = yearDay(today-7*24*3600*1000*5)
            let Week5end = yearDay(today-7*24*3600*1000*5-24*3600*1000)

            let Week6 = yearDay(today-7*24*3600*1000*6)
            let Week6end = yearDay(today-7*24*3600*1000*6-24*3600*1000)

            let Week7 = yearDay(today-7*24*3600*1000*7)
            let Week7end = yearDay(today-7*24*3600*1000*7-24*3600*1000)

            let Week8 = yearDay(today-7*24*3600*1000*8)
            let Week8end = yearDay(today-7*24*3600*1000*8-24*3600*1000)

            let Week9 = yearDay(today-7*24*3600*1000*9)
            let Week9end = yearDay(today-7*24*3600*1000*9-24*3600*1000)

            let Week10 = yearDay(today-7*24*3600*1000*10)
            let Week10end = yearDay(today-7*24*3600*1000*10-24*3600*1000)

            let Week11 = yearDay(today-7*24*3600*1000*11)
            let Week11end = yearDay(today-7*24*3600*1000*11-24*3600*1000)

            let Week12 = yearDay(today-7*24*3600*1000*12)
            let Week12end = yearDay(today-7*24*3600*1000*12-24*3600*1000)

            let weekArryCurrent = this.getWeekDateint()
            this.TimeList = [
                {
                    label: weekArryCurrent[0]+"-"+weekArryCurrent[1],
                    startTime: weekArryCurrent[0],
                    endTime: weekArryCurrent[1]
                },
                {
                    label: Week1+"-"+Weekend,
                    startTime: Week1,
                    endTime: Weekend
                },
                {
                    label: Week2+"-"+Week1end,
                    startTime: Week2,
                    endTime: Week1end
                },
                {
                    label: Week3+"-"+Week2end,
                    startTime: Week3,
                    endTime: Week2end
                },
                
                {
                    label: Week4+"-"+Week3end,
                    startTime: Week4,
                    endTime: Week3end
                },
                {
                    label: Week5+"-"+Week4end,
                    startTime: Week5,
                    endTime: Week4end
                },
                {
                    label: Week6+"-"+Week5end,
                    startTime: Week6,
                    endTime: Week5end
                },
                {
                    label: Week7+"-"+Week6end,
                    startTime: Week7,
                    endTime: Week6end
                },
                {
                    label: Week8+"-"+Week7end,
                    startTime: Week8,
                    endTime: Week7end
                },
                {
                    label: Week9+"-"+Week8end,
                    startTime: Week9,
                    endTime: Week8end
                },
                {
                    label: Week10+"-"+Week9end,
                    startTime: Week10,
                    endTime: Week9end
                },
                {
                    label: Week11+"-"+Week10end,
                    startTime: Week11,
                    endTime: Week10end
                },
                {
                    label: Week12+"-"+Week11end,
                    startTime: Week12,
                    endTime: Week11end
                },
                
            ]
            this.query.startTime=this.TimeList[0].startTime
            this.dateValue=this.TimeList[0].label
            this.query.endTime=this.TimeList[0].endTime
            this.loadData()

        },
        ok() {},
        cancel() {},
        //去详情-粉丝贡献
        goDetail(name, data) {
            if (name == 'star') {
                this.$router.push({
                    name: `${name}Detail`,
                    query: {
                        id: data.id
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
