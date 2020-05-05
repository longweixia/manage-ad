<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 应用管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in typesList" :key="index" :label="item.text" :name="item.name">
                    <el-tabs v-model="activeName1" @tab-click="handleClick1">
                        <el-tab-pane v-for="(item1, index1) in item.types2" :key="index1" :label="item1.text" :name="item1.name">
                            <!-- <div v-if="showTips" class="ad-tips content-left">
                                该分类下暂无数据，您可以查看其它分类
                            </div> -->

                            <!-- <div v-if="showTips" class="ad-tips content-left">
                                该分类下暂无数据，您可以查看其它分类
                            </div> -->
                            <div class="container">
                                <el-table
                                    :data="appArry"
                                    border
                                    class="table"
                                    ref="multipleTable"
                                    header-cell-class-name="table-header"
                                    @selection-change="handleSelectionChange"
                                >
                                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                                    <el-table-column prop="name" label="名称"></el-table-column>
                                    <el-table-column prop="id" label="id" width="80" align="center"> </el-table-column>

                                    <el-table-column prop="autor" label="用户名" width="100"></el-table-column>

                                    <el-table-column prop="times" label="时间"></el-table-column>

                                    <el-table-column label="封面(查看大图)" align="center">
                                        <template slot-scope="scope">
                                            <el-image
                                                class="table-td-thumb"
                                                :src="scope.row.coverImage"
                                                :preview-src-list="[scope.row.coverImage]"
                                            ></el-image>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="downLoadNum" label="下载次数"></el-table-column>
                                    <el-table-column prop="rate" label="评分"></el-table-column>
                                    <el-table-column prop="top" label="置顶"></el-table-column>
                                    <el-table-column prop="tag" label="标签"></el-table-column>
                                    <el-table-column prop="system" label="支持系统"></el-table-column>
                                    <!-- <el-table-column prop="content" label="优先级"></el-table-column> -->
                                    <!-- <el-table-column prop="content" label="内容"></el-table-column> -->
                                    <el-table-column label="操作" width="180" align="center">
                                        <template slot-scope="scope">
                                            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"
                                                >编辑</el-button
                                            >

                                            <el-button
                                                type="text"
                                                icon="el-icon-delete"
                                                class="red"
                                                @click="handleDelete(scope.$index, scope.row)"
                                                >删除</el-button
                                            >
                                            <el-button type="text" icon="el-icon-edit" @click="articleEdit(scope.$index, scope.row)"
                                                >修改文章</el-button
                                            >
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
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.autor"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-input v-model="form.times"></el-input>
                </el-form-item>
                <el-form-item label="下载次数">
                    <el-input v-model="form.downLoadNum"></el-input>
                </el-form-item>
                <el-form-item label="评分">
                    <el-input v-model="form.rate"></el-input>
                </el-form-item>
                <el-form-item label="置顶">
                    <el-input v-model="form.top"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="form.tag"></el-input>
                </el-form-item>
                <el-form-item label="系统">
                    <el-input v-model="form.system"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload
                        :action="uploadImg"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="Resimg"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
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
    name: 'appList',
    data() {
        return {
            coverImage0: '',//上传图片的url
            coverImage: '',
            dialogVisible: false,
            showTips: false, //是否显示没有内容的提示
            appArry: [
                // {
                //     _id: '5eaee504af0809099425c3b8',
                //     coverImage: 'http://47.103.40.123:3001/images/coverImg/timg (1).jpg',
                //     name: '左左街huofan',
                //     rate: 3,
                //     top: 0,
                //     content: '4567800976432',
                //     tag: '热门',
                //     autor: '手赚,联盟N01',
                //     times: '2020-05-03T10:29:05.480Z',
                //     system: '安卓pingg',
                //     downLoadNum: 278,
                //     idIndex: 1,
                //     id: 'huofan1'
                // }
            ],
            activeName: 'second',
            activeName1: 'second',
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
                    name: 'tb',
                    type: 'ios-keypad',
                    text: '淘宝赚',
                    types2: [
                        { name: 'huofan', type: 'ios-keypad', text: '货返' },
                        { name: 'lifan', type: 'ios-keypad', text: '立返' },
                        { name: 'hongbao', type: 'ios-keypad', text: '可用红包' },
                        { name: 'other', type: 'ios-keypad', text: '其它' }
                    ]
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
            ],
            types1: '', //当前点击的小类tab
            types2: '', //当前点击的大类tab
            uploadImg: 'http://47.103.40.123:3001/malls/uploadImg'
        };
    },
    mounted() {
        this.getAppList('tb', 'huofan');
    },
    methods: {
        // 上传封面图成功的回调
        Resimg(response, file, fileList) {
            this.coverImage0 = response.result.url;
        },
        // 删除封面图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //   放大封面图
        handlePictureCardPreview(file) {
            this.coverImage = file.url;
            this.dialogVisible = true;
        },
        gotoContent() {},
        handleClick(tab, event) {
            // console.log(tab, 222);
            this.types1 = tab.name;
        },
        handleClick1(tab, event) {
            // console.log(tab.name,  11);
            this.types2 = tab.name;
            this.getAppList(this.types1, this.types2);
        },
        getTypes(name) {
            // this.getData(name);
        },
        getAppList(types1, types2) {
            this.axios
                .get(`${this.baseUrl}/appLists/getApp`, {
                    //接全部改成模板字符创
                    params: {
                        // pageSize: this.pageSize,
                        // currentPage:this.currentPage,
                        types1: types1,
                        types2: types2
                    }
                })
                .then(res => {
                    //一开始要查所有数据的长度，用来传给文章底部的上一篇下一篇时，判断当前文章是不是最后一篇
                    res.data.resulet.length > 0 ? (this.showApp = false) : (this.showApp = true);
                    this.appArry = res.data.resulet;
                    // console.log(this.appArry, "打印文章数据");
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.axios
                        .post(`${this.baseUrl}/appLists/deleteApp`, {
                            data: {
                                id: row.id,
                                types1: this.types1,
                                types2: this.types2
                            }
                        })
                        .then(res => {
                            if (res.data.status == '0') {
                                this.$message.success('删除成功');
                                this.appArry.splice(index, 1);
                            }
                        })
                        .catch(err => {
                            this.$message.error('删除失败' + err);
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
            this.form.coverImage = this.coverImage0
            this.axios
                .post(`${this.baseUrl}/appLists/postApp`, {
                    data: this.form
                })
                .then(res => {
                    if (res.data.status == '0') {
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    } else {
                        this.$message.error('修改失败' + res.data.msg);
                    }
                })
                .catch(err => {
                    this.$message.error('修改失败' + err);
                });
        },
        // // 分页导航
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
.ad-content-left {
    float: left;
    width: 100%;
    min-height: 1px;
    padding-right: 10px;
    padding-left: 10px;

    width: 820px;
}

.content-box {
    margin-right: 0;
    margin-bottom: 20px;
    margin-left: 0;
    padding: 30px;
    min-height: 155px;
    background-color: #fff;
}
</style>
