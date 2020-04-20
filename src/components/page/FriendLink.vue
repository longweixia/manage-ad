<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 友情链接 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h3>添加友情链接</h3>
            <div class="ad-title ad-title-top">
                名称：<el-input style="width:200px;" placeholder="轮播图名称" v-model="linkList.name" clearable> </el-input>
            </div>
            <div class="ad-title">
                跳转url：<el-input style="width:200px;" placeholder="跳转的url" v-model="linkList.url" clearable> </el-input>
            </div>
            <!-- 列表区 -->
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="addLink">提交</el-button>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="150" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="150" align="center"></el-table-column>
                <el-table-column prop="show" width="150" label="是否显示"></el-table-column>
                <el-table-column prop="name" width="150" label="名称"></el-table-column>

                <el-table-column prop="url" width="150" label="跳转的url"></el-table-column>

                <!-- <el-table-column prop="content" label="优先级"></el-table-column> -->
                <!-- <el-table-column prop="content" label="内容"></el-table-column> -->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <!-- <el-form-item label="id">
                    <el-input v-model="form.id"></el-input>
                </el-form-item> -->
    
                <el-form-item label="是否显示">
                    <el-input v-model="form.show"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>


                <el-form-item label="跳转的url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit(form.id, form)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'friendLink',
    data() {
        return {
            uploadImg: `${this.baseUrl}/malls/uploadImg`,
            linkList: {
                url: '', //图片url
                name: '', //图片名
                show: 1 //是否展示
            }, //文
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
      
            form: {},
            idx: -1,
            id: -1,
            types: 'all', //选择的大类
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 添加
        addLink() {
            this.axios
                .post(`${this.baseUrl}/friendLinks/add`, {
                    data: this.linkList
                })
                .then(res => {
                    if (res.data.status == '0') {
                        this.$message.success('发布成功');
                    } else {
                        this.$message.error('发布失败' + res.data.msg);
                    }
                })
                .catch(err => {
                    this.$message.error('发布失败' + err);
                });
        },
        // 上传轮播图成功的回调
        Resimg(response, file, fileList) {
            this.form.url = response.result.url;
            console.log(this.linkList.url, '111111');
        },
        // 上传轮播图成功的回调
        addimg(response, file, fileList) {
            this.linkList.url = response.result.url;
            console.log(this.linkList.url, '111111');
        },
        // 删除轮播图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //   放大轮播图
        handlePictureCardPreview(file) {
            this.coverImage = file.url;
            this.dialogVisible = true;
        },

        // 获取数据
        getData() {
            this.axios
                .get(`${this.baseUrl}/friendLinks/get`
                )
                .then(res => {
                    this.tableData = res.data.resulet;
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
                        .post(`${this.baseUrl}/friendLinks/delete`, {
                 
                                id: row.id
                         
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
                    linkList: row
                }
            });
        },
        // 保存编辑
        saveEdit(id, list) {
            this.axios
                .post(`${this.baseUrl}/friendLinks/edit`, {
                    data: { id: id, list: list }
                })
                .then(res => {
                    if (res.data.status == '0') {
                        this.editVisible = false;
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
.ad-title {
    margin: 10px;
    display: inline-block;
}
.ad-level {
    display: inline-block;
}
.ad-type {
    margin-left: 115px;
}
.ad-type-text {
    display: inline-block;
    width: 50px;
}
.ad-cover-img {
    display: inline-block;
    position: relative;
}
.img-cover {
    position: absolute;
}
.edit-img .el-upload--picture-card {
    width: 50px;
    height: 50px;
}
</style>
