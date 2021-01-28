<template>
    <!-- 资源 -->
    <Modal v-model="visible" title="资源预览" width="600" ok-text="确定" @on-ok="save">
        <div class="star-card">
            <div class="list-top" v-for="(item, index) in prizeWrawList" :key="index">
                <div style="font-size: 14px">资源</div>
                <div class="row-text">
                    <div>剩余{{list.endTime | getTimeSecond}}</div>
                </div>
                <div class="btn">立即参与</div>
            </div>
            <div class="title">为{{list.id}}观看视频{{list.day}}天，{{list.titles}}</div>
            <div>
                <div class="slider-area">
                    <Slider v-model="sliderVal" style="display: inline-block;width:480px"></Slider>

                    <span class="btn-slider">{{ sliderVal }}</span>
                </div>
            </div>
            <div>
                <div class="slider-area">
                    <Slider v-model="sliderVal" style="display: inline-block;width:480px"></Slider>

                    <span class="btn-slider">{{ sliderVal }}</span>
                </div>
            </div>

            <div class="flex-area">
                <div>目标人数：{{list.target}}</div>
                <div>参与人数：0</div>
                <div>达成人数：0</div>
            </div>
            <!-- <div class="flex-area">
                <div v-for="(item, index) in listWeek" :key="index" class="img-list">
                    <img class="img" width="60px" height="60px" :src="item.image" shape="circle" />

                    <div class="num">{{ index }}</div>
                </div>
                <div class="more" @click="routerResourcesRanking('resouceId')">...</div>
            </div> -->
        </div>
    </Modal>
</template>

<script>
export default {
    name: 'resources',
    components: {},
    props: [
        'uploadImgModel',
        'list'
    ],
    watch: {
        visible(val) {
            this.$emit('update:uploadImgModel', val);
        },

        uploadImgModel(val) {
            this.visible = val;
        }
    },
       filters: {
        getTimeSecond(e) {
            if (e) {
                let time = new Date(e).getTime() - new Date().getTime();
                let day = Math.floor(time / 86400000); //天
                let hours = Math.floor((time % 86400000) / 3600000); //时
                let minutes = Math.floor((time % 3600000) / 60000); //分
                let seconds = Math.floor((time % 60000) / 1000); //秒
                return day + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
            }
        }
    },
    data() {
        return {
            sliderVal: null,
            visible: this.uploadImgModel, //显示当前组件
            value: 30,
            //抽奖互动
            prizeWrawList: [
               {}
            ],
            // 周榜/月榜
            listWeek: [
                {
                    icon: '皇冠',
                    image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                    num: '49',
                    name: '邓伦',
                    val: 500
                },
                {
                    icon: '皇冠',
                    image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                    num: '10',
                    name: '邓伦',
                    val: 500
                },
                {
                    icon: '皇冠',
                    image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                    num: '11',
                    name: '邓伦',
                    val: 500
                }
            ]
        };
    },
    methods: {
        save() {
            this.visible = false;
        },
        routerResourcesRanking(resouceId) {
            let id = Number(this.id);
            uni.navigateTo({
                url: `/pages/starDetail/resourcesRanking?id=${id}`
            });
        }
    }
};
</script>

<style lang="less" scoped>
// 当前明星卡片
.star-card {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    // 明星上方数据
    .list-top {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 10px;
        padding-top: 10px;
        .img {
            position: relative;
            display: inline-block;
        }
        .btn {
            width: 80px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 15px;
            background: #666;
            color: #fff;
            position: relative;
            right: 20px;
        }

        .row-text {
            font-size: 14px!important;
            // width:20px;
            text-align: left;
            font-size: 10px;
            font-family: Arial;
        }
    }
}
.title {
    font-size: 18px;
    font-weight: bold;
}
.badge-button {
    // padding: 20px 20px;
    width: 25px;
    height: 25px;
    background-color: red;
    color: #fff;
    border-radius: 12px;
    border: none;
    font-size: 22px;
    line-height: 1;
}
.slider-resource {
    margin-right: 75px;
}
.btn-slider {
    position: relative;
    top: -14px;
    left: 20px;
}

.u-slider--disabled {
    opacity: 1 !important;
}
.slider-area {
    // margin-top: 10px;
    // margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
}
.flex-area {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}
.img-list {
    //   text-align: center;
    position: relative;
    display: inline-block;
    padding: 5px;
    .img {
        position: relative;
        border-radius: 30px;
    }
    .num {
        position: absolute;
        right: 15px;
        top: 0;
        font-size: 14px;
        font-weight: bold;
    }
    .num::after {
        clear: both;
        height: 0;
    }
}
.more {
    display: inline-block;
    text-align: center;
    position: relative;
    top: 7px;
}
</style>
