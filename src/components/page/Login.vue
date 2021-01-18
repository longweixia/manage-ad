<template>
    <div class="login-wrap">
        <video src="./bgvide.mp4" autoplay="autoplay" muted="muted" loop="loop" class="bg-video"></video>
        
        <div class="ms-login">
            <img src="./logoText.png" class="img-area-text" />
            <div class="ms-title"></div>
            <el-form :model="param"  ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="account">
                    <el-input v-model="param.account" placeholder="请输入手机号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="pwd" placeholder="请输入密码" v-model="param.pwd" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                account: '',
                pwd: ''
            },
            rules: {
                account: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
                pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.login();
            // this.$refs.login.validate(valid => {
            //     if (valid) {
            //         this.login();
            //     } else {
            //         this.$message.error('请输入手机号和密码');
            //         return false;
            //     }
            // });
        },
        login() {
           
            if(!this.param.account||!this.param.pwd){
                 this.$message.error('请输入手机号和密码');
                 return false
            }
            this.axios
                .post(`/common/login`, this.param)
                .then(res => {
                    this.$message.success('登录成功');
                    localStorage.setItem('Authorization', res.data.token);
                    localStorage.setItem('ms_username', this.param.account);
                    this.$router.push('/');
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        }
    }
};
</script>

<style scoped lang="less">
.img-area-text{
    position: absolute;
    margin-left: -20px;
    margin-top: -100px;
    width: 271.8*2px;
    height: 63.2*2px;
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1375px;
    min-height: 755px;
    /* background-image: url(../../assets/img/login-bg.jpg); */
    background-size: 100%;
    background: linear-gradient(to right, #8eaeb3, #aac4c8, #8eaeb3);
    display: flex;
    justify-content: center;
    align-items: center;
}
.bg-video {
    // height: 100%;
    width: 100%;
    transform: translateX(-50%);
    position: relative;
    left: 50%;
    // top: -100px;
    position: absolute;
}
.ms-title {
    transform: scale(0.5, 0.5);
    width: 100%;
    // line-height: 50px;
    height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
    background: url(./logo.png) no-repeat center center;
    background-size: cover;
}
.ms-login {
    // position: absolute;
    // left: 50%;
    // top: 50%;
    width: 350px;
    // margin: -190px 0 0 -250px;
    // border-radius: 5px;
    margin-left: -100px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    z-index: 1000;
}
.ms-content {
    padding: 30px 30px;
    padding-top: 0;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.el-button--primary {
    background-color: #b1c8cb;
    border-color: #b1c8cb;
}
</style>
