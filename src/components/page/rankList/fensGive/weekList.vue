<template>
    <div class="fens-give-tablelist">
        <div class="container">
            <div class="handle-box">
                <Form inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem label="ID" prop="fensId">
                        <Input type="number" v-model="query.fensId" placeholder="ID" clearable></Input>
                    </FormItem>

                    <FormItem>
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </FormItem>
                    <div>
                        周时间段：{{weekTimes}}  明星：{{query.starName}}  排名：{{rankNum}}
                    </div>
                </Form>
            </div>

            <Table border :columns="table.columns" :data="table.data" style="width: 100%"></Table>
            <Page class="page-content" :total="total" show-elevator show-sizer />
        </div>
        <Modal v-model="modalImg" title="查看图片" @on-ok="ok" @on-cancel="cancel" width="1000">
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
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'myArticle',
    data() {
        return {
            rankNum:null,
            weekTimes:'',
            modalImg: false,
            homeImg: '', //首页轮播图
            detailImg: '', //详情页
            hitPopupImg: '', //打榜弹窗图
            time: '',
            TimeList: [
                {
                    value: '2020/12/22',
                    label: '2020/12/29'
                },
                {
                    value: '2020/12/29',
                    label: '2021/01/05'
                }
            ],
            query: {
                endTime: '', //周结束时间

                hitListType: 0, //榜单类型 0：周榜；1：月榜；2：总榜

                listType: 1, //列表类型 默认空， 0：本周；1：近三个月周时间段；2：具体某个月份

                monthNum: '', //具体月份值

                pageNum: 1, //当前页码

                pageSize: 20, //页面数量

                sortType: 0, //排序 0：正序；1：倒序；

                starId: null, //明星ID

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
                        title: '粉丝名称',
                        key: 'fensName',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: 'ID',
                        key: 'fensId',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '贡献值',
                        key: 'totalVigourVal',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '贡献排名',
                        key: 'rank',
                        align: 'center',
                        sortable: true,
                        minWidth: 150,
                      
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
       
        this.query.starId = this.$route.query.data.starId
        this.weekTimes = this.$route.query.data.weekTime
        this.query.starName = this.$route.query.data.starName
        this.rankNum = this.$route.query.data.rank
        let timeArr = this.$route.query.data.weekTime.split('~')
        this.query.startTime = timeArr[0]
        this.query.endTime = timeArr[1]

        console.log(this.query.starId)
         this.loadData();
    },
    methods: {
        ok() {},
        cancel() {},
        //去详情-粉丝贡献
        goDetail(name) {
            this.$router.push({
                name: `${name}Detail`
            });
        },

        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        loadData(search) {
            this.axios
                .post(`/star/fensMark/rankList`, this.query)
                .then((res) => {
                    this.table.data = res.data.list;
                    this.total = res.data.total;
                })
                .catch((err) => {
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
