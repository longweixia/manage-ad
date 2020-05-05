<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 基础表格 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-select @change="getTypes(types)" v-model="types" placeholder="地址" class="handle-select mr10">
                    <el-option v-for="(item, index) in typesList" :key="index" :label="item.text" :value="item.name"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="80" align="center"> </el-table-column>
                <el-table-column prop="autor" label="用户名" width="100"></el-table-column>
                <!-- <el-table-column label="账户余额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column> -->
                <!-- <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column> -->
                <el-table-column prop="times" label="时间"></el-table-column>
                <!-- <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column> -->

                <el-table-column prop="title" label="标题"></el-table-column>
                <!-- <el-table-column prop="" label="封面">
                    <template slot-scope="scope">
                        <img style="width:100%;height:100%" :src="scope.row.coverImage" alt="" />
                    </template>
                </el-table-column> -->
                 <el-table-column label="封面(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.coverImage"
                            :preview-src-list="[scope.row.coverImage]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="Pageview" label="浏览人数"></el-table-column>
                <el-table-column prop="level" label="优先级"></el-table-column>
                <!-- <el-table-column prop="content" label="优先级"></el-table-column> -->
                <!-- <el-table-column prop="content" label="内容"></el-table-column> -->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                        <el-button type="text" icon="el-icon-edit" @click="articleEdit(scope.$index, scope.row)">修改文章</el-button>
                    </template>
                </el-table-column>
                3535
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.autor"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-input v-model="form.times"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="浏览人数">
                    <el-input v-model="form.Pageview"></el-input>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-input v-model="form.level"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'myArticle',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
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
                    name: 'all',
                    type: 'ios-navigate',
                    text: '首页导航'
                },
                {
                    name: 'tb',
                    type: 'ios-keypad',
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
        this.getData('all');
    },
    methods: {
        getTypes(name) {
            this.getData(name);
        },
        // 获取 easy-mock 的模拟数据
        getData(flag) {
            console.log(this.baseUrl,99999099)
            this.axios
                .get(`${this.baseUrl}/articles/get`, {
                    params: {
                        // pageSize: this.pageSize,
                        // currentPage:this.currentPage,
                        userName: 'longwei',
                        flag: flag
                    }
                })
                .then(res => {
                    this.tableData = res.data.resulet;
                    this.pageTotal = res.pageTotal || 50;
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
            this.getData();
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
            this.getData();
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
