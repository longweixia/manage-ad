<template>
    <div>
        <div class="container">
            <div class="card-area">
                <div class="row-text">资源类型</div>
                <div>
                    <Select v-model="type" style="width: 150px" clearable @on-change="changeType">
                        <Option v-for="item in selectResourceType" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                    <Input
                        v-if="typeVal == 1"
                        placeholder="输入后援金数额，最多6个数字，例：50000"
                        style="width: 400px; margin-left: 20px"
                        v-model="markMoney"
                    />
                    <Input
                        v-if="typeVal == 4"
                        placeholder="输入大屏名称，最多10个数字，例：深圳华强北步行街大屏"
                        style="width: 400px; margin-left: 20px"
                        v-model="screenName"
                    />
                </div>
                <div class="tips">参与方式都为看视频，资源展示在明星详细页“资源”中，后援金和户外大屏需输入金额和大屏名称</div>
            </div>
            <div class="card-area">
                <div>
                    <div class="row-text tag-text">目标人数</div>
                    <div>
                        <Input style="width: 200px" v-model="target" />
                    </div>
                    <div class="tips">只需输入目标人数，参与人数和达成人数将自动计算，达成人数等于目标人数则完成任务</div>
                </div>
            </div>

            <div class="card-area">
                <div class="row-text">设定倒计时</div>

                <div style="margin-top: 20px">
                    从<DatePicker
                        type="date"
                        @on-change="changeDate"
                        :options="selectDate"
                        placeholder="选择开始日"
                        style="width: 150px"
                    ></DatePicker>
                    开始，往后 <Input placeholder="输入数字" style="width: 200px" v-model="day" />天
                </div>
                <div class="tips">
                    系统在开始日00:00:01自动发起，开始日在当天需扣除已过时间，例：倒计时7天，在开始日01点发起，扣去1小时则倒计时为：6天23时59分59秒
                </div>
            </div>
            <div class="card-area">
                <div class="row-text">关联明星</div>
                <div>选择明星标签</div>
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
                <div class="row-text">输入明星ID</div>

                <div><Input placeholder="输入数字" style="width: 200px" v-model="starIdstext" /></div>
            </div>
            <div>
                <Button type="primary" @click="save">保存</Button>
                <Button type="primary" @click="preview" style="margin-left: 20px">样式预览</Button>
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
            typeVal: null, //当前选择的类型
            target: '', //目标人数
            beginTime: '', //开始时间
            day: null, //开始时间往后几天
            markMoney: '', //后援金额
            screenName: '', //大屏名称
            openMin: false, //最低热力值默认关闭
            valueHot: '', //热力值
            starIdstext: '', // 明星id字符类型，多个需要用逗号隔开，传给后端是数组形式
            img: '', //上传时的图片url
            type: '', //选择的热力下拉框的值
            selectResourceType: [
                { name: '后援金', value: 1, checked: false },
                { name: '小程序开屏', value: 2, checked: false },
                { name: '首页轮播', value: 3, checked: false },
                { name: '户外大屏', value: 4, checked: false }
            ],
            tagList: [
                { name: '小程序开屏', value: 2, checked: false },
                { name: '首页轮播', value: 3, checked: false },
                { name: '后援金', value: 1, checked: false },
                { name: '户外大屏', value: 4, checked: false }
            ], //标签集合
            selectDate: {
                disabledDate(date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            }
        };
    },
    methods: {
        // 改变资源类型
        changeType(name) {
            this.typeVal = name;
            // console.log(name,2222)
            // if(name ===1){

            // }
        },
        // 预览
        preview() {
            this.uploadImgModel = true;
        },
        changeDate(data) {
            this.beginTime = data;
        },
        getMyDate(str) {
            var oDate = new Date(str),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                // oHour = oDate.getHours(),
                // oMin = oDate.getMinutes(),
                // oSen = oDate.getSeconds(),
                oTime = oYear + '-' + this.addZero(oMonth) + '-' + this.addZero(oDay);
            return oTime;
        },
        addZero(num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },

        // 保存
        save() {
            // if (!this.openMin && this.valueHot) {
            //     this.$Message.error('输入热力值前，需要先开启最低热力值按钮');
            //     return false;
            // }
            // 处理标签
            let tagArry = []; //选中的tag
            this.tagList.forEach((item, index) => {
                if (item.checked) {
                    tagArry.push({ name: item.name, id: item.value });
                }
            });
            // 处理明星id
            let starIdsInit = [],
                starIds = [];
            if (this.starIdstext) {
                starIdsInit = this.starIdstext.split(',');
                starIdsInit.forEach((item, i) => {
                    starIds.push(Number(item));
                });
            }

            // 处理时间
            let endTime;
            // 7天以后
            let nextDate = new Date(this.beginTime).getTime() + 24 * 60 * 60 * 1000 * this.day;
            endTime = this.getMyDate(nextDate);
            this.axios
                .post(`/resources/addOrUpdateResources`, {
                    beginTime: this.beginTime,
                    endTime: endTime,
                    id: '', //这个是什么 todo

                    mark: this.typeVal == 1 ? this.markMoney : this.screenName, //金额和大屏名称

                    starIds: starIds, // 数组格式

                    tags: tagArry, // tags应该是一个数组
                    target: this.target, //目标人数

                    type: this.type //1-后援金 2-小程序开屏 3-首页轮播 4-户外大屏
                })
                .then((res) => {
                    this.$Message.success('添加成功');

                    this.$router.push({
                        name: 'resource',
                        params: {
                            loadPage: 'loadPage'
                        }
                    });
                })
                .catch((err) => {
                    this.$Message.error(err);
                });
        },

        //新增标签
        addTag() {},
        //关闭标签
        handleClose(event, name) {
            const index = this.tagList.indexOf(name);
            this.tagList.splice(index, 1);
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
                border: 1px solid #ddd;
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
