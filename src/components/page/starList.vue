<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 基础表格 </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <Button type="primary" @click="getToken">获取token</Button>
        <div class="container">
            <div class="handle-box">
                <Form :label-width="50" inline :model="query" class="demo-form-inline" ref="ruleForm">
                    <FormItem  label="姓名" prop="name">
                        <Input  v-model="query.name" placeholder="姓名" clearable></Input >
                    </FormItem >
                    <FormItem  label="id" prop="id">
                        <Input type="number"  v-model="query.id" placeholder="ID" clearable></Input >
                    </FormItem >

                    <FormItem >
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </FormItem >
                </Form>
            </div>
            
           <Table border :columns="table.columns" :data="table.data"></Table>
        </div>

    </div>
</template>

<script>
import {getConfigsByProductId,addNewAndroidPlugin}  from '../../api/index.js';
export default {
    name: 'myArticle',
    data() {
        return {
            query: {
                id: "",
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            table:{
                data:[],
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        sortable: true,
                        align:'center',
                        width:80
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align:'center',
                         width:80
                    },
                    {
                        title: '相片',
                        key: 'avatar',
                        sortable: true,
                        align:'center',
                         width:100
                    },
                    {
                        title: '周/月冠军次数',
                        key: 'address',
                        align:'center',
                         width:150
                    },
                     {
                        title: '周/月亚军次数',
                        key: 'name',
                        align:'center',
                         width:150
                    },
                     {
                        title: '周/月季军次数',
                        key: 'name',
                        align:'center',
                         width:150
                    },
                     {
                        title: '当前周排名',
                        key: 'thisWeekRank',
                        align:'center',
                         width:150
                    },
                     {
                        title: '当前月排名',
                        key: 'thisMonthRank',
                        align:'center',
                         width:150
                    },
                     {
                        title: '标签',
                        key: 'tags',
                        align:'center',
                         width:100
                    },
                     {
                        title: '添加时间',
                        key: 'createTime',
                        align:'center',
                         width:100
                    },
                     {
                        title: '操作',
                        key: 'name',
                        align:'center',
                         width:100
                    },
                ],

            },
            tableData: [
                {
                    coverImage: ''
                }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            types: 'all', //选择的大类
            typesList: [
                //大类下拉数据
                {
                    name: 'tb',
                    type: 'ios-analytics',
                    text: '淘宝赚'
                },
                {
                    name: 'wx',
                    type: 'ios-analytics',
                    text: '微信赚'
                },
                {
                    name: 'az',
                    type: 'ios-paper',
                    text: '安卓赚'
                },
                {
                    name: 'ios',
                    type: 'ios-paper',
                    text: '苹果(ios)赚'
                },
                {
                    name: 'xb',
                    type: 'ios-paper',
                    text: '线报赚'
                },
                {
                    name: 'gj',
                    type: 'ios-paper',
                    text: '高级赚'
                },
                {
                    name: 'cg',
                    type: 'ios-paper',
                    text: '草根汇'
                }
            ]
        };
    },
    created() {
        // this.loadData();
        // console.log(fetchData)
       
    },
 mounted() {
    this.loadData()
  },
    methods: {
        // 获取token
        getToken() {
             this.axios.post(`/common/testLogin?id=1`).then(res => {
                    let token = res.data.data.token;
                    localStorage.setItem('Authorization', token);
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        loadData(search) {
            this.axios
                .post(`/star/star/list`, {
                    id: search?this.query.id:'',
                    name: search?this.query.name:'',
                    pageNum: 1,
                    pageSize: 20
                })
                .then(res => {
                    this.table.data = res.data.data.list;
                   
                    // this.pageTotal = res.pageTotal || 50;
                })
                .catch(err => {
                    console.log('err', err);
                });

            // fetchData(this.query).then(res => {
            //     console.log(res);
            //     this.tableData = res.list;
            //     this.pageTotal = res.pageTotal || 50;
            // });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.loadData(true);
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.axios
                        .post(`${this.baseUrl}/articles/delete`, {
                            data: {
                                userName: 'longwei',
                                id: row.id,
                                types: row.types
                            }
                        })
                        .then(res => {
                            if (res.data.status == '0') {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch(err => {
                            this.$message.error('发布失败' + err);
                        });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            console.log(index, row);
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 修改文章
        articleEdit(index, row) {
            // console.log(row.content);
            this.$router.push({
                name: 'Markdown',
                params: {
                    articleContent: row
                }
            });
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.loadData();
        }
    }
};
</script>

<style scoped>
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
</style>
