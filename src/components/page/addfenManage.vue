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
                        <Button type="primary" @click="addfensBtn">新增粉丝</Button>
                        <Button type="primary" @click="batchModal" style="margin-left: 20px">批量打榜</Button>
                        <!-- <Button style="float:right" @click="seeGivRecord">赠送记录</Button> -->
                    </div>
                </Form>
            </div>

            <Table border :columns="table.columns" :data="table.data"></Table>
            <pagination :pagination="pagination" @on-page-size-change="loadData" @on-page-change="loadData"></pagination>
        </div>
        <!-- 打榜送热力值 -->
        <div v-if="modalHotModal">
            <Modal v-model="modalHotModal" title="打榜" @on-ok="ok" @on-cancel="cancel" width="400">
                <div class="card-content">
                    <div class="card">
                        <div style="margin-top:10px;margin-bottom:5px">输入明星姓名</div>
                    
                        <Select v-model="starId" filterable @on-query-change="remoteMethod">
                            <Option v-for="(option, index) in starList" :value="option.id" :key="index">{{ option.name }}</Option>
                        </Select>
                          <div style="margin-top:10px;margin-bottom:5px">打榜热力值</div>
                        <Input v-model="vigourVal" style="margin-bottom: 10px" />
                        当前热力值：{{ rowvigourVal }}
                    </div>
                </div>
                <div slot="footer" style="text-align: center">
                    <Button type="primary" style="width: 100px" @click="sendHot">提交</Button>
                </div>
            </Modal>
        </div>
        <!-- 新增粉丝 -->
        <div v-if="addfensModal">
            <Modal v-model="addfensModal" title="新增粉丝" @on-ok="ok" @on-cancel="cancel" width="400">
                <div class="card-content">
                    <div class="card">
                        <div style="margin-top:10px;margin-bottom:5px">输入昵称</div>
                           <Input v-model="nickName" style="margin-bottom: 10px" />
                           <UploadHeader @updateCarouselImg="updateCarouselimgHeader" :homeImg="avatar"></UploadHeader>
                             <div class="card-area" v-if="avatar" style="margin-top:20px">
                        <div class="card-content">
                            <div class="card">
                                <div class="text">头像预览</div>
                                <viewer :images="[avatar]">
                                    <div style="display: inline-block; margin: 0 auto">
                                        <div class="preview-headers">
                                            <img :src="avatar" style="width: 100px; height: 100px; border-radius: 50px" />
                                        </div>
                                    </div>
                                </viewer>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
                <div slot="footer" style="text-align: center">
                    <Button type="primary" style="width: 100px" @click="addfensconfirm">提交</Button>
                </div>
            </Modal>
        </div>
        <!-- 批量导入 -->
        <ExcelUploadModal :upload-model.sync="uploadModel" @success="handleExcelUploadModalSuccess"></ExcelUploadModal>
    </div>
</template>

<script>
import ExcelUploadModal from '../common/ExcelUploadModalAdd.vue';
import { timeChange } from '../../utils/helper.js';
import Pagination from './../common/Pagination.vue';
import { PAGE_PARAMS } from './../../utils/constants.js';
import UploadHeader from '../page/StarList/uploadHeaderFens.vue';
export default {
    name: 'myArticle',
    components: {
        ExcelUploadModal,
        Pagination,
        UploadHeader
    },
    data() {
        return {
            avatar:"",
            nickName:"",
            starList: [], //搜索的明星列表
            starName: '',
            starId: '',
            pagination: Object.assign({}, PAGE_PARAMS),
            modalOneData: {}, //选择单行的数据
            uploadModel: false, //批量导入
            vigourVal: null, //赠送的热力数量
            rowvigourVal: null, //赠送的热力数量
            modalHotModal: false,
            addfensModal: false,
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
                        minWidth: 120, // todo  男女值分别为什么
                        render: (h, params) => {
                            let { lastStar } = params.row;
                            return h('div', lastStar || '无');
                        }
                    },
                    {
                        title: '消耗活力值',
                        key: 'consumeVigourVal',
                        align: 'center',
                        sortable: true,
                        minWidth: 130,
                        render: (h, params) => {
                            let { consumeVigourVal } = params.row;
                            return h('div', consumeVigourVal || '无');
                        }
                    },
                    {
                        title: '当前活力值',
                        key: 'vigourVal',
                        align: 'center',
                        sortable: true,
                        minWidth: 130,
                        render: (h, params) => {
                            let { vigourVal } = params.row;
                            return h('div', vigourVal || '无');
                        }
                    },
                    {
                        title: '新增时间',
                        key: 'addTime',
                        align: 'center',
                        minWidth: 150,
                        render: (h, params) => {
                            let { addTime } = params.row;
                            return h('div', addTime || '无');
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
            console.log(data)
        },
        // 新增粉丝弹窗
        addfensBtn(){
            this.addfensModal = true
        },
        remoteMethod(starName) {
            console.log(starName);
            this.starName = starName;
            if (!starName || starName.length < 2) {
                this.starList = [];
                return false;
            }
            if (starName && starName.length > 1) {
                this.axios
                    .get('/fens/selectStarByName', {
                        params: {
                            starName: this.starName
                        }
                    })
                    .then((res) => {
                        this.starList = res.data;
                    })
                    .catch((err) => {
                        this.$Message.error(err);
                    });
            }
        },
        showModalOne() {
            this.modalHotModal = true;
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
        // 打榜送热力值
        sendHot() {
            if(!this.starName){
                this.$Message.error('请选择明星');
                return false
            }
            if(!this.vigourVal){
                this.$Message.error('请输入热力值');
                return false
            }
            this.axios
                .post(`/fens/bulidFensHit`, {
                    id: this.modalOneData.id,
                    starId: this.starId,
                    starName: this.starName,
                    vigourVal: this.vigourVal
                })
                .then((res) => {
                    this.$Message.success('赠送成功');
                    this.loadData();
                    this.modalOneData = {};
                    this.vigourVal = '';
                    this.starId = '';
                    this.starName = '';
                    this.starList = [];
                    this.modalHotModal = false;
                })
                .catch((err) => {
                    this.$Message.error(err);
                });
        },
        // 新增粉丝
        addfensconfirm() {
            if(!this.nickName){
                this.$Message.error('请输入粉丝昵称');
                return false
            }
            if(!this.avatar){
                this.$Message.error('请上传头像');
                return false
            }
            this.axios
                .post(`/fens/addBulidFens`, {
                    avatarUrl: this.avatar,
                    nickName: this.nickName,
               
                })
                .then((res) => {
                    this.$Message.success('新增粉丝成功');
                    this.loadData();
                  
                    this.nickName = '';
                    this.avatar = '';
              
                    this.addfensModal = false;
                })
                .catch((err) => {
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
                .then((res) => {
                    this.table.data = res.data.list || [];
                    this.pagination.total = res.data.total || 0;
                })
                .catch((err) => {
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