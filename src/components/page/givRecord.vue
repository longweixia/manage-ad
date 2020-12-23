<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <Form :label-width="100" inline :model="query" class="demo-form-inline" ref="ruleForm">
           
                    
                    <FormItem  label="赠送时间" prop="id">
                         <DatePicker type="daterange" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem >

                    <FormItem  label="id" prop="id">
                        <Input type="number"  v-model="query.id" placeholder="ID" clearable></Input >
                    </FormItem >

                    <FormItem >
                        <Button type="primary" @click="handleSearch">搜索</Button>
                        <Button @click="resetForm('ruleForm')">重置</Button>
                    </FormItem >
                    <div >
                        <Button type="primary" @click="handleSearch">批量赠送</Button>
                        
                    </div>
                </Form>
            </div>
            
           <Table border :columns="table.columns" :data="table.data"></Table>
       <Page class="page-content" :total="total"  show-elevator show-sizer />
        </div>
        <!-- 赠送活力值 -->
         <Modal
        v-model="modalOne"
        title="赠送活力值"
        @on-ok="ok"
        @on-cancel="cancel" width="600">
        <div class="card-content">
                 <div class="card">
                     <div class="text">粉丝：XXXXX，ID：XXXXX</div>
                    <Input />
                     <!-- <img :src="homeImg"/> -->
                </div>
               
             
          
        </div>
         <div slot="footer" style="text-align:center">
             <Button type="primary" @click='submitOne'>提交</Button>
             </div>
    </Modal>
     

    </div>
</template>

<script>
import {getConfigsByProductId,addNewAndroidPlugin}  from '../../api/index.js';
export default {
    name: 'myArticle',
    data() {
        return {
            modalOne: false,
             homeImg:"", //首页轮播图
             detailImg:"", //详情页
             hitPopupImg:"",  //打榜弹窗图
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
                        minWidth:80
                    },
                    {
                        title: '昵称',
                        key: 'name',
                        align:'center',
                         minWidth:80
                    },

                     {
                        title: '赠送数量',
                        key: 'name',
                        align:'center',
                        sortable: true,
                         minWidth:150,
                         
                    },
                     {
                        title: '赠送时间',
                        key: 'name',
                        align:'center',
                        sortable: true,
                         minWidth:150,
                         
                    },
                  
                     {
                        title: '操作人',
                        key: 'thisWeekRank',
                        align:'center',
                         minWidth:150
                    },
                     
                    
                ],

            },
            tableData: [
                {
                    coverImage: ''
                }
            ],
            total:0,
   
        };
    },
    created() {
       
    },
    mounted() {
        this.loadData()
    },
    methods: {
        ok(){

        },
        cancel(){

        },
        //去详情
    goDetail(){
        this.$router.push({
            name:"starDetail"
        })
    },
        // 单个提交
        submitOne(){
            this.modalOne = false
        },

 
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
        },
 
    
    }
};
</script>

<style lang="less" scoped>
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
.card-content{
    display: flex;
    justify-content: center;
    align-items: center;
    .card{
        width:300px;
        margin-right: 20px;
        .text{
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        img{
            width: 100%;
            height: 100%;
            padding: 5px;
            background: #ddd;
        }
    }
}
.page-content{
    text-align: right;
    margin-top: 40px;
}
</style>
