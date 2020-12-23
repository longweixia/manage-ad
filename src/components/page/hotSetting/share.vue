<template>
    <div>
  
        <div class="container">
            <div class="card-area">
                <div class="row-text">分享微信获得热力值</div>
                <div class="row-text">需对方点击分享内容进入小程序才算完成</div>
                 
                 <div>
                     每日最高
                     <Input v-model="limitVal" placeholder="数值" style="width:200px" clearable></Input>次
                 </div>
                
                 <div>
                     每次获得
                     <Input v-model="limitVal" placeholder="数值" style="width:200px" clearable></Input>热力值
                 </div>
                
            </div>
         
            <div>
                <Button type="primary">保存</Button>
            </div>
            
          
       
             
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            selectHotVal:"",//选择的热力下拉框的值
              selectHotList: [
                {
                    value: '2020/12/22',
                    label: '2020/12/29'
                },
                {
                    value: '2020/12/29',
                    label: '2021/01/05'
                }
            ],
            numList:[
                {name:"",value:""},
                {name:"",value:""},
            ],
            limitVal:"",//每日限制次数
            form: {
                name: '', //姓名
            },
            imgObj:{
                homeImg:"", //首页轮播图
                detailImg:"", //详情页
                hitPopupImg:"",  //打榜弹窗图
            },//轮播图等
            imgHeader:"",//头像url
            tagList:[
                {name:'标签2'},
                {name:'标签3'},
                {name:'标签4'},
            ],//标签集合
        };
    },
    methods: {
        // 上传图片
        uploadImg() {},
        //新增标签
        addTag() {},
        //关闭标签
        handleClose(event, name) {
            
                const index = this.tagList.indexOf(name);
                this.tagList.splice(index, 1);
            
        },
        loadData(search) {
            this.axios
                .post(`/star/star/list`, {
                    id: search ? this.query.id : '',
                    name: search ? this.query.name : '',
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
        }
    }
};
</script>
<style lang="less" scoped>
.container {
    .card-area {
        margin-bottom: 20px;    
        .row-text {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: bold;
        }
        .card-content {
            display: flex;
            justify-content: left;
            align-items: center;
            min-height: 350px;
            .card {
                width: 200px;
                height: 200px;
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
        .card-header{
            width:100px;
            height: 100px;
           border-radius: 50px;
           margin-top: 10px;
            img{
                width:100%;
                height: 100%;
                border-radius: 50px;
            }
        }
        .tag-text{
            display: inline-block;
            margin-bottom:5px;
            
        }
        .addTag-text{
            color: blue;
            cursor: pointer;
            margin-left: 20px;
        }
        // 标签
        .tag-area{
            .tag{
                cursor: pointer;
                margin-right: 10px;
            }

        }
        // 开屏
        .card-screen{
              width:200px;
            height: 200px;
           margin-top: 10px;
            img{
                width:100%;
                height: 100%;
            }

        }
        .card-screen-btn{
            margin-top: 5px;
        }

    }
}
.tips{
    color: #a7a7a7;
}
.num-list{
    display: inline-block;
    margin-right: 10px;
}
</style>