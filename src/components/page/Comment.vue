<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 评论管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="">
                                <!-- {{props.row.list[0].context}} -->
                                <ul class="comment-list">
                                    <li class="comment-row" v-for="(item, index) in props.row.list" :key="index">
                                        <div v-if="index == 0" class="comment-num">
                                            总评论数：
                                            <span>{{ props.row.list.length }}</span>
                                        </div>
                                        <div class="comment-numAll">
                                            第{{ index + 1 }}条
                                            <el-button class="comment-edit" type="primary" @click="commentEdit(item)" icon="el-icon-edit"
                                                >确认修改</el-button
                                            >
                                        </div>
                                        <div class="comment-item">
                                            <span class="comment-label">显示：</span>
                                            <el-select style="width:100px" v-model="item.show" placeholder="请选择">
                                                <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
                                                    <span style="float: left">{{ item.label }}</span>
                                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                                </el-option>
                                            </el-select>
                                            <span class="comment-label">显示：</span>
                                            <el-select style="width:100px" v-model="item.tops" placeholder="请选择">
                                                <el-option v-for="item in tops" :key="item.value" :label="item.label" :value="item.value">
                                                    <span style="float: left">{{ item.label }}</span>
                                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="comment-item">
                                            <span class="comment-label">用户：</span>
                                            <span>{{ item.autor }}</span>
                                        </div>
                                        <div class="comment-item">
                                            <span class="comment-label">时间：</span>
                                            <span>{{ item.times }}</span>
                                        </div>
                                        <div>
                                            <span class="comment-label">评论内容：</span>
                                            <span>{{ item.context }}</span>
                                        </div>
                                        <!-- 回复 -->
                                        <div>
                                            <div class="comment-label relay-label" @mouseenter="articleId = item._id">回复：</div>
                                            <ul class="comment-list relay" v-if="articleId == item._id">
                                                <li class="comment-row" v-for="(item1, index1) in item.Reply" :key="index1">
                                                    <div class="comment-numRelay">第{{ index1 + 1 }}条</div>
                                                    <div class="comment-item">
                                                        <span class="comment-label">显示：</span>
                                                        <el-select style="width:100px" v-model="item1.show" placeholder="请选择">
                                                            <el-option
                                                                v-for="item in cities"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value"
                                                            >
                                                                <span style="float: left">{{ item.label }}</span>
                                                                <span style="float: right; color: #8492a6; font-size: 13px">{{
                                                                    item.value
                                                                }}</span>
                                                            </el-option>
                                                        </el-select>
                                                    </div>
                                                    <div class="comment-item">
                                                        <span class="comment-label">用户：</span>
                                                        <span>{{ item1.autor }}</span>
                                                    </div>
                                                    <div>
                                                        <span class="comment-label">评论内容：</span>
                                                        <span>{{ item1.context }}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column label="文章标题" prop="title"> </el-table-column>
                <el-table-column label="文章ID" prop="ids"> </el-table-column>
                <!-- <el-table-column label="评论数" prop="comments"> </el-table-column> -->
                <!-- <el-table-column label="types" prop="types"> </el-table-column> -->
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
    name: 'comment',
    data() {
        return {
            cities: [
                {
                    value: 0,
                    label: '隐藏'
                },
                {
                    value: 1,
                    label: '显示'
                }
            ],
            tops: [
                {
                    value: 0,
                    label: '不置顶'
                },
                {
                    value: 1,
                    label: '置顶'
                }
            ],
            articleId: -1,
            tableData: [],
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
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
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        commentEdit(item) {
            console.log(item, 11112222);
            this.axios
                .post(`${this.baseUrl}/comments/commentEdit`, {
                    data: {
                        list: item
                    }
                })
                .then(res => {
                    if (res.data.status == '0') {
                        this.$message.success('修改成功');
                        this.getData();
                        // this.tableData.splice(index, 1);
                    }
                })
                .catch(err => {
                    this.$message.error('修改失败' + err);
                });
        },
        // 鼠标悬浮头像
        enter(articleId) {
            console.log(1111111);
            this.articleId = articleId;
        },
        //鼠标离开头像
        leave(articleId) {
            this.articleId = -1;
        },
        // 过滤
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        getTypes(name) {
            this.getData(name);
        },
        // 获取 数据
        getData(flag) {
            this.axios
                .get(`${this.baseUrl}/comments/getComment`, {
                    params: {
                        ids: 'all'
                    }
                })
                .then(res => {
                    this.tableData = res.data.resulet;
                    this.tableData.comments = res.data.resulet.comment.length;
                    this.pageTotal = res.pageTotal || 50;
                })
                .catch(err => {
                    console.log('err', err);
                });
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
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.comment-list {
}
.comment-numAll {
    font-weight: bold;
    font-size: 16px;
    margin-left: -20px;
    color: #409eff;
}
.comment-numRelay {
    font-weight: bold;
    font-size: 16px;
    margin-left: -20px;
    color: red;
}
.comment-num {
    font-weight: bold;
    font-size: 16px;
    margin-left: -20px;
    color: #666;
}
.comment-row {
    border-bottom: 2px solid #ddd;
    list-style: none;
}
.comment-label {
    padding-right: 10px;
    color: #666;
    font-weight: bold;
}
.comment-item {
    padding-right: 10px;
    display: inline-block;
}
.relay {
    margin-left: 60px;
}
.relay-label {
    color: #ff0000;
}
.comment-edit {
    float: right;
}
</style>
