<template>
    <div>
          <div class="container" style="border:none">
       
            <div class="card-area inp-top">
                <div class="row-text">数值设置</div>
                <div v-for="(item, index) in drawFieldNums" :key="index" class="num-list">
                    <Input v-model="drawFieldNums[index]" placeholder="数值" style="width: 200px;margin-top:10px" clearable></Input>
                </div>
            </div>
            <div class="card-area">
                <div class="row-text">每日限制次数</div>
                <Input v-model="form.deawMaxNum" placeholder="数值" style="width: 200px" clearable></Input>次
            </div>
            <div class="card-area">
                <div class="row-text">
                    高分值策略
                    <i-Switch size="large" v-model="scoreStrategyFlag">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-Switch>
                </div>
                <div>
                    单个粉丝累计抽奖
                    <Input v-model="form.strategyDeawMinNum" placeholder="数值" style="width: 200px" clearable></Input>次， 获得超过（含）
                    <Select v-model="form.vigourSendNum" style="width: 150px" clearable>
                        <Option v-for="(item,index) in drawFieldNums" :value="item" :key="item" @click.native="selectvigourSendNum(item, index)">{{
                            item
                        }}</Option>
                    </Select>
                    以上的随机热力值
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
    data: function() {
        return {
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
            vigourSendNumSrting: '', // 具体赠送热力值拼接的字符串

            form: {
                deawMaxNum: null, //每日抽奖最高次数
                strategyDeawMinNum: '', //单个粉丝累计抽奖次数
                scoreStrategyFlag: 0, //高分值策略开关  0：关闭；1开启；
                drawFieldNums: '', //热力抽奖8栏位数值 例：11,13,43,55,22
                vigourSendNum: '' //具体赠送热力值
            },
            drawFieldNums: [], //热力抽奖8栏位数值
            scoreStrategyFlag: false //高分值策略
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        // 获得超过以上的热力值
        selectvigourSendNum(item, index) {
            let vigourSendNumSrting = '';
            this.drawFieldNums.forEach((i, index1) => {
                // 选中项目以上的值需要传过去
                if (index1 >= index) {
                    if (!vigourSendNumSrting) {
                        vigourSendNumSrting = vigourSendNumSrting+i;
                    } else {
                        vigourSendNumSrting = vigourSendNumSrting + ',' + i;
                    }
                }
            });
            this.vigourSendNumSrting = vigourSendNumSrting;
        },

        save() {
            if (!this.form.id) {
                this.$Message.error('未获取到id,无法保存');
                return false;
            }
            let pramas = Object.assign({}, this.form);
            let str = '';
            this.drawFieldNums.forEach((e, i) => {
                if (!str) {
                    str = e;
                } else {
                    str = str + ',' + e;
                }
            });
            pramas.drawFieldNums = str;
            pramas.vigourSendNum = this.vigourSendNumSrting;
            // pramas.drawFieldNums = '1,2,3,4,5,6,7,8'
            // 处理高分值策略
            if (this.scoreStrategyFlag) {
                pramas.scoreStrategyFlag = 1;
            } else {
                pramas.scoreStrategyFlag = 0;
            }
            // vigourSendType //随机热力值赠送方式 0：超过（含）具体值；1：超过（含）当前八档数值；
            this.axios
                .post(`/hitSettings/edit`, pramas)
                .then(res => {
                    this.$Message.success('保存成功');
                    this.loadData();
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
        loadData() {
            this.axios
                .get(`/hitSettings/select`)
                .then(res => {
                    this.form = res.data;
                    // 处理高分值策略
                    if (res.data.scoreStrategyFlag) {
                        this.scoreStrategyFlag = true;
                    } else {
                        this.scoreStrategyFlag = false;
                    }
                    this.drawFieldNums = res.data.drawFieldNums;
                })
                .catch(err => {
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
.inp-top {
    width: 900px;
}
</style>
