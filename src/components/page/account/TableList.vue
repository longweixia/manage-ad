<template>
    <div class="account-TableList">
        <div class="container">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="query.name" placeholder="姓名" clearable></Input>
                    </FormItem>
                    <FormItem label="账号" prop="account">
                        <Input v-model="query.account" placeholder="姓名" clearable></Input>
                    </FormItem>
                    <FormItem label="状态" prop="status">
                        <Select v-model="query.status" style="width: 150px" clearable>
                            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>

                    <div style="display: inline-block; margin-left: 20px">
                        <Button type="primary" @click="handleSearch">搜索</Button>
                        <Button @click="resetForm('ruleForm')" class="btn-right">重置</Button>
                    </div>
                </Form>
            </div>
            <div class="addBtn">
                <Button type="primary" @click="addResouce">新增账号</Button>
            </div>

            <Table border :columns="table.columns" :data="table.data" style="width: 100%"></Table>
            <Page class="page-content" :total="total" show-elevator show-sizer />
        </div>
        <!-- 新增账号弹窗 -->
        <Modal v-model="modalImg" title="新增账号" @on-ok="ok" @on-cancel="cancel" width="600">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <FormItem label="姓名" prop="name" style="width: 400px">
                    <Input v-model="formCustom.name"></Input>
                    <div style="color: #a3a3a3; font-size: 12px; height: 22px">用户姓名</div>
                </FormItem>

                <FormItem label="手机" prop="account" style="width: 400px">
                    <Input v-model="formCustom.account"></Input>
                    <div style="color: #a3a3a3; font-size: 12px; height: 22px">大陆11位手机号，使用手机号登录</div>
                </FormItem>
                <FormItem label="密码" prop="pwd" style="width: 400px">
                    <Input v-model="formCustom.pwd"></Input>
                    <div style="color: #a3a3a3; font-size: 12px; height: 22px">字母与数字组合，最少8位，区分大小写</div>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align: center">
                <Button type="primary" style="width: 100px" @click="handleSubmit('formCustom')">提交</Button>
            </div>
        </Modal>
        <!-- 修改密码弹窗 -->
        <Modal v-model="modalPassWord" title="新增账号" @on-ok="ok" @on-cancel="cancel" width="600">
            <Form ref="formPassWord" :model="formPassWord" :rules="ruleCustom" :label-width="80">
                <!-- <FormItem label="姓名" prop="name" style="width: 400px">
                    <Input v-model="formPassWord.name"></Input>
                </FormItem> -->

                <FormItem label="手机" prop="account" style="width: 400px">
                    <Input v-model="formPassWord.account"></Input>
                </FormItem>
                <FormItem label="旧密码" prop="oldPassword" style="width: 400px">
                    <Input v-model="formPassWord.oldPassword"></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPassword" style="width: 400px">
                    <Input v-model="formPassWord.newPassword"></Input>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align: center">
                <Button type="primary" style="width: 100px" @click="changePassWord('formPassWord')">提交</Button>
            </div>
        </Modal>
        <!-- 删除禁用弹窗 -->
        <Modal v-model="modalDel" width="360">
            <p slot="header" style="text-align: left">
                <span>{{ modalTitle }}</span>
            </p>
            <div style="text-align: center">
                <p>{{ modalContent }}</p>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" style="width: 100px" :loading="modal_loading" @click="del">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'myArticle',
    data() {
        const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入姓名'));
            } else {
                // if (this.formCustom.passwdCheck !== '') {
                //     // 对第二个密码框单独验证
                //     this.$refs.formCustom.validateField('passwdCheck');
                // }
                callback();
            }
        };
        const validatePhome = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入手机号'));
            }
            // else if (value !== this.formCustom.passwd) {
            //     callback(new Error('The two input passwords do not match!'));
            // }
            else {
                callback();
            }
        };
        const validatenewPassWord = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'));
            }
            // else if (value !== this.formCustom.passwd) {
            //     callback(new Error('The two input passwords do not match!'));
            // }
            else {
                callback();
            }
        };
        const validatePassWord = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            } else {
                callback();
            }
            // // 模拟异步验证效果
            // setTimeout(() => {
            //     if (!Number.isInteger(value)) {
            //         callback(new Error('Please enter a numeric value'));
            //     } else {
            //         if (value < 18) {
            //             callback(new Error('Must be over 18 years of age'));
            //         } else {
            //             callback();
            //         }
            //     }
            // }, 1000);
        };
        return {
            // 弹窗的数据
            formCustom: {
                name: '',
                pwd: '',
                account: ''
            },
            // 修改密码弹窗的数据
            formPassWord: {
                name: '',
                newPassword: '',
                oldPassword: '',
                account: ''
            },
            ruleCustom: {
                name: [{ validator: validateName, trigger: 'blur' }],
                account: [{ validator: validatePhome, trigger: 'blur' }],
                pwd: [{ validator: validatePassWord, trigger: 'blur' }],
                newPassword: [{ validator: validatenewPassWord, trigger: 'blur' }],
                oldPassword: [{ validator: validatePassWord, trigger: 'blur' }]
            },
            modalImg: false,
            modalDel: false, //删除禁用弹窗
            modalPassWord: false, //修改密码弹窗
            homeImg: '', //首页轮播图
            modal_loading: false,
            modalData: {}, //删除禁用弹窗 - 行数据
            modalTitle: '', //删除禁用弹窗标题
            modalContent: '', //删除禁用弹窗内容文字
            modalType: '',
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
                    value: 1,
                    label: '已启用'
                },
                {
                    value: 0,
                    label: '已禁用'
                }
            ],
            // 表单的数据
            query: {
                name: '',
                account: '',
                name: '',
                pageNum: 1,
                pageSize: 20,
                status: '', //1-待开始 2-进行中 3-已结束
                type: '' //资源类型(1-后援金 2-小程序开屏 3-首页轮播 4-户外大屏)
            },
            table: {
                data: [],
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '账号',
                        key: 'account',
                        align: 'center',
                        minWidth: 100
                    },

                    {
                        title: '状态', //todo 状态的枚举是什么呢
                        key: 'status',
                        align: 'center',

                        minWidth: 150,
                        render: (h, params) => {
                            // 1-启用 2-禁用
                            let { status } = params.row,
                                text;
                            switch (status) {
                                case 1:
                                    text = '启用';
                                    break;
                                case 0:
                                    text = '禁用';
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

                        minWidth: 150
                    },
                    {
                        title: '操作',
                        key: 'name',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            let { status } = params.row;
                            let firstBTn;
                            // 使用
                            if (status === 1) {
                                firstBTn = '禁用';
                            } else if (status === 0) {
                                firstBTn = '启用';
                            }
                            let disableBtn = h(
                                'div',
                                {
                                    style: {
                                        color: 'blue',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.showdelModal(params.row, status == 1 ? 'prohibit' : 'enable');
                                        }
                                    }
                                },
                                firstBTn
                            );

                            let deleteBtn = h(
                                'div',
                                {
                                    style: {
                                        color: 'blue',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.showdelModal(params.row, 'del');
                                        }
                                    }
                                },
                                '删除'
                            );

                            let detail = h(
                                'div',
                                {
                                    style: {
                                        color: 'blue',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.modalPassWord = true;
                                            this.formPassWord = params.row;
                                        }
                                    }
                                },
                                '修改'
                            );

                            return h('div', [disableBtn, deleteBtn, detail]);
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
        showdelModal(data, name) {
            this.modalDel = true;
            if (name == 'prohibit') {
                this.modalTitle = '禁用';
                this.modalContent = '禁用后无法登录，请确认';
            } else if (name == 'del') {
                this.modalTitle = '删除';
                this.modalContent = '删除后无法登录，请确认';
            } else if (name == 'enable') {
                this.modalTitle = '启用';
                this.modalContent = '是否启用？';
            }
            this.modalType = name;
            this.modalData = data;
            // this.modal_loading = true;
            // // if(name =='prohibit'){
            // //     this.prohibit(data)
            // // }else if(name =='del'){
            // //     this.delete(data)
            // // }
        },
        del() {
            this.modal_loading = true;
            if (this.modalType == 'prohibit') {
                this.prohibit(this.modalData);
            } else if (this.modalType == 'del') {
                this.delete(this.modalData);
            }
        },
        // 禁用传0，启用传1
        //todo 禁用传什么值？传0接口成功，但是数据没更新
        prohibit(data) {
            this.axios
                .post(`/user/updateUser?id=${data.id}&status=${data.status === 1 ? 2 : 1}`)
                .then((res) => {
                    this.modal_loading = false;
                    this.modalDel = false;
                    this.$Message.success('禁用成功');
                    this.loadData();
                })
                .catch((err) => {
                    console.log('err', err);
                });
        },
        delete(data) {
            // todo 报系统错误
            this.axios
                .delete(`/user/delUser`, { params: { id: data.id } })
                .then((res) => {
                    this.modal_loading = false;
                    this.modalDel = false;
                    this.$Message.success('删除成功');
                    this.loadData();
                })
                .catch((err) => {
                    this.$Message.error(err);
                    this.modal_loading = false;
                });
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.axios
                        .post(`/user/addUser`, this.formCustom)
                        .then((res) => {
                            this.$Message.success('新增成功');
                            this.modalImg = false;
                            this.loadData();
                            // this.table.data = res.data.data.list;
                            // this.total = res.data.data.total;
                        })
                        .catch((err) => {
                            this.$Message.error(err);
                        });
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        changePassWord(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.axios
                        .post(`/common/modifyPass`, this.formCustom)
                        .then((res) => {
                            this.$Message.success('修改成功');
                            this.modalPassWord = false;
                            this.loadData();
                        })
                        .catch((err) => {
                            console.log('err', err);
                        });
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        // 添加资源
        addResouce() {
            this.modalImg = true;
        },
        // 改变时间
        changeDate(e) {
            console.log(e);
            this.query.beginTime = e[0] + ' 00:00:00';
            this.query.endTime = e[1] + ' 23:59:59';
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
        loadData(search) {
            this.axios
                .post(`/user/selectPage`, this.query)
                .then((res) => {
                    this.table.data = res.data.list;
                    this.total = res.data.total;
                })
                .catch((err) => {
                      this.$Message.error(err);
                });
        },
        // 触发搜索按钮
        handleSearch() {
            // this.$set(this.query, 'pageIndex', 1);
            this.loadData(true);
        }
    }
};
</script>

<style lang="less">
.account-TableList {
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
    .addBtn {
        margin-bottom: 10px;
    }
    .btn-right {
        margin-left: 10px;
    }
    .ivu-form .ivu-form-item-label,
    .ivu-form-item-content {
        display: inline-block;
    }
}
</style>
