<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <Form :label-width="100" inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="姓名" prop="starName">
                        <Input v-model="query.starName" placeholder="姓名" clearable></Input>
                    </FormItem>
                    <FormItem label="账号" prop="type">
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
                        <Button type="primary" @click="handleSearch">搜索</Button>
                        <Button @click="resetForm('ruleForm')">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="addBtn">
                <Button type="primary" @click="addResouce">新增账号</Button>
            </div>

            <Table border :columns="table.columns" :data="table.data" style="width: 100%"></Table>
            <Page class="page-content" :total="total" show-elevator show-sizer />
        </div>
        <Modal v-model="modalImg" title="新增账号" @on-ok="ok" @on-cancel="cancel" width="600">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <FormItem label="姓名" prop="name" style="width:400px">
                    <Input v-model="formCustom.name"></Input>
                </FormItem>

                <FormItem label="手机" prop="account" style="width:400px">
                    <Input v-model="formCustom.account"></Input>
                </FormItem>
                <FormItem label="密码" prop="pwd" style="width:400px">
                    <Input v-model="formCustom.pwd"></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
                </FormItem>
            </Form>
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
            formCustom: {
                name: '',
                pwd: '',
                account: ''
            },
            ruleCustom: {
                name: [{ validator: validateName, trigger: 'blur' }],
                account: [{ validator: validatePhome, trigger: 'blur' }],
                pwd: [{ validator: validatePassWord, trigger: 'blur' }]
            },
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
                    label: '已启用'
                },
                {
                    value: 1,
                    label: '已禁用'
                }
            ],
            query: {
                beginTime: '', //开始时间
                endTime: '', //结束时间
                pageNum: 1,
                pageSize: 20,
                status: '', //1-待开始 2-进行中 3-已结束
                type: '' //资源类型(1-后援金 2-小程序开屏 3-首页轮播 4-户外大屏)
            },
            table: {
                data: [
                ],
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
                        title: '状态',  //todo 状态的枚举是什么呢
                        key: 'status',
                        align: 'center',
                        sortable: true,
                        minWidth: 150,
                        render: (h, params) => {
                            // 1-启用 2-禁用
                            let { status } = params.row,
                                text;
                            switch (status) {
                                case 1:
                                    text = '启用';
                                    break;
                                case 2:
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
                        sortable: true,
                        minWidth: 150
                    },

                    {
                        title: '操作',
                        key: 'name',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            let disableBtn = h(
                                'div',
                                {
                                    style: {
                                        color: 'blue',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.goDetail();
                                        }
                                    }
                                },
                                '禁用'
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
                                            this.goDetail();
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
                                            this.goDetail();
                                        }
                                    }
                                },
                                '详情'
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
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.axios
                        .post(`/user/addUser`, this.formCustom)
                        .then(res => {
                            this.$Message.success("新增成功")
                            this.modalImg = false
                            this.loadData()
                            // this.table.data = res.data.data.list;
                            // this.total = res.data.data.total;
                        })
                        .catch(err => {
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
                .then(res => {
                    this.table.data = res.data.data.list;
                    this.total = res.data.data.total;
                })
                .catch(err => {
                    console.log('err', err);
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

<style lang="less" scoped>
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
</style>
