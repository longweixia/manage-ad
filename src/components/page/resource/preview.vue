<template>
    <!-- 资源 -->
    <Modal v-model="visible" title="资源预览" width="600" ok-text="确定" @on-ok="save">
        <div class="star-card">
            <div class="list-top" v-for="(item, index) in prizeWrawList" :key="index">
                <div>资源</div>
                <div class="row-text">
                    <div>剩余 8天6时34分30秒</div>
                </div>
                <div class="btn">立即参与</div>
            </div>
            <div class="title">为XXX观看视频10天，解锁深圳华强北广场屏</div>
            <div class="slider-area">
            <Slider v-model="sliderVal"></Slider>
            <div class="btn-slider">{{ sliderVal }}</div>
            </div>
            <!-- <div class="slider-area">
                <div class="btn-slider">{{ value }}</div>
            </div> -->
            <div class="flex-area">
                <div>目标人数：5000</div>
                <div>参与人数：5000</div>
                <div>达成人数：5000</div>
            </div>
            <div class="flex-area">
                <div v-for="(item, index) in listWeek" :key="index" class="img-list">
                    <img class="img" width="60px" height="60px" :src="item.image" shape="circle" />

                    <div class="num">{{ index }}</div>
                </div>
                <div class="more" @click="routerResourcesRanking('resouceId')">...</div>
            </div>
        </div>
    </Modal>
</template>

<script>
export default {
    name: 'resources',
    components: {},
    props: {
        uploadImgModel: Boolean
    },
    watch: {
        visible(val) {
            this.$emit('update:uploadImgModel', val);
        },

        uploadImgModel(val) {
            this.visible = val;
        }
    },
    data() {
        return {
            sliderVal: null,
            visible: this.uploadImgModel, //显示当前组件
            value: 30,
            //抽奖互动
            prizeWrawList: [
                {
                    tips: '100%中热力值',
                    image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                    num: '4',
                    name: '抽奖',
                    val: 500
                },
                // {
                //     tips: '签到获得20热力值',
                //     image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                //     num: '5',
                //     name: '签到',
                //     val: 500
                // },
                // {
                //     tips: '观看视频获得30热力值',
                //     image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                //     num: '6',
                //     name: '看视频',
                //     val: 500
                // },
                // {
                //     tips: '分享获得30热力值',
                //     image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                //     num: '7',
                //     name: '分享',
                //     val: 500
                // }
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
            // width:20px;
            text-align: left;
            font-size: 10px;
            font-family: Arial;
        }
    }
}
.title {
    fonst-size: 16px;
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
    width: 40px;
    text-align: center;
    height: 40px;
    line-height: 20px;
    background: #666;
    color: #fff;
    position: relative;
    right: 20px;
    top: -10px;
    float: right;
}
.btn-slider::before {
    position: absolute;
    content: ''; //必须设置这个值才会看到半圆
    left: -9px;
    width: 15px;
    height: 20px;
    border-radius: 10px 0 0 10px;
    line-height: 20px;
    background: #666;
}
.btn-slider::after {
    position: absolute;
    content: ''; //必须设置这个值才会看到半圆
    right: -9px;
    width: 15px;
    height: 20px;
    border-radius: 0 10px 10px 0;
    line-height: 20px;
    background: #666;
}
.u-slider--disabled {
    opacity: 1 !important;
}
.slider-area {
    margin-top: 10px;
    margin-bottom: 15px;
}
.flex-area {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
}
.img-list {
    //   text-align: center;
    position: relative;
    display: inline-block;
    padding: 5px;
    .img {
        position: relative;
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
