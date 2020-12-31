<template>
    <div>
        <div class="container">
            <div class="card-area">
                <div class="row-text">
                    开启轮播图
                    <i-Switch size="large" v-model="open">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-Switch>
                </div>
                <div>轮播图按下方顺序展示在首页，最多配置两个，本页配置会顶替月榜周榜轮播（如有），下方播完周榜月榜继续</div>
            </div>

            <div>
                <div class="row-text">轮播图1</div>{{modalBannaer1}}
                <Button type="primary" @click="showModalBannaer1">上传图片</Button>
            </div>
            <div class="card-area">
                <div class="card-content">
                    <div class="card">
                        <div class="text">首页轮播图</div>
                        <viewer :images="[home1]">
                            <img :src="home1" class="img-content" />
                        </viewer>
                        <!-- <div class="upload-area">
                            <upload :value.sync="home1" @upImageUrl="getImageUrl1" ref="upload" :fileFormat="true"></upload>
                        </div> -->
                    </div>
                    <div class="card">
                        <div class="text">二级页面图片</div>
                        <viewer :images="[level1]" class="img-content">
                            <img :src="level1" class="img-content" />
                        </viewer>
                    </div>
                </div>
            </div>
            <div>
                <div class="row-text">轮播图2</div>
                <Button type="primary" @click="uploadImg">上传图片</Button>
            </div>
            <div class="card-area">
                <div class="card-content">
                    <div class="card">
                        <div class="text">首页轮播图</div>
                        <viewer :images="[home2]">
                            <img :src="home2" class="img-content" />
                        </viewer>
                    </div>
                    <div class="card">
                        <div class="text">二级页面图片</div>
                        <viewer :images="[level2]">
                            <img :src="level2" class="img-content" />
                        </viewer>
                    </div>
                </div>
            </div>
        </div>
        <!-- 轮播1 -->
        
        <Banners1 :modalBannaer="modalBannaer1" @closeBanner1="closeBanner1" @upImageUrl1='upImageUrl1' :home1="home1" :level1="level1" :bannerData="bannerData"></Banners1>
    </div>
</template>

<script>
import upload from '../common/upload/index.vue';
import Banners1 from './Banners/Banners1.vue';
export default {
    components: {
        upload,
        Banners1
    },
    data() {
        return {
            bannerData:{}, //轮播数据
            modalBannaer1: false,
            open: false, //是否开启
            home1: '',
            home2: '',
            level1: '',
            level2: '',
            flieData1: null, //图片文件
            flieData2: null, //图片文件
            imgObj: {
                homeImg: '', //首页轮播图
                detailImg: '', //详情页
                hitPopupImg: '' //打榜弹窗图
            }, //轮播图等
            selectHotVal: '', //选择的热力下拉框的值
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
            numList: [
                { name: '', value: '' },
                { name: '', value: '' }
            ],
            limitVal: '', //每日限制次数
            form: {
                name: '' //姓名
            },
            imgObj: {
                homeImg: '', //首页轮播图
                detailImg: '', //详情页
                hitPopupImg: '' //打榜弹窗图
            }, //轮播图等
            imgHeader: '', //头像url
            tagList: [{ name: '标签2' }, { name: '标签3' }, { name: '标签4' }] //标签集合
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        upImageUrl1(){

        },
        upImageUrl(data){
            // this.home1 = data[0]
        },
        closeBanner1(data){
            this.modalBannaer1 = false
        },
        showModalBannaer1() {
         
            this.modalBannaer1 = true;
        },
        getImageUrl1(data) {
            this.home1 = data[0];
            this.flieData1 = data[1];
        },
        getImageUrl2(data) {
            this.home2 = data[0];
            this.flieData2 = data[1];
        },
        // 上传图片
        uploadImg() {},
        //新增标签
        addTag() {},
        //关闭标签
        handleClose(event, name) {
            const index = this.tagList.indexOf(name);
            this.tagList.splice(index, 1);
        },
        // 上传文件，保存时才上传
        uploadFile1() {
            //
            if (this.flieData) {
                const formData = new FormData();
                formData.append('file', this.flieData); //todo 接口类型错误，应该是file不是string
                this.axios
                    .post(`/common/upload`, formData)
                    .then((res) => {
                        this.home1 = res.data.data.img;
                    })
                    .catch((err) => {
                        console.log('err', err);
                    });
            }
        },
        // 上传文件，保存时才上传
        uploadFile2() {
            //
            if (this.flieData) {
                const formData = new FormData();
                formData.append('file', this.flieData); //todo 接口类型错误，应该是file不是string
                this.axios
                    .post(`/common/upload`, formData)
                    .then((res) => {
                        this.home2 = res.data.data.img;
                    })
                    .catch((err) => {
                        console.log('err', err);
                    });
            }
        },
        loadData() {
            this.axios
                .post(`/carousel/selectCarousel`)
                .then((res) => {
                    // let res = {
                    //     data: {
                    //         home1: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1727914444,3729344997&fm=26&gp=0.jpg', //首页轮播图
                    //         home2: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2033921778,648007645&fm=26&gp=0.jpg', //首页轮播图
                    //         id: 0, // 图片id
                    //         level1: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2980445260,41238050&fm=26&gp=0.jpg', //二级轮播图
                    //         level2: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1694681277,1453280371&fm=26&gp=0.jpg', //二级轮播图
                    //         open: 1 //是否开启 1开启，0不开启
                    //     }
                    // };
                    this.bannerData = res.data
                    this.open = res.data.open == 0 ? false : true;
                    this.home1 = res.data.home1;
                    this.home2 = res.data.home2;
                    this.level1 = res.data.level1;
                    this.level2 = res.data.level2;
                })
                .catch((err) => {
                    this.$Message.error(err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.row-text {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
}
.container {
    .card-area {
        margin-bottom: 20px;

        .card-content {
            display: flex;
            justify-content: left;
            align-items: center;
            min-height: 350px;
            .card {
                width: 200px;
                // height: 200px;
                margin-right: 20px;
                .text {
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                img {
                    width: 100%;
                    // height: 100%;
                    padding: 5px;
                    background: #ddd;
                }
            }
        }
        .card-header {
            width: 100px;
            // height: 100px;
            border-radius: 50px;
            margin-top: 10px;
            img {
                width: 100%;
                // height: 100%;
                border-radius: 50px;
            }
        }
        .tag-text {
            display: inline-block;
            margin-bottom: 5px;
        }
        .addTag-text {
            color: blue;
            cursor: pointer;
            margin-left: 20px;
        }
        // 标签
        .tag-area {
            .tag {
                cursor: pointer;
                margin-right: 10px;
            }
        }
        // 开屏
        .card-screen {
            width: 200px;
            // height: 200px;
            margin-top: 10px;
            img {
                // width: 100%;
                // height: 100%;
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
.num-list {
    display: inline-block;
    margin-right: 10px;
}
.img-content {
    width: 200px;
    height: 200px;
}
.row-text {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
}
</style>