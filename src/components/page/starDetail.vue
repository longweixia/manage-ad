<template>
    <div class="star-area-detail">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{titles=='add'?'添加明星':'明星详情'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <Form ref="formInline" :rules="rules" inline>
                <FormItem prop="name">
                    <div class="card-area">
                        <div class="row-text">姓名</div>
                        <Input v-model="name" placeholder="姓名" style="width: 200px" clearable></Input>
                    </div>
                </FormItem>
                <!-- <div class="card-area">
                <div class="row-text">图片</div>
                <Button type="primary" @click="uploadImg('Carousel')">上传图片</Button>
            </div> -->
                <UploadCarousel @updateCarouselImg="updateCarouselImg" :homeImg="homeImg"></UploadCarousel>
                <div class="card-area">
                    <div class="card-content">
                        <FormItem prop="homeImg">
                            <div class="card">
                                <div class="text">首页轮播图预览</div>
                                <viewer :images="[homeImg]" v-if="homeImg">
                                    <img :src="homeImg" class="img" />
                                </viewer>
                                <img v-if="!homeImg" src="../../assets/img/NullPic.png" style="border:2px solid #ddd" />
                            </div>
                        </FormItem>
                        <div class="card">
                            <div class="text">明星详细页预览</div>
                            <viewer :images="[homeImg]" v-if="homeImg">
                                <img :src="homeImg" class="img" />
                            </viewer>
                            <img v-if="!homeImg" src="../../assets/img/NullPic.png" style="border:2px solid #ddd" />
                        </div>
                        <div class="card">
                            <div class="text">打榜弹窗预览</div>
                            <viewer :images="[homeImg]" v-if="homeImg">
                                <img :src="homeImg" class="img" />
                            </viewer>
                            <img v-if="!homeImg" src="../../assets/img/NullPic.png" style="border:2px solid #ddd" />
                        </div>
                    </div>
                </div>

                <UploadHeader @updateCarouselImg="updateCarouselimgHeader" :homeImg="avatar"></UploadHeader>
                <div class="card-area">
                    <!-- <div class="row-text">头像</div>
                <Button type="primary" @click="uploadImg">上传头像</Button> -->
                    <div class="card-header">
                        <viewer :images="[avatar]" v-if="avatar">
                            <img :src="avatar" class="img" style="width:100px;height:100px;border-radius:50px" />
                        </viewer>
                        <img v-if="!avatar" src="../../assets/img/NullPic.png" style="border:2px solid #ddd" />
                    </div>
                </div>
                <div class="card-area">
                    <div>
                        <div class="row-text tag-text">设置标签</div>
                        <span class="addTag-text" @click="addTag">新增标签</span>
                        <div class="tips">标签可在发布资源时选择，便于快速关联明星</div>
                    </div>
      
                    <div class="tag-area">
                        <!-- <Tag class="tag" checkable color="primary">热门明星</Tag> -->
                        <Tag
                            :class="item.checked ? 'tagTrue' : 'tag'"
                            :checked="false"
                            color="primary"
                            v-for="(item, index) in tagList"
                            :key="index"
                            @click.native="changeTag(item)"
                        >
                            <span class="tag-text">{{ item.name }}</span>
                        </Tag>
                    </div>
                </div>
            </Form>
            <div class="card-area">
                <!-- <div class="row-text">小程序开屏图(选填)</div>
                <div class="tips">添加明星时可不上传，可等该明星开屏资源快要满足时上传</div>
                <Button class="card-screen-btn" type="primary" @click="uploadImg">上传开屏图</Button> -->

                <UploadScreen @updateCarouselImg="updateCarouselimgScreen" :homeImg="openImg"></UploadScreen>
                <div class="card-screen">
                    <viewer :images="[openImg]" v-if="openImg">
                        <img :src="openImg" class="img" />
                    </viewer>
                    <img v-if="!openImg" src="../../assets/img/NullPic.png" style="border:2px solid #ddd" />
                </div>
            </div>
            <div>
                <Button  @click="reback" style="display:inline-block">返回</Button>
                <Button type="primary" @click="save" style="display:inline-block;margin-left:20px">保存</Button>
            </div>
          

            <!-- 新增按钮，弹窗 -->
            <Modal v-model="modalTag" title="新增标签">
                <div>
                    <Input v-model="tagText" placeholder="最多6个字" maxlength="6" style="width: 200px" clearable></Input>
                    <Button class="card-screen-btn" type="primary" @click="okAddTag" style="margin-left:10px">增加</Button>
                </div>
                <p style="margin-top:20px">当前标签</p>
                <div class="tag-area">
                    <!-- <Tag class="tag" checkable color="primary">热门明星</Tag> -->
                    <Tag
                        class="tag"
                        color="primary"
                        v-for="(item, index) in tagList"
                        :key="index"
                        closable
                        @on-change="item.checked = !item.checked"
                        @on-close="handleClose(item)"
                    >
                        {{ item.name }}
                    </Tag>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import UploadCarousel from '../page/StarList/uploadCarousel.vue';
import UploadHeader from '../page/StarList/uploadHeader.vue';
import UploadScreen from '../page/StarList/uploadScreen.vue';
export default {
    components: {
        UploadCarousel,
        UploadHeader,
        UploadScreen
    },
    data: function() {
        //     const logisticValid = (rule, value, cb) => {
        //   let { isCollect, isLine, isInBoard, isAboard } = this.form,
        //       arr = [isCollect, isLine, isInBoard, isAboard]
        //   if(arr.includes(true)) cb()
        //   else cb(new Error(rule.message))
        // }
        return {
            rules: {
                name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }]
            },
            modalBannaerInit: false,
            modalTag: false,
            id: null, //明星id

            name: '', //姓名

            homeImg: '', //首页轮播图
            avatar: '', //头像url
            openImg: '', //头像url
            tagList: [
                // { name: '小程序开屏', value: 2, checked: false, id: 1 },
                // { name: '首页轮播', value: 3, checked: false, id: 12 },
                // { name: '后援金', value: 1, checked: false, id: 13 },
                // { name: '户外大屏', value: 4, checked: false, id: 14 }
            ], //标签集合
            addTagList: [], //新增标签上的列表
            tagText: '',
            titles:"明星详情",//详情标题
        };
    },
    mounted() {
        this.titles = this.$route.query.add
        this.getTags()
        this.id = this.$route.query.id;
     
        if (this.id) {
            this.loadData();
        }
    },
    methods: {
        reback(){
            this.$router.push({
                name:'starList'
            })

        },
        // 保存，有id为修改，否则为新增
        save() {
            if (this.id) {
                //修改
                this.changeStar();
            } else {
                // 新增
                this.addStar();
            }
        },
        // 校验数据---不校验数据
        checkData() {
            if (!this.homeImg) {
                this.$Message.error('请上传首页轮播');
                return false;
            } else if (!this.avatar) {
                this.$Message.error('请上传头像');
                return false;
            }
        },
        // 新增明星
        addStar() {
            // this.checkData();
            // 处理标签
            let tagArry = [];
            this.tagList.forEach((item, index) => {
                if (item.checked) {
                    tagArry.push({
                        id: item.id,
                        name: item.name
                    });
                }
            });
            this.axios
                .post(`/star/star/add`, {
                    avatar: this.avatar, //头像
                    detailImg: this.homeImg, //详情页
                    hitPopupImg: this.homeImg, //打榜弹窗图
                    homeImg: this.homeImg, //首页轮播图
                    hotSearch: 0, //是否热门搜索
                    id: 0,
                    name: this.name, //姓名
                    openImg: this.openImg, //所属开屏图
                    tags: tagArry
                })
                .then(res => {
                    // this.tagList = res.data;
                    this.$Message.success('新增成功');
                    // this.loadData()
                    this.$router.push({
                        name: 'starList'
                    });
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
        // 修改明星
        changeStar() {
            // this.checkData();
            // 处理标签
            let tagArry = [];
            this.tagList.forEach((item, index) => {
                if (item.checked) {
                    tagArry.push({
                        id: item.id,
                        name: item.name
                    });
                }
            });
            this.axios
                .post(`/star/star/update`, {
                    avatar: this.avatar, //头像
                    detailImg: this.homeImg, //详情页
                    hitPopupImg: this.homeImg, //打榜弹窗图
                    homeImg: this.homeImg, //首页轮播图
                    hotSearch: 0, //是否热门搜索
                    id: Number(this.id),
                    name: this.name, //姓名
                    openImg: this.openImg, //所属开屏图
                    tags: tagArry
                })
                .then(res => {
                    // this.tagList = res.data;
                    this.$Message.success('修改成功');
                    this.loadData();
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
        updateCarouselImg(data) {
            this.homeImg = data;
        },
        updateCarouselimgHeader(data) {
            this.avatar = data;
        },
        updateCarouselimgScreen(data) {
            this.openImg = data;
        },
      
        // 上传图片
        uploadImg() {},
        changeTag(data) {
            for (var i = 0; i < this.tagList.length; i++) {
                if (this.tagList[i].id == data.id) {
                    console.log(data);
                    this.tagList[i].checked = !data.checked;
                }
            }
            this.$forceUpdate(this.tagList);
            //    this.tagList.find((item,index)=>{
            //        return item.id = data.id
            //    }).checked = !data.checked
        },
        //新增标签
        addTag() {
            this.modalTag = true;
          
        },
        // 确认新增
        okAddTag() {
            if (!this.tagText) {
                this.$Message.error('请输入标签内容');
                return false;
            }
            this.axios
                .get(`/star/tags/add`, {
                    params: {
                        signature: this.tagText
                    }
                })
                .then(res => {
                    this.$Message.success('添加成功');
                    this.getTags();
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
        //关闭标签
        handleClose(data) {
            console.log(data)
            this.axios
                .get(`/star/tags/deleteTags`, {
                    params: {
                        id: data.id
                    }
                })
                .then(res => {
               
                    this.getTags();
                })
                .catch(err => {
                    this.$Message.error(err);
                });
            // const index = this.tagList.indexOf(name);
            // this.tagList.splice(index, 1);
        },
        // 查询标签
        loadData() {
            this.axios
                        .get(`/star/star/selectStatById`, {
                            params: {
                                id: this.id
                            }
                        })
                        .then(res => {
                            this.name = res.data.name;
                            this.homeImg = res.data.homeImg;
                            this.avatar = res.data.avatar;
                            this.openImg = res.data.openImg;
                            let tags = res.data.tags || [];
                            // 处理标签
                            this.tagList.forEach((item, index) => {
                                tags.forEach((item1, index1) => {
                                    if (item1.id == item.id) {
                                        this.tagList[index].checked = true;
                                    }
                                });
                            });
                        })
                        .catch(err => {
                            this.$Message.error(err);
                        });
           
        },
        getTags(){
             this.axios
                .post(`/star/tags/list`)
                .then(res => {
                    this.tagList = res.data;
                    
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.star-area-detail {
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
            .card-header {
                width: 100px;
                height: 100px;
                border-radius: 50px;
                margin-top: 10px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50px;
                    border: 1px solid #ddd;
                }
            }
            .tag-text {
                display: inline-block;
                margin-bottom: 5px;
            }
            .addTag-text {
                color: #2d8cf0;
                cursor: pointer;
                margin-left: 20px;
            }

            // 开屏
            .card-screen {
                width: 200px;
                height: 200px;
                margin-top: 10px;
                img {
                    width: 200px;
                  height: 200px;
                }
            }
            .card-screen-btn {
                margin-top: 5px;
            }
        }
    }
    .tips {
        color: #a7a7a7;
    }
    // 标签
    .tag-area {
        .tag {
            cursor: pointer;
            margin-right: 10px;

            border: 1px solid #ddd;
        }
        .tagTrue {
            color: #fff !important;
            cursor: pointer;
            margin-right: 10px;
            border: 1px solid #ddd;
            background: #2d8cf0;
            .tag-text {
                color: #fff !important;
            }
        }
    }
}
</style>
