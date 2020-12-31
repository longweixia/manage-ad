<template>
    <div class="fens-give-tablelist">
        <div class="container">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="赠送时间">
                        <DatePicker type="daterange" ref='DatePicker' placeholder="请选择起止时间" style="width: 200px" @on-change="changeDate"></DatePicker>
                    </FormItem>

                    <FormItem label="ID" prop="id">
                        <Input type="number" v-model="query.id" placeholder="ID" clearable></Input>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="handleSearch">搜索</Button>
                        <Button @click="resetForm('ruleForm')" style="margin-left: 10px">重置</Button>
                    </FormItem>
                    <!-- <div >
                        <Button type="primary" @click="handleSearch">批量赠送</Button>
                        
                    </div> -->
                </Form>
            </div>

            <Table border :columns="table.columns" :data="table.data"></Table>
                <Pagination  :pagination="pagination" @on-page-size-change="loadData" @on-page-change="loadData"></Pagination>        </div>

        
    </div>
</template>

<script>
// import {getConfigsByProductId,addNewAndroidPlugin}  from '../../api/index.js';
import { timeChange } from '../../utils/helper.js';
import Pagination from './../common/Pagination.vue'
import { PAGE_PARAMS } from './../../utils/constants.js'
export default {
    name: 'myArticle',
        components: {
 
        Pagination
    },
    data() {
        return {
             pagination: Object.assign({}, PAGE_PARAMS),
            modalOne: false,
            homeImg: '', //首页轮播图
            detailImg: '', //详情页
            hitPopupImg: '', //打榜弹窗图
            query: {
                id: '',

          
                giveTime: '',
                giveTimeEnd: ''
            },
            table: {
                data: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'fensId',

                        align: 'center',
                        minWidth: 80
                    },
                    {
                        title: '昵称',
                        key: 'nickName',
                        align: 'center',
                        minWidth: 80
                    },

                    {
                        title: '赠送数量',
                        key: 'vigourVal',
                        align: 'center',
                        sortable: true,
                        minWidth: 150
                    },
                    {
                        title: '赠送时间',
                        key: 'addTime',
                        align: 'center',
                        sortable: true,
                        minWidth: 150,
                        render: (h, params) => {
                            let { addTime } = params.row,
                                text;

                            text = timeChange(addTime);
                            return h('div', text);
                        }
                    },

                    {
                        title: '操作人',
                        key: 'addUser',
                        align: 'center',
                        minWidth: 150
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
        this.loadData();
    },
    methods: {
        ok() {},
        cancel() {},
        //去详情
        goDetail() {
            this.$router.push({
                name: 'starDetail'
            });
        },
        // 单个提交
        submitOne() {
            this.modalOne = false;
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
             this.$refs.DatePicker.handleClear()
            this.query.giveTime =""
            this.query.giveTimeEnd =""
        },
        // 改变时间
        changeDate(e) {
            this.query.giveTime = e[0]?e[0] + ' 00:00:00':e[0];
            this.query.giveTimeEnd = e[1]? e[1]  + ' 23:59:59': e[1] ;
        },
        loadData(search) {
               this.query.pageNum=this.pagination.pageNum,
                    this.query.pageSize=this.pagination.pageSize
            this.axios
                .post(`/fens/selectGivePage`, this.query)
                .then((res) => {
                    this.table.data = res.data.list;
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
.fens-give-tablelist {
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
        .card {
            width: 300px;
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
