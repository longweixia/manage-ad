<template>
    <div class="resource-table-list">
         <div class="container" style="border:none">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="有效期" prop="time">
                        <DatePicker @on-change="changeDate" type="daterange" placeholder="选择日期" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="资源类型" prop="type">
                        <Select v-model="query.type" style="width: 150px" clearable>
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="状态" prop="status">
                        <Select v-model="query.status" style="width: 150px" clearable>
                            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="handleSearch" style="margin-left:20px">搜索</Button>
                        <Button @click="resetForm('ruleForm')" style="margin-left:10px">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="addBtn">
                    <Button type="primary" @click="addResouce">添加资源</Button>
            </div>

            <Table border :columns="table.columns" :data="table.data" style="width: 100%"></Table>
            <!-- <Page class="page-content" :total="total" show-elevator show-sizer /> -->
            <pagination  :pagination="pagination" @on-page-size-change="loadData" @on-page-change="loadData"></pagination>

        </div>
        <!-- <Modal v-model="modalImg" title="查看图片" @on-ok="ok" @on-cancel="cancel" width="1000">
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
        </Modal> -->
    </div>
</template>

<script>
import {timeChange,yearDay, filterDeadline} from '../../../utils/helper.js'
import Pagination from './../../common/Pagination.vue'
import { PAGE_PARAMS } from '../../../utils/constants.js'

export default {
    name: 'myArticle',
      components: {

    Pagination,

  },
    data() {
        return {
      pagination: Object.assign({}, PAGE_PARAMS),
            modalImg: false,
            homeImg: '', //首页轮播图
            detailImg: '', //详情页
            hitPopupImg: '', //打榜弹窗图
            time: '',
            typeList: [
                {
                    value: 1,
                    label: '后援金'
                },
                {
                    value: 2,
                    label: '小程序开屏'
                },
                 {
                    value: 3,
                    label: '首页轮播'
                },
                {
                    value: 4,
                    label: '户外大屏'
                }
            ],
            statusList: [
                {
                    value: 2,
                    label: '进行中'
                },
                {
                    value: 1,
                    label: '待开始'
                },
                {
                    value: 3,
                    label: '已结束'
                }
            ],
            query: {
                beginTime: '',//开始时间
                endTime: '',//结束时间
                pageNum: 1,
                pageSize: 20,
                status: '',//1-待开始 2-进行中 3-已结束
                type: ''//资源类型(1-后援金 2-小程序开屏 3-首页轮播 4-户外大屏)
            },
            table: {
                data: [
                    // {type:2,target:2,beginTime:'2020/11/16',endTime:'2020/12/27',
                    // relationStar:['邓超','小王','小li'],completeStar:['邓超','小王','小搞'],status:2,
                    // addTime:'2020/11/16'
                    // }
                ],
                columns: [
                    {
                        title: '资源类型',
                        key: 'type',
                        align: 'center',
                        minWidth: 120,
                        render: (h, params) => {
                            let { type } = params.row, text;
                            if(type){
                              text = this.typeList.find((item) => {return item.value == type}).label
                            }else{
                                text = "无"
                            }
                            return h('div', text);
                        }
                    },
                    {
                        title: '目标人数',
                        key: 'target',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '有效期',
                        key: 'beginTime',
                        sortable: true,
                        align: 'center',
                        minWidth: 280,
                        render: (h, params) => {
                            let { beginTime, endTime } = params.row, text;
                            let time = h(
                                'div',
                                {
                                    style: {
                                        fontSize: '12px',
                                    },
                                 
                                },
                               (yearDay(beginTime)||'无')+"—"+(yearDay(endTime)||'无')
                            );
                            // 计算倒计时
                            let countDownText;
                            countDownText = filterDeadline(endTime)

                            let countDown = h(
                                'div',
                                {
                                    style: {
                                        color: 'red',
                                      
                                        fontSize: '12px',
                                    },
                                 
                                },
                               `${countDownText}`
                            );
                            return h('div', [time,countDown]);
                        }
                    },
                    {
                        title: '关联明星',
                        key: 'relationStar',
                        align: 'center',
                     
                        minWidth: 150,
                        render: (h, params) => {
                            let { relationStar } = params.row;
                            let text='';
                              if(!relationStar||relationStar.length==0){
                                text = "无"
                            }else{
                                relationStar&&relationStar.forEach((item,i)=>{
                                if(!text){
                                    text = text+item
                                }else{
                                     text = text+'，'+item
                                }
                    
                            })
                            }
                            
                            let countDown = h(
                                'div',
                                {
                                    // style: {
                                    //     color: 'blue',
                                    //     cursor: 'pointer'
                                    // },
                                 
                                },
                               text
                            );
                       
                            return h('div', [countDown]);
                        }
                    },
                    {
                        title: '已完成',
                        key: 'completeStar',
                        align: 'center',
                  
                        minWidth: 150,
                        render: (h, params) => {
                            let { completeStar } = params.row;
                            let text='';
                            if(!completeStar||completeStar.length==0){
                                text = "无"
                            }else{
                                 completeStar&&completeStar.forEach((item,i)=>{
                                if(!text){
                                    text = text+item
                                }else{
                                     text = text+'，'+item
                                }
                    
                            })
                            }
                           
                            let countDown = h(
                                'div',
                                {
                                    // style: {
                                    //     color: 'blue',
                                    //     cursor: 'pointer'
                                    // },
                                 
                                },
                               text
                            );
                       
                            return h('div', [countDown]);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                 
                        minWidth: 150,
                        render: (h, params) => {
                            // 1-待开始 2-进行中 3-已结束
                            let { status} = params.row,text;
                            switch (status) {
                                case 1:
                                    text = '待开始'
                                    break;
                                case 2:
                                    text = '进行中'
                                    break;
                                case 3:
                                    text = '已结束'
                                    break;
                            
                                default:
                                    break;
                            }
                            
                            return h('div', text);
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'addTime',
                        align: 'center',
                        sortable: true,
                        minWidth: 150,
                            render: (h, params) => {
                    
                            let { addTime} = params.row,text;
                            
                       
                            return h('div', addTime||'无');
                        }
                   
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
                                            this.goDetail();
                                        }
                                    }
                                },
                                '详情'
                            );
                            return h('div', [clickBtn]);
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
        // 页面没刷新
        console.log(this.$route.params.loadPage)
        this.loadData();
    },
    methods: {
        // 添加资源
        addResouce(){
            this.$router.push({
                name:'addResouce'
            })

        },
        // 改变时间
        changeDate(e){
            this.query.beginTime = e[0]+" 00:00:00"
            this.query.endTime = e[1]+" 23:59:59"
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
            this.$refs[formName].resetFields();
        },
        loadData() {
             this.query.pageNum =   this.pagination.pageNum
            this.query.pageSize = this.pagination.pageSize
            this.axios
                .post(`/resources/selectResourcesPage`, this.query)
                .then((res) => {
                    this.table.data = res.data.list;
                    // this.total = res.data.total;
                    this.pagination.total = res.data.total
                })
                .catch((err) => {
                
                        this.$Message.error(err);
                });
        },
        // 触发搜索按钮
        handleSearch() {
               this.pagination.pageNum = 1
            // this.$set(this.query, 'pageIndex', 1);
            this.loadData(true);
        }
    }
};
</script>

<style lang="less">
.resource-table-list{


.handle-box {
    // margin-bottom: 20px;
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
.addBtn{
    margin-bottom: 10px;
}
.ivu-form .ivu-form-item-label,
.ivu-form-item-content{
    display: inline-block;
}
}
</style>
