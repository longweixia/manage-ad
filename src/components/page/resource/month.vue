<template>
    <div>
        <div class="container">
            <div class="card-area">
                <div class="row-text">
                    月榜奖励
                    <i-Switch size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-Switch>
                </div>
                <div>开启后在小程序-开启后在小程序-个人中心显示“榜单奖励”按钮，点击按钮显示宣传页
</div>
            </div>
            <div class="card-area">
                <div>
                    <div class="row-text tag-text">使用资源</div>

                    <div class="tips">开启后在小程序-个人中心显示“榜单奖励”按钮，点击按钮显示宣传页
</div>
                </div>
                <div class="tag-area">
                    <Tag
                        class="tag"
                        checkable
                        color="primary"
                        v-for="(item, index) in tagList"
                        :key="index"
                        closable
                        @on-close="handleClose"
                    >
                        {{ item.name }}
                    </Tag>
                </div>
            </div>

            <div class="card-area">
                <div class="row-text tag-text">宣传页</div>
                <div>图片格式必须为：png,bmp,jpeg,jpg,gif；不可大于2M</div>
                <Button type="primary" @click="uploadImg">上传图片</Button>
            </div>
            <div class="card-area">
                <div class="card-content">
                    <div class="card">
                        <img :src="imgObj.homeImg" />
                    </div>
                </div>
            </div>
            <div></div>

            <div class="card-area">
                <div class="row-text">
                    最低热力值
                    <i-Switch size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-Switch>
                </div>
                <div>为避免以极低热力值获得冠军导致发起方亏损，可设置热力值阈值，低于阈值即使获得冠军仍不能得到奖励</div>
                <div>
                    低于
                    <Input style="width: 200px" />热力值无法获得奖励
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
    data: function () {
        return {
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
            tagList: [{ name: '小程序开屏' }, { name: '首页轮播' }, { name: '首页轮播' }, { name: '户外大屏' }] //标签集合
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
                .then((res) => {
                    this.table.data = res.data.data.list;
                    this.total = res.data.data.total;
                })
                .catch((err) => {
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
</style>