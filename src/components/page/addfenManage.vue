<template>
    <div class="fen-manage-area">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 自建粉丝 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="ID" prop="id">
                        <!-- todo  id 搜索不匹配 -->
                        <InputNumber v-model="query.id" placeholder="ID" clearable style="width: 200px"></InputNumber>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="handleSearch">搜索</Button>
                        <Button @click="resetForm('ruleForm')" style="margin-left: 10px">重置</Button>
                    </FormItem>
                    <div>
                        <Button type="primary" @click="addfensModal">新增粉丝</Button>
                        <Button type="primary" @click="batchModal" style="margin-left: 20px">批量打榜</Button>
                        <!-- <Button style="float:right" @click="seeGivRecord">赠送记录</Button> -->
                    </div>
                </Form>
            </div>

            <Table border :columns="table.columns" :data="table.data"></Table>
            <pagination :pagination="pagination" @on-page-size-change="loadData" @on-page-change="loadData"></pagination>
        </div>
        <!-- 赠送活力值 -->
        <Modal v-model="modalOne" title="打榜" @on-ok="ok" @on-cancel="cancel" width="400">
            <div class="card-content">
                <div class="card">
                    <!-- <div class="text">
                        粉丝：
                        <span style="font-weight:normal">{{ modalOneData.nickName }}</span>
                        ，ID：
                        <span style="font-weight:normal">{{ modalOneData.fensId }}</span>
                    </div> -->

                    <div style="width:100px">输入明星姓名</div>

                    <Select @on-query-change="changeStarName" filterable v-model="modelStar" style="width:200px;margin-top:10px;">
                        <Option v-for="(item, index) in starList" :key="index" :value="item.id">{{ item.name }}</Option>
                    </Select>

                    <div>
                        <div style="width:100px;margin-top:10px">打榜热力值</div>
                        <Input v-model="vigourVal" style="margin-top: 10px;width:200px" />
                    </div>
                    <br />
                    当前热力值：{{ rowvigourVal }}
                    <!-- <img :src="homeImg"/> -->
                </div>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" style="width: 100px" @click="submitOne">提交</Button>
            </div>
        </Modal>
        <!-- 新增粉丝 -->
        <Modal v-model="modalfens" title="新增粉丝" @on-ok="ok" @on-cancel="cancel" width="400">
            <div class="card-content">
                <div class="card">
                    输入昵称
                    <Input v-model="nickName" style="margin-top: 10px" />
                    <UploadHeader @updateCarouselImg="updateCarouselimgHeader" :homeImg="avatar"></UploadHeader>
                </div>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" style="width: 100px" @click="submitOnefens">提交</Button>
            </div>
        </Modal>
        <!-- 批量导入 -->
        <!-- 批量导入 -->
        <ExcelUploadModal :upload-model.sync="uploadModel" @success="handleExcelUploadModalSuccess"></ExcelUploadModal>
    </div>
</template>

<script>
// import { getConfigsByProductId, addNewAndroidPlugin } from '../../api/index.js';
import ExcelUploadModal from '../common/ExcelUploadModalAdd.vue';
import { timeChange } from '../../utils/helper.js';
import UploadHeader from './StarList/fensuploadHeader.vue';
import Pagination from './../common/Pagination.vue';
import { PAGE_PARAMS } from './../../utils/constants.js';

export default {
    name: 'myArticle',
    components: {
        ExcelUploadModal,
        Pagination,
        UploadHeader
    },
    data() {
        return {
            modelStar: '',
            nickName: '',
            avatar: '', //头像
            modalfens: false,
            nickNameList: [],
            starList: [], //搜索的明星列表
            starName: '',
            starId: '',
            pagination: Object.assign({}, PAGE_PARAMS),
            modalOneData: {}, //选择单行的数据
            uploadModel: false, //批量导入
            vigourVal: null, //赠送的热力数量
            rowvigourVal: null, //赠送的热力数量
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
                        title: '末次赠送明星',
                        key: 'lastStar',
                        align: 'center',
                        minWidth: 100
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
                        title: '新增时间',
                        key: 'addTime',
                        align: 'center',
                        minWidth: 150,
                        render: (h, params) => {
                            let { addTime } = params.row;
                            let clickBtn = h('div', timeChange(addTime) || '无');
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
                                            this.rowvigourVal = params.row.vigourVal;
                                            this.showModalOne();
                                        }
                                    }
                                },
                                '打榜'
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
        updateCarouselimgHeader(data) {
            this.avatar = data;
        },
        changeStarName(starName) {
            this.starName = starName;
            if (starName && starName.length < 2) {
                this.starList = [];
                this.modelStar = '';
                this.starName = '';
                return false;
            }
            if (!starName) {
                this.starList = [];
                this.modelStar = '';
                this.starName = '';
                return false;
            }

            if (starName && starName.length > 1) {
                this.axios
                    .get('/fens/selectStarByName', {
                        params: {
                            starName: starName
                        }
                    })
                    .then(res => {
                        this.starList = res.data;
                    })
                    .catch(err => {
                        this.$Message.error(err);
                    });
            }
        },
        // changenickName() {
        //     if (!this.nickName) {
        //         this.nickNameList = [];
        //         return false;
        //     }
        //     if (this.nickName && this.nickName.length > 1) {
        //         this.axios
        //             .get('/fens/selectStarByName', {
        //                 params: {
        //                     starName: this.nickName
        //                 }
        //             })
        //             .then(res => {
        //                 this.nickNameList = res.data;
        //             })
        //             .catch(err => {
        //                 this.$Message.error(err);
        //             });
        //     }
        // },
        // 赠送活力值
        showModalOne() {
            this.modalOne = true;
        },
        // 新增粉丝
        addfensModal() {
            this.modalfens = true;
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
        // 打榜
        submitOne() {
            if (!this.starName) {
                this.$Message.error('请选择明星');
                return false;
            }
            if (!this.vigourVal) {
                this.$Message.error('请输入热力值');
                return false;
            }

            this.axios
                .post(`/fens/bulidFensHit`, {
                    id: this.modalOneData.id, //粉丝id
                    starId: this.modelStar, //明星id
                    starName: this.starName, //明星名称
                    vigourVal: this.vigourVal && Number(this.vigourVal) //热力值
                })
                .then(res => {
                    this.$Message.success('赠送成功');
                    this.loadData();
                    this.modalOneData = {};
                    this.vigourVal = '';
                    this.starId = '';

                    this.starName = '';
                    this.modelStar = '';
                    this.modalOne = false;
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
        // 新增粉丝
        submitOnefens() {
            if (!this.nickName) {
                this.$Message.error('请输入昵称');
                return false;
            }
            if (!this.avatar) {
                this.$Message.error('请上传头像');
                return false;
            }
            let nickName = this.nickName,
                avatarUrl = this.avatar;
            this.axios
                .post(`/fens/addBulidFens`, {
                    nickName: nickName,
                    avatarUrl: avatarUrl
                })
                .then(res => {
                    this.$Message.success('新增成功');

                    this.nickName = '';
                    this.avatar = '';
                    this.modalfens = false;
                    this.loadData();
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
                    bulid: 1, //是否自建粉丝，0是注册
                    id: search ? this.query.id : '',
                    pageNum: this.pagination.pageNum,
                    pageSize: this.pagination.pageSize
                })
                .then(res => {
                    this.table.data = res.data.list;

                    this.pagination.total = res.data.total;
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
        // 触发搜索按钮
        handleSearch() {
            this.pagination.pageNum = 1;
            // this.$set(this.query, 'pageIndex', 1);
            this.loadData(true);
        }
    }
};
</script>

<style lang="less">
.fen-manage-area {
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
