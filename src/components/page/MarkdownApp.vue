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
                <div class="ad-title ad-title-top">
                    应用名<el-input style="width:600px;" placeholder="应用名称" v-model="appList.name" clearable> </el-input>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">大类：</span>
                    <el-select v-model="appList.types1" clearable placeholder="请选择应用大类">
                        <el-option v-for="item in types1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">小类：</span>
                    <el-select v-model="appList.types2" clearable placeholder="请选择应用小类">
                        <el-option v-for="item in types2" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">系统：</span>
                    <el-select v-model="appList.system" clearable placeholder="请系统">
                        <el-option v-for="item in system" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">置顶：</span>
                    <el-select v-model="appList.top" clearable placeholder="请选择">
                        <el-option v-for="item in top" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>
                <div class="ad-title">
                    作者：<el-input style="width:200px;" placeholder="作者名称" v-model="appList.autor" clearable> </el-input>
                </div>
                <div class="ad-title">
                    下载量：<el-input style="width:200px;" placeholder="下载量，填写数字" v-model="appList.downLoadNum" clearable>
                    </el-input>
                </div>
                <div class="ad-title">
                    文章标记：<el-input style="width:200px;" placeholder="如：顶" v-model="appList.tag" clearable> </el-input>
                </div>
                <div class="ad-title">评分：<el-rate class="ad-level" v-model="appList.rate"> </el-rate></div>

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
            </div>
         
            <mavon-editor v-model="appList.content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px" />
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
                name: '左左街', //输入标题
                types1: 'tb', //大类的值
                types2: 'huofan', //小类的值
                system: '安卓', //系统
                top: 0, //置顶
                autor: '手赚联盟N01', //作者
                downLoadNum: 278, //浏下载量
                tag: '热门', //文章标记，如：顶
                rate: 5, //评分
                coverImage: null, //封面图
                times: new Date()
                // content:"",//不声明content的话，v-model appList.content会报错
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

            coverImage: '',
            dialogVisible: false,
            // uploadImg: `${this.baseUrl}/malls/uploadImg`
            uploadImg: "http://47.103.40.123:3001/malls/uploadImg"
        };
    },

    methods: {
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
            // 如果id存在就是修改，如果id不存在就是新增
            // 拼装article数据
            let appList = this.appList
            let appObj = {
                types1: appList.types1, //软件大类型,例如tb,az
                types2: appList.types2, //软件小类型,例如货返，立返,360,可能同时属于多个标签
                coverImage: appList.coverImage, //封面图
                name: appList.name, //应用名称
                rate: appList.rate, //评分
                top: appList.top, //置顶，1置顶，0不置顶
                content: appList.content, //内容
                tag: appList.tag, //文章标记，如：顶
                autor: appList.autor, //文章作者
                times: appList.times, //文章创作时间
                system: appList.system, //支持系统
                downLoadNum: appList.downLoadNum, //下载量 
            
            };
            this.axios
                .post(`${this.baseUrl}/appLists/postApp`, {
                    data: appObj
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
    margin: 10px;
    display: inline-block;
}
.ad-level {
    display: inline-block;
}
.ad-type {
    margin-left: 115px;
}
.ad-type-text {
    display: inline-block;
    width: 50px;
}
.ad-cover-img {
    display: inline-block;
    position: relative;
}
.img-cover {
    position: absolute;
}
</style>