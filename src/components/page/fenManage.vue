<template>
    <div class="fen-manage-area">
          <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-s-custom"></i> 榜单排名 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="ID" prop="id">
                        <!-- todo  id 搜索不匹配 -->
                        <InputNumber  v-model="query.id" placeholder="ID" clearable style="width:200px"></InputNumber>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="handleSearch">搜索</Button>
                        <Button @click="resetForm('ruleForm')" style="margin-left:10px">重置</Button>
                    </FormItem>
                    <div>
                        <Button type="primary" @click="batchModal">批量赠送</Button>
                        <Button style="float:right" @click="seeGivRecord">赠送记录</Button>
                    </div>
                </Form>
            </div>

            <Table border :columns="table.columns" :data="table.data"></Table>
    <pagination  :pagination="pagination" @on-page-size-change="loadData" @on-page-change="loadData"></pagination>        </div>
        <!-- 赠送活力值 -->
        <Modal v-model="modalOne" title="赠送活力值" @on-ok="ok" @on-cancel="cancel" width="400">
            <div class="card-content">
                <div class="card">
                    <div class="text">
                        粉丝：
                        <span style="font-weight:normal">{{ modalOneData.nickName }}</span>
                        ，ID：
                        <span style="font-weight:normal">{{ modalOneData.fensId }}</span>
                    </div>
                    <Input v-model="vigourVal" style="margin-top:10px" />
                    <!-- <img :src="homeImg"/> -->
                </div>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="primary" style="width:100px" @click="submitOne">提交</Button>
            </div>
        </Modal>
        <!-- 批量导入 -->
        <!-- 批量导入 -->
        <ExcelUploadModal :upload-model.sync="uploadModel" @success="handleExcelUploadModalSuccess"></ExcelUploadModal>
    </div>
</template>

<script>
// import { getConfigsByProductId, addNewAndroidPlugin } from '../../api/index.js';
import ExcelUploadModal from '../common/ExcelUploadModal.vue';
import {timeChange} from '../../utils/helper.js';
import Pagination from './../common/Pagination.vue'
import { PAGE_PARAMS } from './../../utils/constants.js'

export default {
    name: 'myArticle',
    components: {
        ExcelUploadModal,
        Pagination
    },
    data() {
        return {
            pagination: Object.assign({}, PAGE_PARAMS),
            modalOneData: {}, //选择单行的数据
            uploadModel: false, //批量导入
            vigourVal: null, //赠送的热力数量
            modalOne: false,
            homeImg: '', //首页轮播图
            detailImg: '', //详情页
            hitPopupImg: '', //打榜弹窗图
            query: {
                id: null,
                pageIndex: 1,
                pageSize: 10
            },
            table: {
                data: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'fensId',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '昵称',
                        key: 'nickName',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align: 'center',
                        minWidth: 80, // todo  男女值分别为什么
                        render: (h, params) => {
                            let { gender } = params.row;
                            let text = '无';
                            if (gender === 0) {
                                text = '女';
                            } else if (gender === 1) {
                                text = '男';
                            }

                            return h('div', text);
                        }
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        align: 'center',
                        minWidth: 150
                    },
                    {
                        title: '累计活力值',
                        key: 'totalVigourVal',
                        align: 'center',
                        sortable: true,
                        minWidth: 130
                    },
                    {
                        title: '消耗活力值',
                        key: 'consumeVigourVal',
                        align: 'center',
                        sortable: true,
                        minWidth: 130
                    },
                    {
                        title: '当前活力值',
                        key: 'vigourVal',
                        align: 'center',
                        sortable: true,
                        minWidth: 130
                    },

                    {
                        title: '注册时间',
                        key: 'addTime',
                        align: 'center',
                        minWidth: 150,
                         render: (h, params) => {
                             let {addTime} = params.row
                            let clickBtn = h(
                                'div',
                                timeChange(addTime)||"无"
                            );
                            return h('div', [clickBtn]);
                        }

                    },
                    {
                        title: '最后登录时间',
                        key: 'lastVisitTime', //todo 时间需要格式化
                        align: 'center',
                        minWidth: 180,
                          render: (h, params) => {
                             let {lastVisitTime} = params.row
                            let clickBtn = h(
                                'div',
                                timeChange(lastVisitTime)||"无"
                            );
                            return h('div', [clickBtn]);
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
                                            this.modalOneData = params.row;
                                            this.showModalOne();
                                        }
                                    }
                                },
                                '赠送活力值'
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
        // 赠送活力值
        showModalOne() {
            this.modalOne = true;
        },
        // 批量赠送
        batchModal() {
            this.uploadModel = true;
        },
        // 批量导入弹窗成功
        handleExcelUploadModalSuccess(res) {
            this.loadData(true);
            this.$nextTick(() => {
                // if (res.data.length) {
                // // 有提示时显示返回信息
                // this.resInfoModal.show = true
                // this.resInfoModal.res = res.data
                // }
            });
        },
        ok() {},
        cancel() {},
        //去详情
        goDetail() {
            this.$router.push({
                name: 'starDetail'
            });
        },
        //去赠送记录
        seeGivRecord() {
            this.$router.push({
                name: 'givRecord'
            });
        },
        // 单个提交
        submitOne() {
            let id = this.modalOneData.id,
            vigourVal =this.vigourVal;
            this.axios
                .post(`/fens/giveVigourVal?id=${id}&vigourVal=${vigourVal}`)
                .then(res => {
                
                        this.$Message.success('赠送成功');
                        this.loadData()
                        this.modalOneData = {}
                        this.vigourVal= ""
                        this.modalOne = false;
                    
                })
                .catch(err => {
                  this.$Message.error(err);
                });
        },

        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        loadData(search) {

            this.axios
                .post(`/fens/selectFensPage`, {
                    id: search ? this.query.id : '',
                    pageNum:  this.pagination.pageNum,
                    pageSize: this.pagination.pageSize
                })
                .then(res => {
                    this.table.data = res.data.list;
                      this.pagination.total = res.data.total
                })
                .catch(err => {
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
.fen-manage-area{
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
.ivu-form-item-content{
    display: inline-block;
}
}
</style>
