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
                    标题：<el-input style="width:600px;" placeholder="作者名称" v-model="articleContent.title" clearable> </el-input>
                </div>
                <div class="ad-title ad-type">
                    <span class="ad-type-text">类别：</span>
                    <el-select v-model="articleContent.types" clearable placeholder="请选择文章类别">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>
                <div class="ad-title">
                    作者：<el-input style="width:200px;" placeholder="作者名称" v-model="articleContent.autor" clearable> </el-input>
                </div>
                <div class="ad-title">
                    浏览量：<el-input style="width:200px;" placeholder="浏览量，填写数字" v-model="articleContent.Pageview" clearable>
                    </el-input>
                </div>
                <div class="ad-title">
                    文章标记：<el-input style="width:200px;" placeholder="如：顶" v-model="articleContent.tag" clearable> </el-input>
                </div>
                <div class="ad-title">优先级：<el-rate class="ad-level" v-model="articleContent.level"> </el-rate></div>

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
                            <img style="width:148px;height:148px;" :src="articleContent.coverImage" alt="" />
                        </div> -->
                    </div>
                </div>
            </div>
            <mavon-editor v-model="articleContent.content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px" />
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
    name: 'markdown',
    data: function() {
        return {
            articleContent: {
                title: '', //输入标题
                types: 'baidu', //大类的值
                autor: '手赚联盟N01', //作者
                Pageview: '278', //浏览量
                tag: '置顶', //文章标记，如：顶
                level: 5, //优先级
                coverImage: null //封面图
                // content:"",//不声明content的话，v-model articleContent.content会报错
            }, //文章对象
            html: '',
            configs: {},
            // types: 'baidu', //文章所属的大类

            // 大类
            options: [
                //文章大类数据
                {
                    value: 'baidu',
                    label: '百度'
                },
                {
                    value: 'gogle',
                    label: '谷歌'
                },
                {
                    value: 'sanliuling',
                    label: '360'
                },
                {
                    value: 'sougou',
                    label: '搜狗'
                },
                {
                    value: 'tuiguang',
                    label: '推广'
                }
            ],

            coverImage: '',
            dialogVisible: false,
            // uploadImg: `${this.baseUrl}/malls/uploadImg`
            uploadImg: "http://47.103.40.123:3001/malls/uploadImg"
        };
    },
    components: {
        mavonEditor
    },
    methods: {
        // 上传封面图成功的回调
        Resimg(response, file, fileList) {
            this.articleContent.coverImage = response.result.url;
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
            let article = {};
            article[this.articleContent.types] = [this.articleContent];
            // console.log(article);
            this.axios
                .post(`${this.baseUrl}/articles/post`, {
                    data: {
                        userName: 'longwei',
                        types: this.articleContent.types,
                        id: this.articleContent.id,
                        article: article
                    }
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
        if (this.$route.params.articleContent) {
            this.articleContent = this.$route.params.articleContent;
            this.dialogVisible = true;
        } else {
            this.articleContent = {};
            this.dialogVisible = false;
        }

        // this.coverImage = this.$route.params.articleContent ? this.$route.params.articleContent.coverImage : '';
        console.log(this.articleContent, 99999, this.articleContent.id);
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