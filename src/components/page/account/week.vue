<template>
    <div>
        <div class="container">
            <div class="card-area">
                <div class="row-text">
                    周榜奖励
                    <i-Switch size="large" v-model="switchValWeek">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-Switch>
                </div>
                <div>
                    开启后在小程序-个人中心显示“榜单奖励”按钮，点击按钮显示宣传页
                </div>
            </div>
            <div class="card-area">
                <div>
                    <div class="row-text tag-text">使用资源</div>

                    <div class="tips">小程序开屏和首页轮播在第1名产生后自动生成，后援金和户外大屏线下发放</div>
                </div>
                <div class="tag-area">
                    <Tag
                        class="tag"
                        checkable
                        color="primary"
                        :checked="false"
                        v-for="(item, index) in tagList"
                        :key="index"
                        @on-change="item.checked = !item.checked"
                    >
                        {{ item.name }}
                    </Tag>
                </div>
            </div>

            <div class="card-area">
                <div class="row-text tag-text">宣传页</div>
                <div>图片格式必须为：png,bmp,jpeg,jpg,gif；不可大于2M</div>

                <Button type="primary" @click="uploadImg">上传图片</Button>

                <div class="upload-area">
                    <upload :value.sync="imgUrl" @upImageUrl="getImageUrl" ref="upload" :fileFormat="true"></upload>
                </div>
            </div>
            <div class="card-area">
                <div class="row-text">
                    最低热力值
                    <i-Switch size="large"  v-model="switchValHot">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-Switch>
                </div>
                <div>
                    为避免以极低热力值获得冠军导致发起方亏损，可设置热力值阈值，低于阈值即使获得冠军仍不能得到奖励
                </div>
                <div style="margin-top:20px">
                    低于 <Input placeholder="输入数字，最多8位" style="width:200px" v-model="valueHot" /> 热力值无法获得奖励
                </div>
            </div>
            <div>
                <Button type="primary" @click="save">保存</Button>
            </div>
        </div>
    </div>
</template>

<script>
import upload from '../../common/upload/index.vue';
export default {
    components: {
        upload
    },
    data() {
        return {
            switchValWeek: false, //周榜奖励默认关闭
            switchValHot: false, //最低热力值默认关闭
            valueHot:"",//热力值
            imgUrl: '', //图片url
            img:"",//上传时的图片url
            flieData: null, //图片文件
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
            tagList: [
                { name: '小程序开屏', value: 2, checked: false },
                { name: '首页轮播', value: 3, checked: false },
                { name: '后援金', value: 1, checked: false },
                { name: '户外大屏', value: 4, checked: false }
            ] //标签集合
        };
    },
    methods: {
        getImageUrl(data) {
            this.imgUrl = data[0];
            this.flieData = data[1];
        },
        // 上传文件，保存时才上传
        uploadFile() {
            //
            if (this.flieData) {
                const formData = new FormData();
                formData.append('file', this.flieData);  //todo 接口类型错误，应该是file不是string
                this.axios
                    .post(`/common/upload`,
                        formData
                    )
                    .then(res => {
                        this.img = res.data.data.img;
                    })
                    .catch(err => {
                        console.log('err', err);
                    });
            }
        },
        // 保存
        save() {
            if (!this.switchValHot&&this.valueHot) {
                this.$Message.error('输入热力值前，需要先开启最低热力值按钮');
                return false
            }
            this.uploadFile()
            let tagArry = []; //选中的tag
            this.tagList.forEach((item, index) => {
                if (item.checked) {
                    tagArry.push(item.value);
                }
            });
            this.axios
                .post(`/resources/addOrUpdateListAward`, {
                    code: 'WEEK', //WEEK:周榜 MONTH-月榜
                    img: this.img, //宣传页
                    minVal: this.valueHot, //最低热力值
                    open: this.switchValWeek, //是否开启
                    openMin: this.switchValHot, //是否开启最低热力值
                    type: tagArry //1-后援金 2-小程序开屏 3-首页轮播 4-户外大屏  todo type应该是一个数组
                })
                .then(res => {
                   
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        // 上传图片
        uploadImg() {
              this.$refs.upload.clickFile();
        },
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
        .card-header {
            width: 100px;
            height: 100px;
            border-radius: 50px;
            margin-top: 10px;
            img {
                width: 100%;
                height: 100%;
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
            height: 200px;
            margin-top: 10px;
            img {
                width: 100%;
                height: 100%;
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
.upload-area {
    margin-top: 20px;
}
</style>
