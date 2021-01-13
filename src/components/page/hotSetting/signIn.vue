<template>
    <div>
  
        <div class="container">
            <div class="card-area">
                <div class="row-text">每日签到次数</div>
                 每日最高
                     <Input v-model="form.signMaxNum" placeholder="数值" style="width:200px" clearable></Input>次
                
            </div>
            <div class="card-area">
                <div class="row-text">签到获得热力值</div>
                 每次获得
                     <Input v-model="form.vigourSignNum" placeholder="数值" style="width:200px" clearable></Input>热力值

                
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
           
            form: {
                signMaxNum:"",
            vigourSignNum:"",//每日限制次数
            },
            
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
                })
                .catch((err) => {
                    this.$Message.error(err);
                });
        },

        save() {
            let pramas = {
                signMaxNum: Number(this.form.signMaxNum),
                vigourSignNum: Number(this.form.vigourSignNum),
                  id:this.form.id
            };
            this.axios
                .post(`/hitSettings/edit`, pramas)
                .then((res) => {
                    this.$Message.success('保存成功');
                     this.loadData();
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
        .card-header{
            width:100px;
            height: 100px;
           border-radius: 50px;
           margin-top: 10px;
            img{
                width:100%;
                height: 100%;
                border-radius: 50px;
            }
        }
        .tag-text{
            display: inline-block;
            margin-bottom:5px;
            
        }
        .addTag-text{
            color: blue;
            cursor: pointer;
            margin-left: 20px;
        }
        // 标签
        .tag-area{
            .tag{
                cursor: pointer;
                margin-right: 10px;
            }

        }
        // 开屏
        .card-screen{
              width:200px;
            height: 200px;
           margin-top: 10px;
            img{
                width:100%;
                height: 100%;
            }

        }
        .card-screen-btn{
            margin-top: 5px;
        }

    }
}
.tips{
    color: #a7a7a7;
}
.num-list{
    display: inline-block;
    margin-right: 10px;
}
</style>