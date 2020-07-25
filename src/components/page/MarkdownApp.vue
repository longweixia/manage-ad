<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>markdown编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <div class="ad-title">
                    封面图：
                    <div class="ad-cover-img">
                        <el-upload
                            :action="uploadImg"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="Resimg"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- <div class="img-cover">
                            <img style="width:148px;height:148px;" :src="appList.coverImage" alt="" />
                        </div> -->
                    </div>
                </div>

                <div class="ad-title">
                    软件二维码：
                    <div class="ad-cover-img">
                        <el-upload
                            :action="uploadImg"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview1"
                            :on-remove="handleRemove1"
                            :on-success="Resimg1"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
                <div class="ad-title">
                    应用截图：
                    <div class="ad-cover-img">
                        <el-upload
                            :action="uploadImg"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview2"
                            :on-remove="handleRemove2"
                            :on-success="Resimg2"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
                <div>
                    <div class="ad-title ad-title-top">
                        应用名<el-input class="input-app" placeholder="应用名称" v-model="appList.name" clearable> </el-input>
                    </div>
                    <div class="ad-title ad-title-top">
                        下载链接<el-input class="input-app" placeholder="下载链接" v-model="appList.downLoadUrl" clearable> </el-input>
                    </div>
                    <div class="ad-title ad-type">
                        <span class="ad-type-text">大类：</span>
                        <el-select class="app-select" v-model="appList.types1" clearable placeholder="应用大类">
                            <el-option v-for="item in types1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </div>
                    <div class="ad-title ad-type">
                        <span class="ad-type-text">小类：</span>
                        <el-select class="app-select" v-model="appList.types2" clearable placeholder="应用小类">
                            <el-option v-for="item in types2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <!-- <div class="ad-title ad-type">
                        <span class="ad-type-text">分类：</span>
                        <el-select class="app-select" v-model="appList.types2" clearable placeholder="分类">
                            <el-option v-for="item in types2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        分类：<div>{{appList.getClass}}</div>
                    </div> -->
                    <div class="ad-title">
                        提现：<el-input class="input-app" placeholder="提现门槛" v-model="appList.tixian" clearable> </el-input>
                    </div>
                </div>
                <div class="ad-title">
                    本金：<el-input class="input-app" placeholder="提现门槛" v-model="appList.benjin" clearable> </el-input>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">系统：</span>
                    <el-select class="app-select" v-model="appList.system" clearable placeholder="请系统">
                        <el-option v-for="item in system" :key="item.value" :label="item.label" :value="item.label"> </el-option>
                    </el-select>
                </div>
                <div class="ad-title">
                    发布者 ：<el-input class="input-app" placeholder="提现门槛" v-model="appList.autor" clearable> </el-input>
                </div>
                <div class="ad-title">
                    时间 ：
                    <el-date-picker v-model="appList.times" type="date" placeholder="选择日期"> </el-date-picker>
                </div>
                <div class="ad-title">
                    浏览数 ：<el-input class="input-app" placeholder="提现门槛" v-model="appList.view" clearable> </el-input>
                </div>
                <div class="ad-title">
                    下载数 ：<el-input class="input-app" placeholder="提现门槛" v-model="appList.downLoadNum" clearable> </el-input>
                </div>
                <div class="ad-title">评分：<el-rate class="ad-level" v-model="appList.rate"> </el-rate></div>

                <div class="ad-title">
                    软件介绍 ：<el-input class="input-app" placeholder="提现门槛" v-model="appList.introduce" clearable> </el-input>
                </div>
                <div class="ad-title">
                    软件特点 ：<el-input class="input-app" placeholder="提现门槛" v-model="appList.trait" clearable> </el-input>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">联系我们：</span>
                    <el-form label-width="80px">
                        <el-form-item v-for="(item3, index3) in appList.contact" :key="index3" :label="item3.types">
                            <el-input v-model="item3.text"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">置顶：</span>
                    <el-select class="app-select" v-model="appList.top" clearable placeholder="请选择">
                        <el-option v-for="item in top" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">显示：</span>
                    <el-select class="app-select" v-model="appList.show" clearable placeholder="请选择">
                        <el-option v-for="item in show" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>

                <div class="ad-title">
                    文章标记：<el-input class="input-app" placeholder="如：顶" v-model="appList.tag" clearable> </el-input>
                </div>
            </div>
            {{ appList.screenshot }}

            <!-- <mavon-editor v-model="appList.content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px" /> -->
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
// import mdApp from "../common/mdApp";
export default {
    name: 'MarkdownApp',
    components: {
        mavonEditor
    },
    data: function() {
        return {
            appList: {

                coverImage: 'https://www.app522.com/upload/img/2020/04/21/5e9f03c1b5909.png', //封面图
                name: '松鼠王', //应用名称
                downLoadUrl: 'www.baidu.com', //下载链接
                types1: 'tb', //软件大类型,例如tb,az
                types2: 'huofan', //软件小类型,例如货返，立返,360,可能同时属于多个标签
                getClass: '货返',
                tixian: '无门槛', //提现
                benjin: '需要', //本金
                system: '安卓', //支持系统
                times: '', //文章创作时间
                autor: '大龙叔', //文章作者
                view: 356, //浏览次数
                show: 1,
                downLoadNum: 256, //下载量
                rate: 5, //评分
                qrcode: 'https://www.app522.com/upload/img/2020/04/21/5e9f03c1b5909.png', //软件二维码
                introduce: 'StringStringStringString', //软件介绍
                trait: 'StringStringStringString', //软件特点
                contact: [
                    {
                        types: 'QQ',
                        text: '11186'
                    },
                    { types: 'QQ群', text: '87434' },
                    { types: '微信', text: '27488724' }
                ],
                screenshot: [
                    // {
                    //     //软件截图
                    //     // sort: 0, //排序
                    //     name: '收益图', //名字
                    //     url: 'https://www.app522.com/upload/img/2020/04/21/5e9f03c1b5909.png' //url
                    // }
                ],
                // screenshot: '',
                top: 0, //置顶，1置顶，0不置顶
                // content: String, //内容
                tag: '顶' //文章标记，如：顶
            }, //文章对象
            html: '',
            configs: {},
            // types: 'baidu', //文章所属的大类

            // 大类
            types1: [
                //文章大类数据
                {
                    value: 'tb',
                    label: '淘宝'
                },
                {
                    value: 'wx',
                    label: '微信'
                },
                {
                    value: 'az',
                    label: '安卓'
                },
                {
                    value: 'ios',
                    label: '苹果ios'
                },
                {
                    value: 'xb',
                    label: '线报'
                },
                {
                    value: 'gj',
                    label: '高级'
                },
                {
                    value: 'zg',
                    label: '草根汇'
                }
            ],
            types2: [
                //文章小类数据
                {
                    value: 'huofan',
                    label: '货返'
                },
                {
                    value: 'lifan',
                    label: '立返'
                },
                {
                    value: 'hongbao',
                    label: '可用红包'
                },
                {
                    value: 'other',
                    label: '其它'
                }
            ],
            system: [
                //文章小类数据
                {
                    value: 'az',
                    label: '安卓'
                },
                {
                    value: 'ios',
                    label: '苹果'
                }
            ],
            show: [
                //是否显示
                {
                    value: 0,
                    label: '隐藏'
                },
                {
                    value: 1,
                    label: '显示'
                }
            ],
            top: [
                //文章小类数据
                {
                    value: 1,
                    label: '置顶'
                },
                {
                    value: 0,
                    label: '不置顶'
                }
            ],

            coverImage: '', //封面图
            qrcode: '', //软件二维码
            screenshot: '', //应用截图
            dialogVisible: false, //封面显示
            dialogVisible1: false, //软件二维码显示
            dialogVisible2: false, //应用截图显示
            // uploadImg: `${this.baseUrl}/malls/uploadImg`
            uploadImg: 'http://47.103.40.123:3001/malls/uploadImg'
        };
    },

    methods: {
       
        // 获取分类的值
        // getTypes(value){
        //     console.log(value,787878)
        // },
        // 上传封面图成功的回调
        Resimg(response, file, fileList) {
            this.appList.coverImage = response.result.url;
        },
        // 删除封面图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //   放大封面图
        handlePictureCardPreview(file) {
            this.coverImage = file.url;
            this.dialogVisible = true;
        },
        // 软件二维码
        // 上传软件二维码成功的回调
        Resimg1(response, file, fileList) {
            this.appList.qrcode = response.result.url;
            // console.log(this.appList.qrcode,9999)
        },
        // 删除软件二维码
        handleRemove1(file, fileList) {
            console.log(file, fileList);
        },
        //   放大软件二维码
        handlePictureCardPreview1(file) {
            this.coverImage = file.url;
            this.dialogVisible1 = true;
        },
        // 应用截图
        // 上传应用截图成功的回调
        Resimg2(response, file, fileList) {
            // this.appList.screenshot = response.result.url;
            // this.appList.screenshot = fileList

            this.appList.screenshot.push({ name: '软件截图', url: response.result.url });

            console.log(fileList);
        },
        // 删除应用截图
        handleRemove2(file, fileList) {
            console.log(file, fileList);
        },
        //   放大应用截图
        handlePictureCardPreview2(file) {
            this.screenshot = file.url;
            this.dialogVisible2 = true;
        },
        // 将图片上传到服务器，返回地址替换到md中
        $imgAdd(pos, $file) {
            var formdata = new FormData();
            formdata.append('file', $file);
            // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
            this.axios({
                url: `${this.baseUrl}/malls/uploadImg`,
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => {
                this.$refs.md.$img2Url(pos, res.data.result.url);
            });
        },
        change(value, render) {
            // render 为 markdown 解析后的结果
            this.html = render;
        },
        submit() {
            // 提交前处理下分类数据
            // this.types2
            let appList = this.appList;
            appList.getClass = this.types2.find(item => item.value === appList.types2).label;
            //    console.log(appList)
            // 如果id存在就是修改，如果id不存在就是新增
            // 拼装article数据

            // let appObj = {
            //     coverImage: appList.coverImage, //封面图
            //     name: appList.name, //应用名称
            //     types1: appList.types1, //软件大类型,例如tb,az
            //     types2: appList.types2, //软件小类型,例如货返，立返,360,可能同时属于多个标签
            //     tixian:appList.tixian,//提现
            //     benjin:appList.benjin,//提现
            //     system: appList.system, //支持系统
            //      times: appList.times, //文章创作时间
            //     autor: appList.autor, //文章作者
            //     view: appList.view, //文章作者
            //     downLoadNum: appList.downLoadNum, //下载量

            //     rate: appList.rate, //评分
            //     qrcode: appList.qrcode, //评分
            //     introduce: appList.introduce, //评分
            //     trait: appList.trait, //评分
            //     contact: appList.contact, //评分
            //     screenshot: appList.screenshot, //评分

            //     top: appList.top, //置顶，1置顶，0不置顶
            //     tag: appList.tag, //文章标记，如：顶

            // };
            this.axios
                .post(`${this.baseUrl}/appLists/postApp`, {
                    data: this.appList
                })
                .then(res => {
                    if (res.data.status == '0') {
                        this.$message.success('发布成功');
                    } else {
                        this.$message.error('发布失败' + res.data.msg);
                    }
                })
                .catch(err => {
                    this.$message.error('发布失败' + err);
                });
        }
    },
    mounted() {
        // if (this.$route.params.appList) {
        //     this.appList = this.$route.params.appList;
        //     this.dialogVisible = true;
        // } else {
        //     this.appList = {};
        //     this.dialogVisible = false;
        // }
        // // this.coverImage = this.$route.params.appList ? this.$route.params.appList.coverImage : '';
        // console.log(this.appList, 99999, this.appList.id);
    }
};
</script>
<style scoped>
.plugins-tips {
    text-align: justify;
}
.editor-btn {
    margin-top: 20px;
}
.ad-title {
    width: 25%;
    margin: 10px;
    display: inline-block;
}
.ad-level {
    display: inline-block;
}
/* .ad-type {
    margin-left: 115px;
} */
.ad-type-text {
    display: inline-block;
    width: 80px;
}
.ad-cover-img {
    display: inline-block;
    position: relative;
}
.img-cover {
    position: absolute;
}
.input-app {
    width: 100px;
}
.app-select {
    width: 100px;
}
</style>