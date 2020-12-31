<template>
    <div class="star-list-table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 基础表格 </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- <Button type="primary" @click="getToken">获取token</Button> -->
        <div class="container">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="query.name" placeholder="姓名" clearable></Input>
                    </FormItem>
                    <FormItem label="ID" prop="id">
                        <Input type="number" v-model="query.id" placeholder="ID" clearable></Input>
                    </FormItem>

                    <FormItem>
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </FormItem>
                </Form>
                <div>
                    <Button type="primary" style="width: 100px" @click="goDetail('add')">添加明星</Button>
                </div>
            </div>

            <Table border :columns="table.columns" :data="table.data"></Table>
            <Pagination :pagination="pagination" @on-page-size-change="loadData" @on-page-change="loadData"></Pagination>
        </div>

        <Modal v-model="modalImg" title="查看图片" @on-ok="ok" @on-cancel="cancel" width="600">
            <div class="card-content-startist">
                <div class="card">
                    <div class="text">首页轮播图预览</div>
                    <viewer :images="[homeImg]">
                        <img :src="homeImg" class="img" />
                    </viewer>
                </div>
                <div class="card">
                    <div class="text">明星详细页预览</div>

                    <viewer :images="[detailImg]">
                        <img :src="detailImg" class="img" />
                    </viewer>
                </div>
                <div class="card">
                    <div class="text">打榜弹窗预览</div>

                    <viewer :images="[hitPopupImg]">
                        <img :src="hitPopupImg" class="img" />
                    </viewer>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
// import {getConfigsByProductId,addNewAndroidPlugin}  from '../../api/index.js';
import { timeChange } from '../../utils/helper.js';
import Pagination from './../common/Pagination.vue';
import { PAGE_PARAMS } from './../../utils/constants.js';
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
            query: {
                id: '',
                name: ''
                
            },
            table: {
                data: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'starId',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center',
                        minWidth: 80
                    },
                    {
                        title: '相片',
                        key: 'avatar',

                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            //  homeImg 首页轮播图
                            //  detailImg 详情页
                            //  hitPopupImg  打榜弹窗图
                            let { homeImg, detailImg, hitPopupImg } = params.row,
                                text;
                            //  avatar?text = '查看':text = '无'

                            let clickBtn = h(
                                'div',
                                {
                                    style: {
                                        color: '#2d8cf0',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.modalImg = true;
                                            this.homeImg = homeImg;
                                            this.detailImg = detailImg;
                                            this.hitPopupImg = hitPopupImg;
                                        }
                                    }
                                },
                                '查看'
                            );
                            return h('div', [clickBtn]);
                        }
                    },
                    {
                        title: '周/月冠军次数',
                        key: 'address',
                        align: 'center',
                        sortable: true,
                        minWidth: 150,
                        render: (h, params) => {
                            let { rankWeekChampionNum, rankMonthChampionNum } = params.row;
                            let week = h('span', rankWeekChampionNum + '/');
                            let month = h('span', rankMonthChampionNum);
                            return h('div', [week, month]);
                        }
                    },
                    {
                        title: '周/月亚军次数',
                        key: 'name',
                        align: 'center',
                        sortable: true,
                        minWidth: 150,
                        render: (h, params) => {
                            let { rankWeekSecondNum, rankMonthSecondNum } = params.row;
                            let week = h('span', rankWeekSecondNum + '/');
                            let month = h('span', rankMonthSecondNum);
                            return h('div', [week, month]);
                        }
                    },
                    {
                        title: '周/月季军次数',
                        key: 'name',
                        sortable: true,
                        align: 'center',
                        minWidth: 150,
                        render: (h, params) => {
                            let { rankWeekThirdNum, rankWeekChampionNum } = params.row;
                            let week = h('span', rankWeekThirdNum + '/');
                            let month = h('span', rankWeekChampionNum);
                            return h('div', [week, month]);
                        }
                    },
                    {
                        title: '当前周排名',
                        key: 'thisWeekRank',
                        sortable: true,
                        align: 'center',
                        minWidth: 130
                    },
                    {
                        title: '当前月排名',
                        key: 'thisMonthRank',
                        sortable: true,
                        align: 'center',
                        minWidth: 130
                    },
                    {
                        title: '标签',
                        key: 'tags',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '添加时间',
                        key: 'createTime',
                        align: 'center',
                        minWidth: 180,
                        render: (h, params) => {
                            let { createTime } = params.row,
                                text;

                            text = timeChange(createTime);
                            return h('div', text || '无');
                        }
                    },
                    {
                        title: '操作',
                        key: 'name',
                        align: 'center',
                        minWidth: 80,
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
                                            this.goDetail('detail', params.row.id);
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
        this.loadData();
    },
    methods: {
        ok() {},
        cancel() {},
        //去详情
        goDetail(name, id) {
            this.$router.push({
                name: 'starDetail',
                query: {
                    id: id,
                    add:name=='add'?'add':''
                }
            });
        },
        // 获取token
        getToken() {
            this.axios
                .post(`/common/testLogin?id=1`)
                .then((res) => {
                    let token = res.data.token;
                    localStorage.setItem('Authorization', token);
                })
                .catch((err) => {
                    this.$Message.error(err);
                });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        loadData() {
            this.axios
                .post(`/star/star/list`, {
                    id: this.query.id,
                    name:  this.query.name,
                    pageNum: this.pagination.pageNum,
                    pageSize: this.pagination.pageSize
                })
                .then((res) => {
                    this.table.data = res.data.list;
                    this.pagination.total = res.data.total&&Number(res.data.total);
                })
                .catch((err) => {
                    this.$Message.error(err);
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
.star-list-table {
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

    .page-content {
        text-align: right;
        margin-top: 40px;
    }
    .ivu-form .ivu-form-item-label,
    .ivu-form-item-content {
        display: inline-block;
    }
}
.card-content-startist {
    display: flex;
    justify-content: center;
    align-items: center;
    // min-height: 350px;
    .card {
        width: 100px;
        height: 100px;
        margin-right: 20px;
        .text {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .img {
            width: 100%;
            height: 100%;
            padding: 5px;
            background: #ddd;
        }
    }
}
</style>
