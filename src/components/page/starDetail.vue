<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>明星详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="card-area">
                <div class="row-text">姓名</div>
                <Input v-model="form.name" placeholder="姓名" style="width:200px" clearable></Input>
            </div>
            <div class="card-area">
                <div class="row-text">图片</div>
                <Button type="primary" @click="uploadImg">上传图片</Button>
            </div>
            <div class="card-area">
                <div class="card-content">
                    <div class="card">
                        <div class="text">首页轮播图预览</div>
                        <img :src="imgObj.homeImg" />
                    </div>
                    <div class="card">
                        <div class="text">明星详细页预览</div>
                        <img :src="imgObj.detailImg" />
                    </div>
                    <div class="card">
                        <div class="text">打榜弹窗预览</div>
                        <img :src="imgObj.hitPopupImg" />
                    </div>
                </div>
            </div>
             <div class="card-area">
                <div class="row-text">头像</div>
                <Button type="primary" @click="uploadImg">上传头像</Button>
                <div class="card-header">
    
                        <img :src="imgHeader" />
                    </div>
            </div>
            <div class="card-area">
                <div>
                     <div class="row-text tag-text" >设置标签</div>
                    <span class="addTag-text" @click="addTag">新增标签</span>
                    <div class='tips'>标签可在发布资源时选择，便于快速关联明星</div>
                </div>
                <div class="tag-area">
                    <Tag class="tag" checkable color="primary">标签一</Tag>
                    <Tag class="tag" checkable color="primary" v-for='(item,index) in tagList' :key="index"  closable @on-close="handleClose">
                        {{item.name}}
                    </Tag>
                </div>
               
            </div>
                <div class="card-area">
                <div class="row-text">小程序开屏图(选填)</div>
                <div class='tips'>添加明星时可不上传，可等该明星开屏资源快要满足时上传</div>
                <Button class="card-screen-btn" type="primary" @click="uploadImg">上传开屏图</Button>
                <div class="card-screen">
    
                        <img :src="imgHeader" />
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
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
</style>