<template>
    <div>     
        <div class="container">
            <div class="handle-box">
                <Form :label-width="60" inline :model="query" class="demo-form-inline" ref="ruleForm">
                     <FormItem  label="周列表" prop="time">
                       <Select v-model="query.time" style="width:150px" clearable>
                            <Option v-for="item in TimeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem >
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
       <Page class="page-content" :total="total"  show-elevator show-sizer />
        </div>
         <Modal
        v-model="modalImg"
        title="查看图片"
        @on-ok="ok"
        @on-cancel="cancel" width="1000">
        <div class="card-content">
                 <div class="card">
                     <div class="text">首页轮播图预览</div>
                     <img :src="homeImg"/>
                </div>
                 <div class="card">
                     <div class="text">明星详细页预览</div>
                     <img :src="detailImg"/>
                </div>
                 <div class="card">
                     <div class="text">打榜弹窗预览</div>
                     <img :src="hitPopupImg"/>
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
            modalImg: false,
             homeImg:"", //首页轮播图
             detailImg:"", //详情页
             hitPopupImg:"",  //打榜弹窗图
             time:"",
             TimeList: [
                    {
                        value: '2020/12/22',
                        label: '2020/12/29'
                    },
                    {
                        value: '2020/12/29',
                        label: '2021/01/05'
                    },
             ],
            query: {
                id: "",
                name: '',
                pageIndex: 1,
                pageSize: 10,
                time:""
            },
            table:{
                data:[],
                columns: [
                    {
                        title: '周时间段',
                        key: 'id',
                        align:'center',
                        width:100
                    },
                    {
                        title: '明星',
                        key: 'name',
                        align:'center',
                         width:100
                    },
                    {
                        title: '明星ID',
                        key: 'avatar',
                        sortable: true,
                        align:'center',
                         width:100,
                         render:(h,params)=>{
                            //  homeImg 首页轮播图
                            //  detailImg 详情页
                            //  hitPopupImg  打榜弹窗图
                             let {homeImg,detailImg, hitPopupImg } = params.row,text;
                            //  avatar?text = '查看':text = '无'

                             let clickBtn = h('div',{
                                 style:{
                                     color:"blue",
                                     cursor:'pointer'
                                 },
                                 on:{
                                     'click':()=>{
                                         this.modalImg = true
                                         this.homeImg = homeImg
                                         this.detailImg = detailImg
                                         this.hitPopupImg = hitPopupImg
                                     }
                                     
                                 }
                             },'查看')
                             return h("div",[clickBtn])
                         }
                    },
                    {
                        title: '排名',
                        key: 'address',
                        align:'center',
                          sortable: true,
                         width:150,
                         render:(h,params)=>{
                             let {rankWeekChampionNum,rankMonthChampionNum} = params.row
                             let week = h('div',rankWeekChampionNum+"/")
                             let month = h('div',rankMonthChampionNum)
                             return h("div",[week,month])
                         }
                    },
                     
                     {
                        title: '操作',
                        key: 'name',
                        align:'center',
                         width:100,
                          render:(h,params)=>{
                             let clickBtn = h('div',{
                                 style:{
                                     color:"blue",
                                     cursor:'pointer'
                                 },
                                 on:{
                                     'click':()=>{
                                        this.goDetail()
                                     }
                                     
                                 }
                             },'详情')
                             return h("div",[clickBtn])
                         }
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
    min-height:350px;
    .card{
        width:300px;
        height: 300px;
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
