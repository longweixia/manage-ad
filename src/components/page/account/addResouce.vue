<template>
    <div>
        <div class="container">
            <div class="card-area">
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>{{ titles == 'add' ? '添加资源' : '资源详情' }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div>
                    <Select v-model="selectHotVal" style="width: 150px" clearable>
                        <Option v-for="item in selectHotList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="tips">
                    参与方式都为看视频，资源展示在明星详细页“资源”中，后援金和户外大屏需输入金额和大屏名称
                </div>
            </div>
            <div class="card-area">
                <div>
                    <div class="row-text tag-text">目标人数</div>
                    <div>
                        <Input style="width:200px" v-model="tarGetVal" />
                    </div>

                    <div class="tips">只需输入目标人数，参与人数和达成人数将自动计算，达成人数等于目标人数则完成任务</div>
                </div>
            </div>

            <div class="card-area">
                <div class="row-text">
                    设定倒计时
                </div>

                <div style="margin-top:20px">
                    从<DatePicker type="date" :options="selectDate" placeholder="选择开始日" style="width: 100px"></DatePicker> 开始，往后
                    <Input placeholder="输入数字" style="width:200px" v-model="valueHot" />天
                </div>
                <div class="tips">
                    系统在开始日00:00:01自动发起，开始日在当天需扣除已过时间，例：倒计时7天，在开始日01点发起，扣去1小时则倒计时为：6天23时59分59秒
                </div>
            </div>
            <div class="card-area">
                <div class="row-text">
                    关联明星
                </div>
                <div>
                    选择明星标签
                </div>
                <!-- <div class="tag-area">
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
                </div> -->
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
            <div class="card-area">
                <div class="row-text">
                    输入明星ID
                </div>

                <div><Input placeholder="输入数字" style="width:200px" v-model="valueHot" /></div>
            </div>
            <div>
                <Button type="primary" @click="save">保存</Button>
                <Button type="primary" @click="preview">样式预览</Button>
            </div>
        </div>
        <Preview :uploadImgModel.sync="uploadImgModel"></Preview>
    </div>
</template>

<script>
import Preview from './preview.vue';
export default {
    components: {
        Preview
    },
    data() {
        return {
            uploadImgModel: false,
            tarGetVal: '', //目标人数
            switchValHot: false, //最低热力值默认关闭
            valueHot: '', //热力值
            img: '', //上传时的图片url
            selectHotVal: '', //选择的热力下拉框的值
            selectHotList: [
                { name: '后援金', value: 1, checked: false },
                { name: '小程序开屏', value: 2, checked: false },
                { name: '首页轮播', value: 3, checked: false },
                { name: '户外大屏', value: 4, checked: false }
            ],
            tagList: [
                // { name: '小程序开屏', value: 2, checked: false },
                // { name: '首页轮播', value: 3, checked: false },
                // { name: '后援金', value: 1, checked: false },
                // { name: '户外大屏', value: 4, checked: false }
            ], //标签集合
            selectDate: {
                disabledDate(date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            titles: '资源详情', //详情标题
            id: ''
        };
    },

    mounted() {
        this.titles = this.$route.query.add;
        this.id = this.$route.query.id;
        if (this.id) {
            this.axios
                .post(`/star/tags/list`)
                .then(res => {
                    this.tagList = res.data;
                    this.loadData();
                })
                .catch(err => {
                    this.$Message.error(err);
                    this.loadData();
                });
        } else {
            this.getTags();
        }
    },
    methods: {
        getTags() {
            this.axios
                .post(`/star/tags/list`)
                .then(res => {
                    this.tagList = res.data;
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
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
        // 预览
        preview() {
            this.uploadImgModel = true;
        },

        // 保存
        save() {
            // if (!this.switchValHot && this.valueHot) {
            //     this.$Message.error('输入热力值前，需要先开启最低热力值按钮');
            //     return false;
            // }

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

                    openMin: this.switchValHot, //是否开启最低热力值
                    type: tagArry //1-后援金 2-小程序开屏 3-首页轮播 4-户外大屏  todo type应该是一个数组
                })
                .then(res => {})
                .catch(err => {
                    console.log('err', err);
                });
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
