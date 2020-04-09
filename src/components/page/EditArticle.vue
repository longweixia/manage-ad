<template>
    <div>
        <div class="crumbs">
            <div v-html="articleContent"></div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'editArticle',
    data() {
        return {
            articleContent:"",
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
             
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
         console.log(this.$route,99999)
        this.articleContent = this.$route.params.articleContent
    },
    methods: {
        // // 获取 easy-mock 的模拟数据
        // getData() {
           
        //    this.axios
        // .get("http://localhost:3001/articles/get", { 
        //   params:{
        //   // pageSize: this.pageSize,
        //   // currentPage:this.currentPage,
        //   userName: "longwei"
        //   }
        //   })
        // .then(res => {
        //   console.log(res.data.resulet)
        //   this.tableData = res.data.resulet.article.baidu
        //        this.pageTotal = res.pageTotal || 50;
     
        // })
        // .catch(err => {
        //   console.log("err", err);
        // });
    
        //     // fetchData(this.query).then(res => {
        //     //     console.log(res);
        //     //     this.tableData = res.list;
        //     //     this.pageTotal = res.pageTotal || 50;
        //     // });
        // },
        // // 触发搜索按钮
        // handleSearch() {
        //     this.$set(this.query, 'pageIndex', 1);
        //     this.getData();
        // },
        // // 删除操作
        // handleDelete(index, row) {
        //     // 二次确认删除
        //     this.$confirm('确定要删除吗？', '提示', {
        //         type: 'warning'
        //     })
        //         .then(() => {
        //             this.$message.success('删除成功');
        //             this.tableData.splice(index, 1);
        //         })
        //         .catch(() => {});
        // },
        // // 多选操作
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        // },
        // delAllSelection() {
        //     const length = this.multipleSelection.length;
        //     let str = '';
        //     this.delList = this.delList.concat(this.multipleSelection);
        //     for (let i = 0; i < length; i++) {
        //         str += this.multipleSelection[i].name + ' ';
        //     }
        //     this.$message.error(`删除了${str}`);
        //     this.multipleSelection = [];
        // },
        // // 编辑操作
        // handleEdit(index, row) {
        //     console.log(index, row);
        //     this.idx = index;
        //     this.form = row;
        //     this.editVisible = true;
        // },
        // // 保存编辑
        // saveEdit() {
        //     this.editVisible = false;
        //     this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        //     this.$set(this.tableData, this.idx, this.form);
        // },
        // // 分页导航
        // handlePageChange(val) {
        //     this.$set(this.query, 'pageIndex', val);
        //     this.getData();
        // }
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
