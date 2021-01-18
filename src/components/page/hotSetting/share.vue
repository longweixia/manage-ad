<template>
    <div>
        <div class="container">
            <div class="card-area">
                <div class="row-text">分享微信获得热力值</div>
                <div style="margin-top:10px;margin-bottom:10px">需对方点击分享内容进入小程序才算完成</div>

                <div>
                    每日最高
                    <Input v-model="form.shareMaxNum" placeholder="数值" style="width: 200px" clearable></Input>次
                </div>

                <div style="margin-top:20px">
                    每次获得
                    <Input v-model="form.vigourShareNum" placeholder="数值" style="width: 200px" clearable></Input>热力值
                </div>
            </div>

            <div>
                <Button type="primary" @click="save">保存</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
           
            form: {
                 shareMaxNum: '', //每日限制次数
            vigourShareNum: '', //每日限制次数
            }
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.axios
                .get(`/hitSettings/select`)
                .then((res) => {
                    this.form = res.data
                    // this.form.shareMaxNum = res.data.shareMaxNum;
                    // this.form.vigourShareNum = res.data.vigourShareNum;
                })
                .catch((err) => {
                    this.$Message.error(err);
                });
        },

        save() {
            // let pramas = {
            //     shareMaxNum: Number(this.form.shareMaxNum),
            //     vigourShareNum: Number(this.form.vigourShareNum)
            // };
            this.axios
                .post(`/hitSettings/edit`, {
                    id:this.form.id,
                    shareMaxNum:this.form.shareMaxNum,
                    vigourShareNum:this.form.vigourShareNum,
                })
                .then((res) => {
                    this.$Message.success('保存成功');
                })
                .catch((err) => {
                    this.$Message.error(err);
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
            font-size: 16px;
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